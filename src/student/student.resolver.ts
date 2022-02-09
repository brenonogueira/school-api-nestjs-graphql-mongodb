import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }

  @Query(() => [StudentType])
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  @Query(() => StudentType)
  async getStudentById(@Args('id') id: string) {
    return await this.studentService.getStudentById(id);
  }
}
