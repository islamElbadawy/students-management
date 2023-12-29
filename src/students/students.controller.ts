import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  findAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  getOneStudent(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(+id, updateStudentDto);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.removeStudent(+id);
  }
}
