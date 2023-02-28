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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../application/blogs.service");
const blogs_query_repo_1 = require("../repos/blogs.query-repo");
const blogs_schema_1 = require("../domain/blogs.schema");
const posts_schema_1 = require("../domain/posts.schema");
const posts_service_1 = require("../application/posts.service");
const posts_query_repo_1 = require("../repos/posts.query-repo");
let BlogsController = class BlogsController {
    constructor(blogsService, blogsQueryRepository, postsService, postsQueryRepository) {
        this.blogsService = blogsService;
        this.blogsQueryRepository = blogsQueryRepository;
        this.postsService = postsService;
        this.postsQueryRepository = postsQueryRepository;
    }
    async getBlogs(paginationQuery) {
        const returnedBlogs = await this.blogsQueryRepository.getAllBlogs(paginationQuery);
        return returnedBlogs;
    }
    async getBlog(id, res) {
        const blog = await this.blogsQueryRepository.findBlogById(id);
        if (!blog) {
            return res.sendStatus(404);
        }
        return res.send(blog);
    }
    async createBlog(inputModel) {
        const createdInstance = await this.blogsService.createBlog(inputModel);
        return createdInstance;
    }
    async updateBlog(inputModel, id, res) {
        const isUpdated = await this.blogsService.UpdateBlogById(inputModel, id);
        if (!isUpdated) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    }
    async deleteBlog(id, res) {
        const isDeleted = await this.blogsService.deleteBlogById(id);
        if (!isDeleted) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    }
    async createPost(inputModel, blogId, res) {
        const blog = await this.blogsQueryRepository.findBlogById(blogId);
        if (!blog) {
            return res.sendStatus(404);
        }
        const postDto = Object.assign(Object.assign({}, inputModel), { blogId });
        const createdInstance = await this.postsService.createPost(postDto);
        return res.send(createdInstance);
    }
    async getPosts(blogId, paginationQuery, res) {
        const blog = await this.blogsQueryRepository.findBlogById(blogId);
        if (!blog) {
            return res.sendStatus(404);
        }
        const returnedPosts = await this.postsQueryRepository.getAllPosts(paginationQuery, blogId);
        return res.send(returnedPosts);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blogs_schema_1.createBlogModel]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blogs_schema_1.updateBlogModel, String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.Post)(':id/posts'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_schema_1.createPostModel, String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':id/posts'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getPosts", null);
BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        blogs_query_repo_1.BlogsQueryRepository,
        posts_service_1.PostsService,
        posts_query_repo_1.PostsQueryRepository])
], BlogsController);
exports.BlogsController = BlogsController;
//# sourceMappingURL=blogs.controller.js.map