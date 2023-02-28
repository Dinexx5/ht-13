import { paginatedViewModel, paginationQuerys } from '../models/pagination';
import { PostDocument, postViewModel } from '../domain/posts.schema';
import { Model } from 'mongoose';
export declare class PostsQueryRepository {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    getAllPosts(query: paginationQuerys, blogId?: string): Promise<paginatedViewModel<postViewModel[]>>;
    findPostById(postId: string): Promise<postViewModel | null>;
}
