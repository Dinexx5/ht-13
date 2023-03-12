import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsQueryRepository } from './comments.query-repo';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './comments.schema';
import { PostsService } from '../posts/posts.service';
import { PostsRepository } from '../posts/posts.repository';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { IsLikeStatusCorrectDecorator } from '../../shared/decorators/validation/like-status.decorator';
import { Post, PostSchema } from '../posts/posts.schema';
import { Blog, BlogSchema } from '../blogs/blogs.schema';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  providers: [
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
    PostsService,
    PostsRepository,
    BlogsQueryRepository,
    IsLikeStatusCorrectDecorator,
  ],
  controllers: [CommentsController],
  exports: [
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
    PostsService,
    PostsRepository,
    BlogsQueryRepository,
    IsLikeStatusCorrectDecorator,
  ],
})
export class CommentsModule {}
