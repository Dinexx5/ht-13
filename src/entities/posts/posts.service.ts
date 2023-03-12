import { PostsRepository } from './posts.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  createPostInputModelWithBlogId,
  LikeModel,
  Post,
  PostDocument,
  PostViewModel,
  updatePostModel,
} from './posts.schema';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { CommentViewModel, CreateCommentModel, LikingUsers } from '../comments/comments.schema';
import { CommentsService } from '../comments/comments.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsQueryRepository: BlogsQueryRepository,
    protected commentsService: CommentsService,
    protected usersRepository: UsersRepository,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async createPost(postBody: createPostInputModelWithBlogId): Promise<PostViewModel | null> {
    const foundBlog = await this.blogsQueryRepository.findBlogById(postBody.blogId);
    if (!foundBlog) return null;
    const postDTO = {
      _id: new mongoose.Types.ObjectId(),
      title: postBody.title,
      shortDescription: postBody.shortDescription,
      content: postBody.content,
      blogId: postBody.blogId,
      blogName: foundBlog!.name,
      createdAt: foundBlog!.createdAt,
      likingUsers: [],
      likes: [],
      extendedLikesInfo: {
        likesCount: 0,
        dislikesCount: 0,
      },
    };
    const postInstance = new this.postModel(postDTO);
    await this.postsRepository.save(postInstance);

    return {
      id: postInstance._id.toString(),
      title: postInstance.title,
      shortDescription: postInstance.shortDescription,
      content: postInstance.content,
      blogId: postInstance.blogId,
      blogName: postInstance.blogName,
      createdAt: postInstance.createdAt,
      extendedLikesInfo: {
        likesCount: postInstance.extendedLikesInfo.likesCount,
        dislikesCount: postInstance.extendedLikesInfo.dislikesCount,
        myStatus: 'None',
        newestLikes: [],
      },
    };
  }

  async deletePostById(postId: string): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(postId);
    const postInstance = await this.postsRepository.findPostInstance(_id);
    if (!postInstance) return false;
    await postInstance.deleteOne();
    return true;
  }

  async UpdatePostById(postBody: updatePostModel, postId: string): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(postId);
    const postInstance = await this.postsRepository.findPostInstance(_id);
    if (!postInstance) return false;
    postInstance.title = postBody.title;
    postInstance.shortDescription = postBody.shortDescription;
    postInstance.content = postBody.content;
    postInstance.blogId = postBody.blogId;
    await this.postsRepository.save(postInstance);
    return true;
  }
  async createComment(
    postId: string,
    inputModel: CreateCommentModel,
    userId: mongoose.Types.ObjectId,
  ): Promise<CommentViewModel | null> {
    const _id = new mongoose.Types.ObjectId(postId);
    const postInstance = await this.postsRepository.findPostInstance(_id);
    if (!postInstance) return null;
    return await this.commentsService.createComment(postId, inputModel, userId);
  }
  async likePost(
    postId: string,
    likeStatus: string,
    userId: mongoose.Types.ObjectId,
  ): Promise<boolean> {
    const _id = new mongoose.Types.ObjectId(postId);
    const userInstance = await this.usersRepository.findUserById(userId);
    const login = userInstance.accountData.login;
    const postInstance = await this.postsRepository.findPostInstance(_id);
    console.log(postInstance);
    if (!postInstance) {
      return false;
    }
    const callbackForUser = (user: LikingUsers) => user.id === userId.toString();
    const callbackForLike = (user) => user.userId === userId.toString();
    const isUserLikedBefore = postInstance.likingUsers.find(callbackForUser);
    if (!isUserLikedBefore) {
      postInstance.likingUsers.push({ id: userId.toString(), myStatus: 'None' });
    }
    const indexOfUser = postInstance.likingUsers.findIndex(callbackForUser);
    const indexOfLike = postInstance.likes.findIndex(callbackForLike);
    const myStatus = postInstance.likingUsers.find(callbackForUser)!.myStatus;
    switch (likeStatus) {
      case 'Like':
        if (myStatus === 'Like') {
          postInstance.likingUsers[indexOfUser].myStatus = 'Like';
        }
        if (myStatus === 'None') {
          ++postInstance!.extendedLikesInfo.likesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'Like';
          postInstance.likes.push({
            addedAt: new Date().toISOString(),
            userId: userId.toString(),
            login: login,
          });
        }
        if (myStatus === 'Dislike') {
          --postInstance!.extendedLikesInfo.dislikesCount;
          ++postInstance!.extendedLikesInfo.likesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'Like';
          postInstance.likes.push({
            addedAt: new Date().toISOString(),
            userId: userId.toString(),
            login: login,
          });
        }
        break;
      case 'Dislike':
        if (myStatus === 'Like') {
          --postInstance!.extendedLikesInfo.likesCount;
          ++postInstance!.extendedLikesInfo.dislikesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
          postInstance.likes.splice(indexOfLike, 1);
        }
        if (myStatus === 'None') {
          ++postInstance!.extendedLikesInfo.dislikesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
        }
        if (myStatus === 'Dislike') {
          postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
        }
        break;
      case 'None':
        if (myStatus === 'Like') {
          --postInstance!.extendedLikesInfo.likesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'None';
          postInstance.likes.splice(indexOfLike, 1);
        }
        if (myStatus === 'Dislike') {
          --postInstance!.extendedLikesInfo.dislikesCount;
          postInstance.likingUsers[indexOfUser].myStatus = 'None';
        }
        if (myStatus === 'None') {
          postInstance.likingUsers[indexOfUser].myStatus = 'None';
        }
        break;
    }
    console.log(postInstance);
    postInstance.markModified('likingUsers');
    await this.postsRepository.save(postInstance);
    return true;
  }
}
