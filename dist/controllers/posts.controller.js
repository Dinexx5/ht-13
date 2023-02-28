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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_schema_1 = require("../domain/posts.schema");
const posts_service_1 = require("../application/posts.service");
const posts_query_repo_1 = require("../repos/posts.query-repo");
const comments_query_repo_1 = require("../repos/comments.query-repo");
let PostsController = class PostsController {
    constructor(postsService, postsQueryRepository, commentsQueryRepository) {
        this.postsService = postsService;
        this.postsQueryRepository = postsQueryRepository;
        this.commentsQueryRepository = commentsQueryRepository;
    }
    async getPosts(paginationQuery) {
        const returnedPosts = await this.postsQueryRepository.getAllPosts(paginationQuery);
        return returnedPosts;
    }
    async getPost(id, res) {
        const post = await this.postsQueryRepository.findPostById(id);
        if (!post) {
            return res.sendStatus(404);
        }
        return res.send(post);
    }
    async createPost(inputModel) {
        const createdInstance = await this.postsService.createPost(inputModel);
        return createdInstance;
    }
    async updatePost(inputModel, id, res) {
        const isUpdated = await this.postsService.UpdatePostById(inputModel, id);
        if (!isUpdated) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    }
    async deletePost(id, res) {
        const isDeleted = await this.postsService.deletePostById(id);
        if (!isDeleted) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    }
    async getComments(postId, paginationQuery, res) {
        const foundPost = await this.postsQueryRepository.findPostById(postId);
        if (!foundPost) {
            return res.sendStatus(404);
        }
        const returnedComments = await this.commentsQueryRepository.getAllCommentsForPost(paginationQuery, postId);
        return res.send(returnedComments);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_schema_1.createPostInputModelWithBlogId]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_schema_1.updatePostModel, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getComments", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        posts_query_repo_1.PostsQueryRepository,
        comments_query_repo_1.CommentsQueryRepository])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map