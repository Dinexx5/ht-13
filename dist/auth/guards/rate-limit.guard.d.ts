import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AttemptsRepository } from '../../repos/attempts.repository';
export declare class RateLimitGuard implements CanActivate {
    private attemptsRepository;
    constructor(attemptsRepository: AttemptsRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
