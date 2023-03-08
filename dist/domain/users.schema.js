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
exports.authModel = exports.userViewModel = exports.newPasswordModel = exports.passwordRecoveryModel = exports.confirmEmailModel = exports.resendEmailModel = exports.createUserModel = exports.UserSchema = exports.User = exports.accountDataSchema = exports.passwordRecoverySchema = exports.emailConfirmationSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let emailConfirmationSchema = class emailConfirmationSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], emailConfirmationSchema.prototype, "confirmationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], emailConfirmationSchema.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], emailConfirmationSchema.prototype, "isConfirmed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], emailConfirmationSchema.prototype, "createdAt", void 0);
emailConfirmationSchema = __decorate([
    (0, mongoose_1.Schema)()
], emailConfirmationSchema);
exports.emailConfirmationSchema = emailConfirmationSchema;
let passwordRecoverySchema = class passwordRecoverySchema {
};
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], passwordRecoverySchema.prototype, "recoveryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], passwordRecoverySchema.prototype, "expirationDate", void 0);
passwordRecoverySchema = __decorate([
    (0, mongoose_1.Schema)()
], passwordRecoverySchema);
exports.passwordRecoverySchema = passwordRecoverySchema;
let accountDataSchema = class accountDataSchema {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], accountDataSchema.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], accountDataSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], accountDataSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], accountDataSchema.prototype, "passwordHash", void 0);
accountDataSchema = __decorate([
    (0, mongoose_1.Schema)()
], accountDataSchema);
exports.accountDataSchema = accountDataSchema;
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", accountDataSchema)
], User.prototype, "accountData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", emailConfirmationSchema)
], User.prototype, "emailConfirmation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", passwordRecoverySchema)
], User.prototype, "passwordRecovery", void 0);
User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
class createUserModel {
}
exports.createUserModel = createUserModel;
class resendEmailModel {
}
exports.resendEmailModel = resendEmailModel;
class confirmEmailModel {
}
exports.confirmEmailModel = confirmEmailModel;
class passwordRecoveryModel {
}
exports.passwordRecoveryModel = passwordRecoveryModel;
class newPasswordModel {
}
exports.newPasswordModel = newPasswordModel;
class userViewModel {
    constructor(id, login, email, createdAt) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.createdAt = createdAt;
    }
}
exports.userViewModel = userViewModel;
class authModel {
}
exports.authModel = authModel;
//# sourceMappingURL=users.schema.js.map