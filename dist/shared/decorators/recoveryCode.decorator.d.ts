import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersRepository } from '../../repos/users.repository';
export declare class IsRecoveryCodeCorrect implements ValidatorConstraintInterface {
    protected usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository);
    validate(code: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsRecoveryCodeValid(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;