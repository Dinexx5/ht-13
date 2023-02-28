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
exports.BlogsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const blogs_schema_1 = require("../domain/blogs.schema");
let BlogsRepository = class BlogsRepository {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async findBlogInstance(_id) {
        const blogInstance = await this.blogModel.findOne({ _id: _id });
        return blogInstance;
    }
    async save(instance) {
        instance.save();
    }
};
BlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogsRepository);
exports.BlogsRepository = BlogsRepository;
//# sourceMappingURL=blogs.repository.js.map