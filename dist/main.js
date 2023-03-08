"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exceptions_filter_1 = require("./exceptions.filter");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({});
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: false,
        exceptionFactory: (errors) => {
            const errorsForResponse = [];
            errors.forEach((e) => {
                const keys = Object.keys(e.constraints);
                keys.forEach((key) => {
                    errorsForResponse.push({
                        message: e.constraints[key],
                        field: e.property,
                    });
                });
            });
            throw new common_1.BadRequestException(errorsForResponse);
        },
    }));
    app.useGlobalFilters(new exceptions_filter_1.HttpExceptionFilter());
    await app.listen(3001);
    console.log('Successfully running');
}
bootstrap();
//# sourceMappingURL=main.js.map