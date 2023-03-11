"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const mongoose_2 = __importStar(require("mongoose"));
const comments_schema_1 = require("../domain/comments.schema");
const comments_repository_1 = require("../repos/comments.repository");
const users_repository_1 = require("../repos/users.repository");
let CommentsService = class CommentsService {
    constructor(commentsRepository, usersRepository, commentModel) {
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
        this.commentModel = commentModel;
        this.filter = { status: '204' };
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
    async updateCommentById(commentId, inputModel, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(commentId);
        const commentInstance = await this.commentsRepository.findComment(_id);
        if (!commentInstance) {
            this.filter.status = '404';
            return this.filter.status;
        }
        if (commentInstance.commentatorInfo.userId !== userId.toString()) {
            this.filter.status = '403';
            return this.filter.status;
        }
        commentInstance.content = inputModel.content;
        await this.commentsRepository.save(commentInstance);
        return this.filter.status;
    }
    async deleteCommentById(commentId, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(commentId);
        const commentInstance = await this.commentsRepository.findComment(_id);
        if (!commentInstance) {
            this.filter.status = '404';
            return this.filter.status;
        }
        if (commentInstance.commentatorInfo.userId !== userId.toString()) {
            this.filter.status = '403';
            return this.filter.status;
        }
        await commentInstance.deleteOne();
        return this.filter.status;
    }
    async likeComment(commentId, likeStatus, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(commentId);
        const commentInstance = await this.commentsRepository.findComment(_id);
        console.log(commentInstance);
        if (!commentInstance) {
            return false;
        }
        const callback = (user) => user.id === userId.toString();
        const isUserLikedBefore = commentInstance.likingUsers.find(callback);
        if (!isUserLikedBefore) {
            commentInstance.likingUsers.push({ id: userId.toString(), myStatus: 'None' });
        }
        const indexOfUser = commentInstance.likingUsers.findIndex(callback);
        debugger;
        const myStatus = commentInstance.likingUsers.find(callback).myStatus;
        switch (likeStatus) {
            case 'Like':
                if (myStatus === 'Like') {
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
                }
                if (myStatus === 'None') {
                    ++commentInstance.likesInfo.likesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
                }
                if (myStatus === 'Dislike') {
                    --commentInstance.likesInfo.dislikesCount;
                    ++commentInstance.likesInfo.likesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Like';
                }
                break;
            case 'Dislike':
                if (myStatus === 'Like') {
                    --commentInstance.likesInfo.likesCount;
                    ++commentInstance.likesInfo.dislikesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                }
                if (myStatus === 'None') {
                    ++commentInstance.likesInfo.dislikesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                }
                if (myStatus === 'Dislike') {
                    commentInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                }
                break;
            case 'None':
                if (myStatus === 'Like') {
                    --commentInstance.likesInfo.likesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'None';
                }
                if (myStatus === 'Dislike') {
                    --commentInstance.likesInfo.dislikesCount;
                    commentInstance.likingUsers[indexOfUser].myStatus = 'None';
                }
                if (myStatus === 'None') {
                    commentInstance.likingUsers[indexOfUser].myStatus = 'None';
                }
                break;
        }
        console.log(commentInstance);
        commentInstance.markModified('likingUsers');
        await this.commentsRepository.save(commentInstance);
        return true;
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