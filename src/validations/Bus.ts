import { IsDate, IsDateString, IsDefined, Length, MinDate } from 'class-validator';
import { IsAfterDate, IsBeforeDate } from 'class-validator-date';
export class Bus {
 

  @IsDefined({ message: 'Plates Not Defined' })
  @Length(6, 6, { message: 'Plates mst have a 6 characters' })
  plates!: string;

  @IsDefined({ message: 'Travel Routes Not Defined' })
  routes!: string;

  @IsDateString({ message: 'Should be a date' })
 @IsBeforeDate('arrivalTime', { message: 'Departure date has to be before arrival' })
  departureTime!: string;

  @IsDateString({ message: 'Should be a date' })
  @IsAfterDate('departureTime', { message: 'Arrival date has to be after departure' })
    arrivalTime!: string;
}
