import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { BlogsQueryRepository } from '../../repos/blogs.query-repo';

@ValidatorConstraint({ name: 'IsBlogExists', async: true })
@Injectable()
export class IsBlogExistsDecorator implements ValidatorConstraintInterface {
  constructor(private blogsQueryRepository: BlogsQueryRepository) {}
  async validate(blogId: string, args: ValidationArguments) {
    console.log(blogId);
    const blog = await this.blogsQueryRepository.findBlogById(blogId);
    if (!blog) return false;
    return true;
  }
  defaultMessage(args: ValidationArguments) {
    return `Blog doesn't exist`;
  }
}

export function IsBlogExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsBlogExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBlogExistsDecorator,
    });
  };
}
