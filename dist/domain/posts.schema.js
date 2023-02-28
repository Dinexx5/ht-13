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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postViewModel = exports.updatePostModel = exports.createPostInputModelWithBlogId = exports.createPostModel = exports.PostSchema = exports.Post = exports.LikeModel = exports.ExtendedLikesInfo = exports.LikingUsers = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let LikingUsers = class LikingUsers {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], LikingUsers.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikingUsers.prototype, "myStatus", void 0);
LikingUsers = __decorate([
    (0, mongoose_1.Schema)()
], LikingUsers);
exports.LikingUsers = LikingUsers;
let ExtendedLikesInfo = class ExtendedLikesInfo {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "likesCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendedLikesInfo.prototype, "dislikesCount", void 0);
ExtendedLikesInfo = __decorate([
    (0, mongoose_1.Schema)()
], ExtendedLikesInfo);
exports.ExtendedLikesInfo = ExtendedLikesInfo;
let LikeModel = class LikeModel {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "addedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LikeModel.prototype, "login", void 0);
LikeModel = __decorate([
    (0, mongoose_1.Schema)()
], LikeModel);
exports.LikeModel = LikeModel;
let Post = class Post {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Post.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "shortDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "blogName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likingUsers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", ExtendedLikesInfo)
], Post.prototype, "extendedLikesInfo", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)()
], Post);
exports.Post = Post;
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
class createPostModel {
    constructor(title, shortDescription, content) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
    }
}
exports.createPostModel = createPostModel;
class createPostInputModelWithBlogId {
    constructor(title, shortDescription, content, blogId) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
        this.blogId = blogId;
    }
}
exports.createPostInputModelWithBlogId = createPostInputModelWithBlogId;
class updatePostModel {
    constructor(title, shortDescription, content, blogId) {
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
        this.blogId = blogId;
    }
}
exports.updatePostModel = updatePostModel;
class postViewModel {
    constructor(id, title, shortDescription, content, blogId, blogName, createdAt, extendedLikesInfo) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
        this.blogId = blogId;
        this.blogName = blogName;
        this.createdAt = createdAt;
        this.extendedLikesInfo = extendedLikesInfo;
    }
}
exports.postViewModel = postViewModel;
//# sourceMappingURL=posts.schema.js.map