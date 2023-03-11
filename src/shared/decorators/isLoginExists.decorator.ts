import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repos/users.repository';

@ValidatorConstraint({ name: 'IsLoginOrEmailExists', async: true })
@Injectable()
export class IsLoginExistsDecorator implements ValidatorConstraintInterface {
  constructor(protected usersRepository: UsersRepository) {}
  async validate(loginOrEmail: string, args: ValidationArguments) {
    const user = await this.usersRepository.findUserByLoginOrEmail(loginOrEmail);
    if (user) return false;
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `Login already exists`;
  }
}

export function IsLoginExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsLoginOrEmailExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsLoginExistsDecorator,
    });
  };
}
