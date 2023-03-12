import { paginatedViewModel, paginationQuerys } from '../../shared/models/pagination';
import { PostDocument, PostViewModel } from './posts.schema';
import { Model } from 'mongoose';
export declare class PostsQueryRepository {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    getAllPosts(query: paginationQuerys, blogId?: string, userId?: string | null): Promise<paginatedViewModel<PostViewModel[]>>;
    findPostById(postId: string, userId?: string | null): Promise<PostViewModel | null>;
}
