import { UserRole } from '../../../common/enums/user-role.enum';
import { Order } from '../../orders/entities/order.entity';
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    role: UserRole;
    hashedRefreshToken: string | null;
    orders: Order[];
    createdAt: Date;
    updatedAt: Date;
}
