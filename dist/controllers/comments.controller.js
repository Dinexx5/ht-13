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
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_query_repo_1 = require("../repos/comments.query-repo");
const comments_schema_1 = require("../domain/comments.schema");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const comments_service_1 = require("../application/comments.service");
const auth_service_1 = require("../auth/auth-service");
let CommentsController = class CommentsController {
    constructor(authService, commentsQueryRepository, commentsService) {
        this.authService = authService;
        this.commentsQueryRepository = commentsQueryRepository;
        this.commentsService = commentsService;
    }
    async getComment(req, id, res) {
        const isToken = { token: null };
        if (!req.headers.authorization)
            isToken.token = null;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const result = await this.authService.getTokenInfo(token);
            isToken.token = result.userId;
        }
        const comment = await this.commentsQueryRepository.findCommentById(id, isToken.token);
        if (!comment)
            return res.sendStatus(404);
        return res.send(comment);
    }
    async updateComment(req, commentId, inputModel, res) {
        const receivedStatus = await this.commentsService.updateCommentById(commentId, inputModel, req.user);
        return res.sendStatus(+receivedStatus);
    }
    async deleteComment(req, commentId, res) {
        const receivedStatus = await this.commentsService.deleteCommentById(commentId, req.user);
        return res.sendStatus(+receivedStatus);
    }
    async likeComment(req, commentId, inputModel, res) {
        console.log(req.user);
        const isLiked = await this.commentsService.likeComment(commentId, inputModel.likeStatus, req.user);
        if (!isLiked)
            return res.sendStatus(404);
        return res.sendStatus(204);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "getComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, comments_schema_1.CreateCommentModel, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "updateComment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "deleteComment", null);
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
], CommentsController.prototype, "likeComment", null);
CommentsController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        comments_query_repo_1.CommentsQueryRepository,
        comments_service_1.CommentsService])
], CommentsController);
exports.CommentsController = CommentsController;
//# sourceMappingURL=comments.controller.js.map