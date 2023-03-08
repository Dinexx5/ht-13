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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_schema_1 = require("../domain/comments.schema");
const comments_repository_1 = require("../repos/comments.repository");
const users_repository_1 = require("../repos/users.repository");
let CommentsService = class CommentsService {
    constructor(commentsRepository, usersRepository, commentModel) {
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
        this.commentModel = commentModel;
    }
    async createComment(postId, inputModel, userId) {
        const userInstance = await this.usersRepository.findUserById(userId);
        const commentDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            content: inputModel.content,
            commentatorInfo: {
                userId: userInstance._id.toString(),
                userLogin: userInstance.accountData.login,
            },
            createdAt: new Date().toISOString(),
            likingUsers: [],
            postId: postId,
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
            },
        };
        const commentInstance = new this.commentModel(commentDTO);
        await this.commentsRepository.save(commentInstance);
        return {
            id: commentInstance._id.toString(),
            content: commentInstance.content,
            commentatorInfo: {
                userId: commentInstance.commentatorInfo.userId,
                userLogin: commentInstance.commentatorInfo.userLogin,
            },
            createdAt: commentInstance.createdAt,
            likesInfo: {
                likesCount: commentInstance.likesInfo.likesCount,
                dislikesCount: commentInstance.likesInfo.dislikesCount,
                myStatus: 'None',
            },
        };
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository,
        users_repository_1.UsersRepository,
        mongoose_2.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map