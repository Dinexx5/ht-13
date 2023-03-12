import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import { BlogsModule } from './entities/blogs/blogs.module';
import { PostsModule } from './entities/posts/posts.module';
import { CommentsModule } from './entities/comments/comments.module';
import { TestingModule } from './entities/testing/testing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    BlogsModule,
    PostsModule,
    CommentsModule,
    TestingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
