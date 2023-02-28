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
exports.BlogsService = void 0;
const blogs_repository_1 = require("../repos/blogs.repository");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("../domain/blogs.schema");
const mongoose_2 = require("mongoose");
let BlogsService = class BlogsService {
    constructor(blogsRepository, blogModel) {
        this.blogsRepository = blogsRepository;
        this.blogModel = blogModel;
    }
    async createBlog(inputModel) {
        const blogDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            name: inputModel.name,
            description: inputModel.description,
            websiteUrl: inputModel.websiteUrl,
            createdAt: new Date().toISOString(),
        };
        const blogInstance = new this.blogModel(blogDTO);
        await this.blogsRepository.save(blogInstance);
        return {
            name: blogInstance.name,
            description: blogInstance.description,
            websiteUrl: blogInstance.websiteUrl,
            createdAt: blogInstance.createdAt,
            id: blogInstance._id.toString(),
        };
    }
    async deleteBlogById(blogId) {
        const _id = new mongoose_2.default.Types.ObjectId(blogId);
        const blogInstance = await this.blogsRepository.findBlogInstance(_id);
        if (!blogInstance)
            return false;
        await blogInstance.deleteOne();
        return true;
    }
    async UpdateBlogById(blogBody, blogId) {
        const { name, description, websiteUrl } = blogBody;
        const _id = new mongoose_2.default.Types.ObjectId(blogId);
        const blogInstance = await this.blogsRepository.findBlogInstance(_id);
        if (!blogInstance)
            return false;
        blogInstance.name = name;
        blogInstance.description = description;
        blogInstance.websiteUrl = websiteUrl;
        await this.blogsRepository.save(blogInstance);
        return true;
    }
};
BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository,
        mongoose_2.Model])
], BlogsService);
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map