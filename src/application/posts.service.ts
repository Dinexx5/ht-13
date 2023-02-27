import { PostsRepository } from '../repos/posts.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  createPostInputModelWithBlogId,
  Post,
  PostDocument,
  postViewModel,
  updatePostModel,
} from '../domain/posts.schema';
import { BlogsQueryRepository } from '../repos/blogs.query-repo';

@Injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsQueryRepository: BlogsQueryRepository,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async createPost(
    postBody: createPostInputModelWithBlogId,
  ): Promise<postViewModel> {
    const foundBlog = await this.blogsQueryRepository.findBlogById(
      postBody.blogId,
    );
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

  async UpdatePostById(
    postBody: updatePostModel,
    postId: string,
  ): Promise<boolean> {
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
}
