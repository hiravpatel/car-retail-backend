import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = '7d';

export class TokenUtils {
    static generateToken(payload: any): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}

export class PasswordUtils {
    static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    static async compare(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
}
