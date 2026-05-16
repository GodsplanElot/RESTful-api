import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsIn(['INTERN', 'ENGINEER', 'ADMIN'])
  role!: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
