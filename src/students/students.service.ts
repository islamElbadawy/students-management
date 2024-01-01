import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
  // private students: any[] = [
  //   {
  //     id: 1,
  //     name: 'Tina Turner',
  //     age: 24,
  //     address: ['1234 Elm Street', 'Springfield', 'USA'],
  //   },
  //   {
  //     id: 2,
  //     name: 'John Doe',
  //     age: 19,
  //     address: ['5678 Oak Avenue', 'Riverside', 'Canada'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Emily Johnson',
  //     age: 22,
  //     address: ['910 Pine Road', 'Maplewood', 'UK'],
  //   },
  //   {
  //     id: 4,
  //     name: 'Alex Rodriguez',
  //     age: 20,
  //     address: ['2345 Birch Lane', 'Hilltop', 'Australia'],
  //   },
  //   {
  //     id: 5,
  //     name: 'Sara Smith',
  //     age: 25,
  //     address: ['6789 Cedar Boulevard', 'Woodland', 'Germany'],
  //   },
  // ];

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      relations: ['courses'],
    });
  }

  async findOne(id: number): Promise<Student> {
    let student = this.studentRepository.findOne({
      where: { id },
      relations: ['courses'],
    });
    if (!student) {
      throw new NotFoundException(`this student with id : ${id} is not found`);
    }
    return student;
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    const courses = await Promise.all(
      createStudentDto.courses.map((c) => this.preloadCourseByName(c)),
    );
    const student = this.studentRepository.create({
      ...createStudentDto,
      courses,
    });
    return this.studentRepository.save(student);
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    const courses =
      updateStudentDto.courses &&
      (await Promise.all(
        updateStudentDto.courses.map((c) => this.preloadCourseByName(c)),
      ));
    const updatedStudent = await this.studentRepository.preload({
      id: id,
      ...updateStudentDto,
      courses,
    });

    if (!updatedStudent) {
      throw new NotFoundException('This student not found');
    }

    return this.studentRepository.save(updatedStudent);
  }

  async removeStudent(id: number) {
    return this.studentRepository.delete(id);
  }

  private async preloadCourseByName(name: string) {
    const course = await this.courseRepository.findOne({
      where: { name },
    });
    return course ? course : this.courseRepository.create({ name });
  }
}
