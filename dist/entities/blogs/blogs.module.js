"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./blogs.schema");
const blogs_controller_1 = require("./blogs.controller");
const blogs_service_1 = require("./blogs.service");
const blogs_repository_1 = require("./blogs.repository");
const blogs_query_repo_1 = require("./blogs.query-repo");
const blog_exists_decorator_1 = require("../../shared/decorators/validation/blog-exists.decorator");
const auth_module_1 = require("../auth/auth.module");
const posts_module_1 = require("../posts/posts.module");
let BlogsModule = class BlogsModule {
};
BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
        ],
        providers: [blogs_service_1.BlogsService, blogs_repository_1.BlogsRepository, blogs_query_repo_1.BlogsQueryRepository, blog_exists_decorator_1.IsBlogExistsDecorator],
        controllers: [blogs_controller_1.BlogsController],
        exports: [blogs_service_1.BlogsService, blogs_repository_1.BlogsRepository, blogs_query_repo_1.BlogsQueryRepository, blog_exists_decorator_1.IsBlogExistsDecorator],
    })
], BlogsModule);
exports.BlogsModule = BlogsModule;
//# sourceMappingURL=blogs.module.js.map