import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsController } from './controllers/blogs.controller';
import { BlogsService } from './application/blogs.service';
import { BlogsRepository } from './repos/blogs.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './domain/blogs.schema';
import { BlogsQueryRepository } from './repos/blogs.query-repo';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './application/posts.service';
import { PostsRepository } from './repos/posts.repository';
import { PostsQueryRepository } from './repos/posts.query-repo';
import { Post, PostSchema } from './domain/posts.schema';
import { CommentsController } from './controllers/comments.controller';
import { CommentsQueryRepository } from './repos/comments.query-repo';
import { Comment, CommentSchema } from './domain/comments.schema';
import { User, UserSchema } from './domain/users.schema';
import { TestingController } from './controllers/testing.controller';
import { UsersModule } from './users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './controllers/auth.controller';
import { CommentsRepository } from './repos/comments.repository';
import { CommentsService } from './application/comments.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AuthController,
    AppController,
    BlogsController,
    PostsController,
    CommentsController,
    TestingController,
  ],
  providers: [
    AppService,
    BlogsService,
    BlogsRepository,
    BlogsQueryRepository,
    PostsService,
    PostsRepository,
    PostsQueryRepository,
    CommentsQueryRepository,
    CommentsRepository,
    CommentsService,
  ],
})
export class AppModule {}
