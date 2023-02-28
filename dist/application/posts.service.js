"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const posts_repository_1 = require("../repos/posts.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("../domain/posts.schema");
const blogs_query_repo_1 = require("../repos/blogs.query-repo");
let PostsService = class PostsService {
    constructor(postsRepository, blogsQueryRepository, postModel) {
        this.postsRepository = postsRepository;
        this.blogsQueryRepository = blogsQueryRepository;
        this.postModel = postModel;
    }
    async createPost(postBody) {
        const foundBlog = await this.blogsQueryRepository.findBlogById(postBody.blogId);
        const postDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            title: postBody.title,
            shortDescription: postBody.shortDescription,
            content: postBody.content,
            blogId: postBody.blogId,
            blogName: foundBlog.name,
            createdAt: foundBlog.createdAt,
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
    async deletePostById(postId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const postInstance = await this.postsRepository.findPostInstance(_id);
        if (!postInstance)
            return false;
        await postInstance.deleteOne();
        return true;
    }
    async UpdatePostById(postBody, postId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const postInstance = await this.postsRepository.findPostInstance(_id);
        if (!postInstance)
            return false;
        postInstance.title = postBody.title;
        postInstance.shortDescription = postBody.shortDescription;
        postInstance.content = postBody.content;
        postInstance.blogId = postBody.blogId;
        await this.postsRepository.save(postInstance);
        return true;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        blogs_query_repo_1.BlogsQueryRepository,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map