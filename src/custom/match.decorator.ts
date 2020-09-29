import {
  registerDecorator, ValidationArguments, ValidationOptions,
  ValidatorConstraint, ValidatorConstraintInterface,
} from 'class-validator';

// tslint:disable-next-line:function-name
export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

}
