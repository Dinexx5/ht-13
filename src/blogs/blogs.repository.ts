import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsRepository {
  async findBlogs() {
    return ['returned Blogs!'];
  }
}
