"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
const comments_controller_1 = require("./comments.controller");
const comments_query_repo_1 = require("./comments.query-repo");
const comments_repository_1 = require("./comments.repository");
const comments_service_1 = require("./comments.service");
const comments_schema_1 = require("./comments.schema");
const posts_service_1 = require("../posts/posts.service");
const posts_repository_1 = require("../posts/posts.repository");
const blogs_query_repo_1 = require("../blogs/blogs.query-repo");
const like_status_decorator_1 = require("../../shared/decorators/validation/like-status.decorator");
const posts_schema_1 = require("../posts/posts.schema");
const blogs_schema_1 = require("../blogs/blogs.schema");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([{ name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
        ],
        providers: [
            comments_query_repo_1.CommentsQueryRepository,
            comments_repository_1.CommentsRepository,
            comments_service_1.CommentsService,
            posts_service_1.PostsService,
            posts_repository_1.PostsRepository,
            blogs_query_repo_1.BlogsQueryRepository,
            like_status_decorator_1.IsLikeStatusCorrectDecorator,
        ],
        controllers: [comments_controller_1.CommentsController],
        exports: [
            comments_query_repo_1.CommentsQueryRepository,
            comments_repository_1.CommentsRepository,
            comments_service_1.CommentsService,
            posts_service_1.PostsService,
            posts_repository_1.PostsRepository,
            blogs_query_repo_1.BlogsQueryRepository,
            like_status_decorator_1.IsLikeStatusCorrectDecorator,
        ],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map