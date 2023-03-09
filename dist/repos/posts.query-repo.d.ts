import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { PostDocument, PostViewModel } from '../domain/posts.schema';
import { Model } from 'mongoose';
export declare class PostsQueryRepository {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    getAllPosts(query: paginationQuerys, blogId?: string, userId?: string | null): Promise<paginatedViewModel<PostViewModel[]>>;
    findPostById(postId: string, userId?: string | null): Promise<PostViewModel | null>;
}
