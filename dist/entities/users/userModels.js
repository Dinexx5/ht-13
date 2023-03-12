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
exports.authModel = exports.NewPasswordModel = exports.ConfirmEmailModel = exports.PasswordRecoveryModel = exports.ResendEmailModel = exports.CreateUserModel = void 0;
const class_validator_1 = require("class-validator");
const login_exists_decorator_1 = require("../../shared/decorators/validation/login-exists.decorator");
const email_exists_decorator_1 = require("../../shared/decorators/validation/email-exists.decorator");
const email_resending_decorator_1 = require("../../shared/decorators/validation/email-resending.decorator");
const confirm_email_decorator_1 = require("../../shared/decorators/validation/confirm-email.decorator");
const class_transformer_1 = require("class-transformer");
const password_recovery_decorator_1 = require("../../shared/decorators/validation/password-recovery.decorator");
class CreateUserModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 10),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/),
    (0, login_exists_decorator_1.IsLoginExists)(),
    __metadata("design:type", String)
], CreateUserModel.prototype, "login", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, email_exists_decorator_1.IsEmailExists)(),
    __metadata("design:type", String)
], CreateUserModel.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(6, 20),
    __metadata("design:type", String)
], CreateUserModel.prototype, "password", void 0);
exports.CreateUserModel = CreateUserModel;
class ResendEmailModel {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, email_resending_decorator_1.IsEmailConfirmed)(),
    __metadata("design:type", String)
], ResendEmailModel.prototype, "email", void 0);
exports.ResendEmailModel = ResendEmailModel;
class PasswordRecoveryModel {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PasswordRecoveryModel.prototype, "email", void 0);
exports.PasswordRecoveryModel = PasswordRecoveryModel;
class ConfirmEmailModel {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, confirm_email_decorator_1.IsConfirmationCodeValid)(),
    __metadata("design:type", String)
], ConfirmEmailModel.prototype, "code", void 0);
exports.ConfirmEmailModel = ConfirmEmailModel;
class NewPasswordModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(6, 20),
    (0, class_transformer_1.Transform)(({ value }) => { var _a; return (_a = value === null || value === void 0 ? void 0 : value.trim) === null || _a === void 0 ? void 0 : _a.call(value); }),
    __metadata("design:type", String)
], NewPasswordModel.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, password_recovery_decorator_1.IsRecoveryCodeValid)(),
    __metadata("design:type", String)
], NewPasswordModel.prototype, "recoveryCode", void 0);
exports.NewPasswordModel = NewPasswordModel;
class authModel {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], authModel.prototype, "loginOrEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], authModel.prototype, "password", void 0);
exports.authModel = authModel;
//# sourceMappingURL=userModels.js.map