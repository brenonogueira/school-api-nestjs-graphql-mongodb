import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assing-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from './../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  //create a lesson calling a service
  @Mutation(() => LessonType)
  createLesson(
    // @Args('name') name: string,
    // @Args('startDate') startDate: string,
    // @Args('endDate') endDate: string,
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  //get lesson
  @Query(() => LessonType)
  lesson() {
    return {
      id: 'abc123',
      name: 'Physics Class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getAllLessons();
  }

  @Query(() => LessonType)
  lessonById(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLessonInput')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    const { lessonId, studentsIds } = assignStudentsToLessonInput;
    return this.lessonService.assignStudentsToLesson(lessonId, studentsIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    // console.log(lesson);
    return this.studentService.getManyStudents(lesson.students);
  }
}
