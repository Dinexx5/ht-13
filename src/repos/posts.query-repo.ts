import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { Post, PostDocument, PostViewModel } from '../domain/posts.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

function mapPostToViewModel(post: PostDocument, userId?: string | null): PostViewModel {
  if (!userId) {
    return mapperToPostViewModel(post);
  }
  const isUserLikedBefore = post.likingUsers.find((user) => user.id === userId)!;
  if (!isUserLikedBefore) {
    return mapperToPostViewModel(post);
  }
  const myStatus = isUserLikedBefore.myStatus;
  return mapperToPostViewModel(post, myStatus);
}

function mapPostsToViewModel(this: any, post: PostDocument): PostViewModel {
  if (!this || !this.user) {
    return mapperToPostViewModel(post);
  }
  const userId = this.user;
  const isUserLikedBefore = post.likingUsers.find((user) => user.id === userId)!;
  if (!isUserLikedBefore) {
    return mapperToPostViewModel(post);
  }
  const myStatus = isUserLikedBefore.myStatus;
  return mapperToPostViewModel(post, myStatus);
}

function mapperToPostViewModel(post: PostDocument, myStatus?: string): PostViewModel {
  const filter = { myStatus: 'None' };
  if (myStatus) {
    filter.myStatus = myStatus;
  }
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
    extendedLikesInfo: {
      likesCount: post.extendedLikesInfo.likesCount,
      dislikesCount: post.extendedLikesInfo.dislikesCount,
      myStatus: filter.myStatus,
      newestLikes: post.likes
        .slice(-3)
        .map((like) => ({
          addedAt: like.addedAt,
          userId: like.userId,
          login: like.login,
        }))
        .reverse(),
    },
  };
}

export class PostsQueryRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  async getAllPosts(
    query: paginationQuerys,
    blogId?: string,
    userId?: string | null,
  ): Promise<paginatedViewModel<PostViewModel[]>> {
    const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;

    const sortDirectionNumber: 1 | -1 = sortDirection === 'desc' ? -1 : 1;
    const skippedPostsNumber = (+pageNumber - 1) * +pageSize;

    const filter = {} as { blogId?: { $regex: string } };
    if (blogId) {
      filter.blogId = { $regex: blogId };
    }

    const countAll = await this.postModel.countDocuments(filter);

    const postsDb = await this.postModel
      .find(filter)
      .sort({
        [sortBy]: sortDirectionNumber,
        title: sortDirectionNumber,
        id: sortDirectionNumber,
      })
      .skip(skippedPostsNumber)
      .limit(+pageSize)
      .lean();

    const postsView = postsDb.map(mapPostsToViewModel, { user: userId }).reverse();
    return {
      pagesCount: Math.ceil(countAll / +pageSize),
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: countAll,
      items: postsView,
    };
  }

  async findPostById(postId: string, userId?: string | null): Promise<PostViewModel | null> {
    const _id = new mongoose.Types.ObjectId(postId);
    const foundPost: PostDocument | null = await this.postModel.findOne({
      _id: _id,
    });
    if (!foundPost) {
      return null;
    }
    console.log(foundPost);
    return mapPostToViewModel(foundPost, userId);
  }
}
