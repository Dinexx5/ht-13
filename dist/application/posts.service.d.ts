import { PostsRepository } from '../repos/posts.repository';
import mongoose, { Model } from 'mongoose';
import { createPostInputModelWithBlogId, PostDocument, PostViewModel, updatePostModel } from '../domain/posts.schema';
import { BlogsQueryRepository } from '../repos/blogs.query-repo';
import { CommentViewModel, CreateCommentModel } from '../domain/comments.schema';
import { CommentsService } from './comments.service';
import { UsersRepository } from '../repos/users.repository';
export declare class PostsService {
    protected postsRepository: PostsRepository;
    protected blogsQueryRepository: BlogsQueryRepository;
    protected commentsService: CommentsService;
    protected usersRepository: UsersRepository;
    private postModel;
    constructor(postsRepository: PostsRepository, blogsQueryRepository: BlogsQueryRepository, commentsService: CommentsService, usersRepository: UsersRepository, postModel: Model<PostDocument>);
    createPost(postBody: createPostInputModelWithBlogId): Promise<PostViewModel | null>;
    deletePostById(postId: string): Promise<boolean>;
    UpdatePostById(postBody: updatePostModel, postId: string): Promise<boolean>;
    createComment(postId: string, inputModel: CreateCommentModel, userId: mongoose.Types.ObjectId): Promise<CommentViewModel | null>;
    likePost(postId: string, likeStatus: string, userId: mongoose.Types.ObjectId): Promise<boolean>;
}
