import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}
  @Get()
  async getBlogs() {
    return this.blogsService.findBlogs();
  }
  @Post()
  async createBlogs(@Body() inputModel: createBlogModel) {
    return {
      name: inputModel.name,
      description: inputModel.description,
      websiteUrl: inputModel.websiteUrl,
    };
  }
  @Get(':id')
  async getBlog(@Param('id') id: string) {
    return [1, 2, 3, 4, 5, 6, 7][+id - 1];
  }
}
type createBlogModel = {
  name: string;
  description: string;
  websiteUrl: string;
};
