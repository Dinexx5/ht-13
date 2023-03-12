"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_repository_1 = require("./users.repository");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./users.schema");
const users_query_repo_1 = require("./users.query-repo");
const users_controller_1 = require("./users.controller");
const login_exists_decorator_1 = require("../../shared/decorators/validation/login-exists.decorator");
const email_exists_decorator_1 = require("../../shared/decorators/validation/email-exists.decorator");
const confirm_email_decorator_1 = require("../../shared/decorators/validation/confirm-email.decorator");
const email_resending_decorator_1 = require("../../shared/decorators/validation/email-resending.decorator");
const password_recovery_decorator_1 = require("../../shared/decorators/validation/password-recovery.decorator");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }])],
        providers: [
            users_service_1.UsersService,
            users_repository_1.UsersRepository,
            users_query_repo_1.UsersQueryRepository,
            login_exists_decorator_1.IsLoginExistsDecorator,
            email_exists_decorator_1.IsEmailExistsDecorator,
            confirm_email_decorator_1.IsConfirmationCodeCorrect,
            email_resending_decorator_1.EmailResendingDecorator,
            password_recovery_decorator_1.IsRecoveryCodeCorrect,
        ],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService, users_repository_1.UsersRepository, users_query_repo_1.UsersQueryRepository],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map