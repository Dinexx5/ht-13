import { Request } from 'express';
declare const RefreshJwtStrategy_base: new (...args: any[]) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    constructor();
    validate(req: Request, payload: any): Promise<any>;
}
export {};
