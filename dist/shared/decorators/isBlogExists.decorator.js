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
exports.IsBlogExists = exports.IsBlogExistsDecorator = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const blogs_query_repo_1 = require("../../repos/blogs.query-repo");
let IsBlogExistsDecorator = class IsBlogExistsDecorator {
    constructor(blogsQueryRepository) {
        this.blogsQueryRepository = blogsQueryRepository;
    }
    async validate(blogId, args) {
        console.log(blogId);
        const blog = await this.blogsQueryRepository.findBlogById(blogId);
        if (!blog)
            return false;
        return true;
    }
    defaultMessage(args) {
        return `Blog doesn't exist`;
    }
};
IsBlogExistsDecorator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsBlogExists', async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [blogs_query_repo_1.BlogsQueryRepository])
], IsBlogExistsDecorator);
exports.IsBlogExistsDecorator = IsBlogExistsDecorator;
function IsBlogExists(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsBlogExists',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsBlogExistsDecorator,
        });
    };
}
exports.IsBlogExists = IsBlogExists;
//# sourceMappingURL=isBlogExists.decorator.js.map