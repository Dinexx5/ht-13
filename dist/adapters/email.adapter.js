"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAdapter = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const transporterSettings = {
    host: 'smtp.mail.ru',
    port: 587,
    secure: false,
    auth: {
        user: 'd.diubajlo@mail.ru',
        pass: '',
    },
};
let EmailAdapter = class EmailAdapter {
    async sendEmailForConfirmation(email, code) {
        const transporter = nodemailer.createTransport(transporterSettings);
        return await transporter.sendMail({
            from: 'd.diubajlo@mail.ru',
            to: email,
            subject: 'Successful registration',
            html: '<h1>Thank for your registration</h1>\n' +
                '       <p>To finish registration please follow the link below:\n' +
                `          <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>\n` +
                '      </p>',
        });
    }
    async sendEmailForPasswordRecovery(email, code) {
        const transporter = nodemailer.createTransport(transporterSettings);
        return await transporter.sendMail({
            from: 'd.diubajlo@mail.ru',
            to: email,
            subject: 'Password recovery',
            html: '<h1>Password recovery</h1>\n' +
                '       <p>To finish password recovery please follow the link below:\n' +
                `          <a href='https://somesite.com/password-recovery?recoveryCode=${code}'>recovery password</a>\n` +
                '      </p>',
        });
    }
};
EmailAdapter = __decorate([
    (0, common_1.Injectable)()
], EmailAdapter);
exports.EmailAdapter = EmailAdapter;
//# sourceMappingURL=email.adapter.js.map