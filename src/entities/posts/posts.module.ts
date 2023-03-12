import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PostsQueryRepository } from './posts.query-repo';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { Post, PostSchema } from './posts.schema';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { CommentsModule } from '../comments/comments.module';
import { Blog, BlogSchema } from '../blogs/blogs.schema';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommentsModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [PostsService, PostsRepository, PostsQueryRepository, BlogsQueryRepository],
  controllers: [PostsController],
  exports: [PostsService, PostsRepository, PostsQueryRepository, BlogsQueryRepository],
})
export class PostsModule {}
