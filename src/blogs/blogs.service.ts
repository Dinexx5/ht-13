import { BlogsRepository } from './blogs.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}
  async findBlogs() {
    return await this.blogsRepository.findBlogs();
  }
}
