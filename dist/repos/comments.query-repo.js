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
exports.CommentsQueryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comments_schema_1 = require("../domain/comments.schema");
function mapperToCommentViewModel(comment) {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt,
        likesInfo: {
            likesCount: comment.likesInfo.likesCount,
            dislikesCount: comment.likesInfo.dislikesCount,
            myStatus: 'None',
        },
    };
}
let CommentsQueryRepository = class CommentsQueryRepository {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async getAllCommentsForPost(query, postId) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10, } = query;
        const sortDirectionNumber = sortDirection === 'desc' ? -1 : 1;
        const skippedCommentsNumber = (+pageNumber - 1) * +pageSize;
        const countAll = await this.commentModel.countDocuments({ postId: postId });
        const commentsDb = await this.commentModel
            .find({ postId: postId })
            .sort({ [sortBy]: sortDirectionNumber })
            .skip(skippedCommentsNumber)
            .limit(+pageSize)
            .lean();
        const commentsView = commentsDb.map(mapperToCommentViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: commentsView,
        };
    }
    async findCommentById(commentId) {
        const _id = new mongoose_2.default.Types.ObjectId(commentId);
        const foundComment = await this.commentModel.findOne({ _id: _id });
        if (!foundComment) {
            return null;
        }
        return mapperToCommentViewModel(foundComment);
    }
};
CommentsQueryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsQueryRepository);
exports.CommentsQueryRepository = CommentsQueryRepository;
//# sourceMappingURL=comments.query-repo.js.map