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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./users.schema");
const users_repository_1 = require("../repos/users.repository");
let UsersService = class UsersService {
    constructor(usersRepository, userModel) {
        this.usersRepository = usersRepository;
        this.userModel = userModel;
    }
    async createUser(inputModel) {
        const userDTO = {
            _id: new mongoose_2.default.Types.ObjectId(),
            login: inputModel.login,
            password: inputModel.password,
            email: inputModel.email,
            createdAt: new Date().toISOString(),
        };
        const userInstance = new this.userModel(userDTO);
        await this.usersRepository.save(userInstance);
        return {
            id: userInstance._id.toString(),
            login: userInstance.login,
            email: userInstance.email,
            createdAt: userInstance.createdAt,
        };
    }
    async deleteUserById(userId) {
        const _id = new mongoose_2.default.Types.ObjectId(userId);
        const userInstance = await this.usersRepository.findUserInstance(_id);
        if (!userInstance)
            return false;
        await userInstance.deleteOne();
        return true;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map