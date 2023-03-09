import { Response } from 'express';
import { AuthService } from '../auth/auth-service';
import { DevicesService } from '../application/devices.service';
export declare class DevicesController {
    protected authService: AuthService;
    protected devicesService: DevicesService;
    constructor(authService: AuthService, devicesService: DevicesService);
    getActiveSessions(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAllSessions(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSession(req: any, deviceId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
