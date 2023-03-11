import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { BlogsQueryRepository } from '../../repos/blogs.query-repo';
export declare class IsBlogExistsDecorator implements ValidatorConstraintInterface {
    private blogsQueryRepository;
    constructor(blogsQueryRepository: BlogsQueryRepository);
    validate(blogId: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsBlogExists(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
