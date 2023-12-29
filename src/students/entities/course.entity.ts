import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Student, (Student) => Student.courses)
  students: Student[];
}
