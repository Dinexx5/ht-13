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
exports.BlogsQueryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const blogs_schema_1 = require("../domain/blogs.schema");
const mongoose_2 = require("mongoose");
function mapFoundBlogToBlogViewModel(blog) {
    return {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        isMembership: blog.isMembership,
        createdAt: blog.createdAt,
        id: blog._id.toString(),
    };
}
let BlogsQueryRepository = class BlogsQueryRepository {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async getAllBlogs(query) {
        const { sortDirection = 'desc', sortBy = 'createdAt', pageNumber = 1, pageSize = 10, searchNameTerm = null, } = query;
        const sortDirectionInt = sortDirection === 'desc' ? -1 : 1;
        const skippedBlogsCount = (+pageNumber - 1) * +pageSize;
        const filter = {};
        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }
        const countAll = await this.blogModel.countDocuments(filter);
        const blogsDb = await this.blogModel
            .find(filter)
            .sort({ [sortBy]: sortDirectionInt })
            .skip(skippedBlogsCount)
            .limit(+pageSize)
            .lean();
        const blogsView = blogsDb.map(mapFoundBlogToBlogViewModel);
        return {
            pagesCount: Math.ceil(countAll / +pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: countAll,
            items: blogsView,
        };
    }
    async findBlogById(blogId) {
        const _id = new mongoose_2.default.Types.ObjectId(blogId);
        const foundBlog = await this.blogModel.findOne({
            _id: _id,
        });
        if (!foundBlog) {
            return null;
        }
        return mapFoundBlogToBlogViewModel(foundBlog);
    }
};
BlogsQueryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogsQueryRepository);
exports.BlogsQueryRepository = BlogsQueryRepository;
//# sourceMappingURL=blogs.query-repo.js.map