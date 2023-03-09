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
const comments_schema_1 = require("../domain/comments.schema");
const comments_query_repo_1 = require("../repos/comments.query-repo");
const auth_guard_1 = require("../auth/guards/auth.guard");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const auth_service_1 = require("../auth/auth-service");
let PostsController = class PostsController {
    constructor(authService, postsService, postsQueryRepository, commentsQueryRepository) {
        this.authService = authService;
        this.postsService = postsService;
        this.postsQueryRepository = postsQueryRepository;
        this.commentsQueryRepository = commentsQueryRepository;
    }
    async getPosts(req, paginationQuery) {
        const isToken = { token: null };
        if (!req.headers.authorization)
            isToken.token = null;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const result = await this.authService.getTokenInfo(token);
            isToken.token = result.userId;
        }
        const returnedPosts = await this.postsQueryRepository.getAllPosts(paginationQuery, undefined, isToken.token);
        return returnedPosts;
    }
    async getPost(req, id, res) {
        const isToken = { token: null };
        if (!req.headers.authorization)
            isToken.token = null;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const result = await this.authService.getTokenInfo(token);
            isToken.token = result.userId;
        }
        const post = await this.postsQueryRepository.findPostById(id, isToken.token);
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
    async getComments(req, postId, paginationQuery, res) {
        const isToken = { token: null };
        if (!req.headers.authorization)
            isToken.token = null;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const result = await this.authService.getTokenInfo(token);
            isToken.token = result.userId;
        }
        const foundPost = await this.postsQueryRepository.findPostById(postId);
        if (!foundPost) {
            return res.sendStatus(404);
        }
        const returnedComments = await this.commentsQueryRepository.getAllCommentsForPost(paginationQuery, postId, isToken.token);
        return res.send(returnedComments);
    }
    async createComment(req, postId, inputModel, res) {
        const newComment = await this.postsService.createComment(postId, inputModel, req.user);
        if (!newComment)
            return res.sendStatus(404);
        return res.status(201).send(newComment);
    }
    async likePost(req, postId, inputModel, res) {
        const isLiked = await this.postsService.likePost(postId, inputModel.likeStatus, req.user);
        if (!isLiked)
            return res.sendStatus(404);
        return res.sendStatus(204);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_schema_1.createPostInputModelWithBlogId]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_schema_1.updatePostModel, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getComments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, comments_schema_1.CreateCommentModel, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/:id/like-status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, comments_schema_1.LikeInputModel, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "likePost", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        posts_service_1.PostsService,
        posts_query_repo_1.PostsQueryRepository,
        comments_query_repo_1.CommentsQueryRepository])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map