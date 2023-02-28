import { PostsRepository } from '../repos/posts.repository';
import { Model } from 'mongoose';
import { createPostInputModelWithBlogId, PostDocument, postViewModel, updatePostModel } from '../domain/posts.schema';
import { BlogsQueryRepository } from '../repos/blogs.query-repo';
export declare class PostsService {
    protected postsRepository: PostsRepository;
    protected blogsQueryRepository: BlogsQueryRepository;
    private postModel;
    constructor(postsRepository: PostsRepository, blogsQueryRepository: BlogsQueryRepository, postModel: Model<PostDocument>);
    createPost(postBody: createPostInputModelWithBlogId): Promise<postViewModel>;
    deletePostById(postId: string): Promise<boolean>;
    UpdatePostById(postBody: updatePostModel, postId: string): Promise<boolean>;
}
