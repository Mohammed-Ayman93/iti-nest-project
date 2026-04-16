import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
@Unique(['user', 'product']) // يمنع التكرار 🔥
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.wishlist, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Product, (product) => product.wishlist, {
    onDelete: 'CASCADE',
  })
  product!: Product;
}
