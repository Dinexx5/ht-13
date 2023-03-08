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
exports.PostsQueryRepository = void 0;
const posts_schema_1 = require("../domain/posts.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
function mapperToPostViewModel(post) {
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
            myStatus: 'None',
            newestLikes: [],
        },
    };
}
let PostsQueryRepository = class PostsQueryRepository {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async getAllPosts(query, blogId) {
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
        const postsView = postsDb.map(mapperToPostViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: postsView,
        };
    }
    async findPostById(postId) {
        const _id = new mongoose_2.default.Types.ObjectId(postId);
        const foundPost = await this.postModel.findOne({
            _id: _id,
        });
        if (!foundPost) {
            return null;
        }
        return mapperToPostViewModel(foundPost);
    }
};
PostsQueryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsQueryRepository);
exports.PostsQueryRepository = PostsQueryRepository;
//# sourceMappingURL=posts.query-repo.js.map