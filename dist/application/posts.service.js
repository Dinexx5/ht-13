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
exports.PostsService = void 0;
const posts_repository_1 = require("../repos/posts.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const posts_schema_1 = require("../domain/posts.schema");
const blogs_query_repo_1 = require("../repos/blogs.query-repo");
const comments_service_1 = require("./comments.service");
const users_repository_1 = require("../repos/users.repository");
let PostsService = class PostsService {
    constructor(postsRepository, blogsQueryRepository, commentsService, usersRepository, postModel) {
        this.postsRepository = postsRepository;
        this.blogsQueryRepository = blogsQueryRepository;
        this.commentsService = commentsService;
        this.usersRepository = usersRepository;
        this.postModel = postModel;
    }
    async createPost(postBody) {
        const foundBlog = await this.blogsQueryRepository.findBlogById(postBody.blogId);
        if (!foundBlog)
            return null;
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
    async createComment(postId, inputModel, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const postInstance = await this.postsRepository.findPostInstance(_id);
        if (!postInstance)
            return null;
        return await this.commentsService.createComment(postId, inputModel, userId);
    }
    async likePost(postId, likeStatus, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const userInstance = await this.usersRepository.findUserById(userId);
        const login = userInstance.accountData.login;
        const postInstance = await this.postsRepository.findPostInstance(_id);
        if (!postInstance) {
            return false;
        }
        const callback = (user) => user.id === userId.toString();
        const isUserLikedBefore = postInstance.likingUsers.find(callback);
        if (!isUserLikedBefore) {
            postInstance.likingUsers.push({ id: userId.toString(), myStatus: 'None' });
        }
        const indexOfUser = postInstance.likingUsers.findIndex(callback);
        const myStatus = postInstance.likingUsers.find(callback).myStatus;
        switch (likeStatus) {
            case 'Like':
                if (myStatus === 'Like') {
                    postInstance.likingUsers[indexOfUser].myStatus = 'Like';
                }
                if (myStatus === 'None') {
                    ++postInstance.extendedLikesInfo.likesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'Like';
                    postInstance.likes.push({
                        addedAt: new Date().toISOString(),
                        userId: userId.toString(),
                        login: login,
                    });
                }
                if (myStatus === 'Dislike') {
                    --postInstance.extendedLikesInfo.dislikesCount;
                    ++postInstance.extendedLikesInfo.likesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'Like';
                    postInstance.likes.push({
                        addedAt: new Date().toISOString(),
                        userId: userId.toString(),
                        login: login,
                    });
                }
                break;
            case 'Dislike':
                if (myStatus === 'Like') {
                    --postInstance.extendedLikesInfo.likesCount;
                    ++postInstance.extendedLikesInfo.dislikesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                    postInstance.likes.push({
                        addedAt: new Date().toISOString(),
                        userId: userId.toString(),
                        login: login,
                    });
                }
                if (myStatus === 'None') {
                    ++postInstance.extendedLikesInfo.dislikesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                }
                if (myStatus === 'Dislike') {
                    postInstance.likingUsers[indexOfUser].myStatus = 'Dislike';
                }
                break;
            case 'None':
                if (myStatus === 'Like') {
                    --postInstance.extendedLikesInfo.likesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'None';
                    postInstance.likes.push({
                        addedAt: new Date().toISOString(),
                        userId: userId.toString(),
                        login: login,
                    });
                }
                if (myStatus === 'Dislike') {
                    --postInstance.extendedLikesInfo.dislikesCount;
                    postInstance.likingUsers[indexOfUser].myStatus = 'None';
                }
                if (myStatus === 'None') {
                    postInstance.likingUsers[indexOfUser].myStatus = 'None';
                }
                break;
        }
        await this.postsRepository.save(postInstance);
        return true;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        blogs_query_repo_1.BlogsQueryRepository,
        comments_service_1.CommentsService,
        users_repository_1.UsersRepository,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map