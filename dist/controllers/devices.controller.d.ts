import { Response } from 'express';
import { AuthService } from '../auth/auth-service';
import { DevicesService } from '../application/devices.service';
import { DevicesRepository } from '../repos/devices.repository';
export declare class DevicesController {
    protected authService: AuthService;
    protected devicesService: DevicesService;
    protected devicesRepository: DevicesRepository;
    constructor(authService: AuthService, devicesService: DevicesService, devicesRepository: DevicesRepository);
    getActiveSessions(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAllSessions(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSession(req: any, deviceId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
