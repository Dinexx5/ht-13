import { PostsRepository } from './posts.repository';
import mongoose, { Model } from 'mongoose';
import { createPostInputModelWithBlogId, PostDocument, PostViewModel, updatePostModel } from './posts.schema';
import { BlogsQueryRepository } from '../blogs/blogs.query-repo';
import { CommentViewModel, CreateCommentModel } from '../comments/comments.schema';
import { CommentsService } from '../comments/comments.service';
import { UsersRepository } from '../users/users.repository';
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
