import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: Category;
    categoryId: number;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}
