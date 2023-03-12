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
exports.PostsQueryRepository = void 0;
const posts_schema_1 = require("./posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
function mapPostToViewModel(post, userId) {
    if (!userId) {
        return mapperToPostViewModel(post);
    }
    const isUserLikedBefore = post.likingUsers.find((user) => user.id === userId);
    if (!isUserLikedBefore) {
        return mapperToPostViewModel(post);
    }
    const myStatus = isUserLikedBefore.myStatus;
    return mapperToPostViewModel(post, myStatus);
}
function mapPostsToViewModel(post) {
    if (!this || !this.user) {
        return mapperToPostViewModel(post);
    }
    const userId = this.user;
    const isUserLikedBefore = post.likingUsers.find((user) => user.id === userId);
    if (!isUserLikedBefore) {
        return mapperToPostViewModel(post);
    }
    const myStatus = isUserLikedBefore.myStatus;
    return mapperToPostViewModel(post, myStatus);
}
function mapperToPostViewModel(post, myStatus) {
    const filter = { myStatus: 'None' };
    if (myStatus) {
        filter.myStatus = myStatus;
    }
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
        extendedLikesInfo: {
            likesCount: post.extendedLikesInfo.likesCount,
            dislikesCount: post.extendedLikesInfo.dislikesCount,
            myStatus: filter.myStatus,
            newestLikes: post.likes
                .slice(-3)
                .map((like) => ({
                addedAt: like.addedAt,
                userId: like.userId,
                login: like.login,
            }))
                .reverse(),
        },
    };
}
let PostsQueryRepository = class PostsQueryRepository {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async getAllPosts(query, blogId, userId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10 } = query;
        const sortDirectionNumber = sortDirection === 'desc' ? -1 : 1;
        const skippedPostsNumber = (+pageNumber - 1) * +pageSize;
        const filter = {};
        if (blogId) {
            filter.blogId = { $regex: blogId };
        }
        const countAll = await this.postModel.countDocuments(filter);
        const postsDb = await this.postModel
            .find(filter)
            .sort({
            [sortBy]: sortDirectionNumber,
            title: sortDirectionNumber,
            id: sortDirectionNumber,
        })
            .skip(skippedPostsNumber)
            .limit(+pageSize)
            .lean();
        const postsView = postsDb.map(mapPostsToViewModel, { user: userId }).reverse();
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: postsView,
        };
    }
    async findPostById(postId, userId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const foundPost = await this.postModel.findOne({
            _id: _id,
        });
        if (!foundPost) {
            return null;
        }
        console.log(foundPost);
        return mapPostToViewModel(foundPost, userId);
    }
};
PostsQueryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsQueryRepository);
exports.PostsQueryRepository = PostsQueryRepository;
//# sourceMappingURL=posts.query-repo.js.map