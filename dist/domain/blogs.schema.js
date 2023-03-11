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
exports.blogViewModel = exports.updateBlogModel = exports.createBlogModel = exports.BlogSchema = exports.Blog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Blog = class Blog {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Blog.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Blog.prototype, "isMembership", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "websiteUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "createdAt", void 0);
Blog = __decorate([
    (0, mongoose_1.Schema)()
], Blog);
exports.Blog = Blog;
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
class createBlogModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 15),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], createBlogModel.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 500),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], createBlogModel.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], createBlogModel.prototype, "websiteUrl", void 0);
exports.createBlogModel = createBlogModel;
class updateBlogModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 15),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], updateBlogModel.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(0, 500),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], updateBlogModel.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], updateBlogModel.prototype, "websiteUrl", void 0);
exports.updateBlogModel = updateBlogModel;
class blogViewModel {
    constructor(id, name, description, isMembership, websiteUrl, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isMembership = isMembership;
        this.websiteUrl = websiteUrl;
        this.createdAt = createdAt;
    }
}
exports.blogViewModel = blogViewModel;
//# sourceMappingURL=blogs.schema.js.map