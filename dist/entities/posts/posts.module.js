"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const posts_query_repo_1 = require("./posts.query-repo");
const posts_repository_1 = require("./posts.repository");
const posts_service_1 = require("./posts.service");
const posts_schema_1 = require("./posts.schema");
const posts_controller_1 = require("./posts.controller");
const users_module_1 = require("../users/users.module");
const blogs_query_repo_1 = require("../blogs/blogs.query-repo");
const comments_module_1 = require("../comments/comments.module");
const blogs_schema_1 = require("../blogs/blogs.schema");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            comments_module_1.CommentsModule,
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
        ],
        providers: [posts_service_1.PostsService, posts_repository_1.PostsRepository, posts_query_repo_1.PostsQueryRepository, blogs_query_repo_1.BlogsQueryRepository],
        controllers: [posts_controller_1.PostsController],
        exports: [posts_service_1.PostsService, posts_repository_1.PostsRepository, posts_query_repo_1.PostsQueryRepository, blogs_query_repo_1.BlogsQueryRepository],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map