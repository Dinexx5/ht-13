"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const blogs_controller_1 = require("./controllers/blogs.controller");
const blogs_service_1 = require("./application/blogs.service");
const blogs_repository_1 = require("./repos/blogs.repository");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("./domain/blogs.schema");
const blogs_query_repo_1 = require("./repos/blogs.query-repo");
const posts_controller_1 = require("./controllers/posts.controller");
const posts_service_1 = require("./application/posts.service");
const posts_repository_1 = require("./repos/posts.repository");
const posts_query_repo_1 = require("./repos/posts.query-repo");
const posts_schema_1 = require("./domain/posts.schema");
const comments_controller_1 = require("./controllers/comments.controller");
const comments_query_repo_1 = require("./repos/comments.query-repo");
const comments_schema_1 = require("./domain/comments.schema");
const users_schema_1 = require("./domain/users.schema");
const users_controller_1 = require("./controllers/users.controller");
const users_service_1 = require("./domain/users.service");
const users_repository_1 = require("./repos/users.repository");
const users_query_repo_1 = require("./repos/users.query-repo");
const testing_controller_1 = require("./controllers/testing.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URL),
            mongoose_1.MongooseModule.forFeature([{ name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
        ],
        controllers: [
            app_controller_1.AppController,
            blogs_controller_1.BlogsController,
            posts_controller_1.PostsController,
            comments_controller_1.CommentsController,
            users_controller_1.UsersController,
            testing_controller_1.TestingController,
        ],
        providers: [
            app_service_1.AppService,
            blogs_service_1.BlogsService,
            blogs_repository_1.BlogsRepository,
            blogs_query_repo_1.BlogsQueryRepository,
            posts_service_1.PostsService,
            posts_repository_1.PostsRepository,
            posts_query_repo_1.PostsQueryRepository,
            comments_query_repo_1.CommentsQueryRepository,
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            users_query_repo_1.UsersQueryRepository,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map