import { IsEmail, IsDefined } from 'class-validator';
export class Login {

  @IsDefined({ message: 'Email is not defined' })
  @IsEmail({}, { message: 'Incorrect Email' })
   email!: string;

  @IsDefined({ message: 'Password is not defined' })
  password!: string;

}
