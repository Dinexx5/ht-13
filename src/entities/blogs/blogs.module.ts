import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs.schema';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';
import { BlogsQueryRepository } from './blogs.query-repo';
import { IsBlogExistsDecorator } from '../../shared/decorators/validation/blog-exists.decorator';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [BlogsService, BlogsRepository, BlogsQueryRepository, IsBlogExistsDecorator],
  controllers: [BlogsController],
  exports: [BlogsService, BlogsRepository, BlogsQueryRepository, IsBlogExistsDecorator],
})
export class BlogsModule {}
