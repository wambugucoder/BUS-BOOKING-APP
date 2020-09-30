import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEmail, Length, ValidateNested } from 'class-validator';
import { Match } from '../custom/match.decorator';
import { Address } from './Address';

export class Register {

  @IsDefined({ message:  'Username is Not defined' })
  @Length(5, 20, { message:  'Username Should contain 5-20 characters ' })
  username!: string;

  @IsDefined({ message:  'Email is Not defined' })
  @IsEmail({}, { message:  'Incorrect Email Address' })
   email!: string;

  @IsDefined({ message:  'Password is Not defined' })
  @Length(6, 12, { message:  'Password should contain 6-12 characters' })
  password!: string;

  @Match('password', { message:  'Passwords do not match' })
  confirmpassword!: string;

}
