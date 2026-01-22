import { AuthRepository } from '../repositories/auth.repository';
import { PasswordUtils, TokenUtils } from '../../../utils/auth.utils';
import { AppError } from '../../../core/errors/AppError';
import { RoleType } from '@prisma/client';

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async register(data: any) {
        let { role: requestedRole, ...userData } = data;

        const existingUser = await this.authRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }

        const hashedPassword = await PasswordUtils.hash(userData.password);

        // Map requested role or default to CUSTOMER
        let roleToAssign: RoleType = RoleType.CUSTOMER;
        if (requestedRole) {
            const normalizedRole = requestedRole.toUpperCase();
            if (normalizedRole === 'ADMIN' || normalizedRole === RoleType.ADMIN) {
                throw new AppError('Admin registration is not allowed. Use seeder for admin accounts.', 403);
            }
            if (normalizedRole === 'STAFF' || normalizedRole === RoleType.STAFF) {
                roleToAssign = RoleType.STAFF;
            } else if (normalizedRole !== 'CUSTOMER' && normalizedRole !== RoleType.CUSTOMER) {
                throw new AppError('Invalid role. Available roles: STAFF, CUSTOMER', 400);
            }
        }

        const role = await this.authRepository.findRoleByName(roleToAssign);
        if (!role) {
            throw new AppError('Requested role not found in database. Please contact support.', 500);
        }

        const user = await this.authRepository.createUser({
            ...userData,
            password: hashedPassword,
            roleId: role.id,
        });

        const token = TokenUtils.generateToken({ id: user.id, role: user.role.name });

        return { user, token };
    }

    async login(data: any) {
        const user = await this.authRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        const isMatch = await PasswordUtils.compare(data.password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        const token = TokenUtils.generateToken({ id: user.id, role: user.role.name });

        return { user, token };
    }
}
