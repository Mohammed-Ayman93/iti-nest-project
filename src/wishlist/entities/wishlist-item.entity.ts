import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from './../../modules/users/entities/user.entity';
import { Product } from './../../modules/products/entities/product.entity';

@Entity()
@Unique(['user', 'product']) // يمنع التكرار 🔥
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.wishlist, { onDelete: 'CASCADE' })
  product!: Product;
}