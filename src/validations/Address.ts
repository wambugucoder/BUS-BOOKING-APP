import { IsDefined } from 'class-validator';

export class Address {
  @IsDefined({ message:  'County is Not defined' })
  county!: string;

  @IsDefined({ message:  'City is Not defined' })
  city!: string;

}
