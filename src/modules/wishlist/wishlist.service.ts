import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishlistItem } from './entities/wishlist-item.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistItem)
    private wishlistRepo: Repository<WishlistItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  async add(productId: number, user: any) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const exists = await this.wishlistRepo.findOne({
      where: {
        user: { id: user.id },
        product: { id: productId },
      },
    });

    if (exists) {
      throw new BadRequestException('Already in wishlist');
    }

    const item = this.wishlistRepo.create({
      user,
      product,
    });

    return this.wishlistRepo.save(item);
  }
  async findMyWishlist(user: any) {
    return this.wishlistRepo.find({
      where: { user: { id: user.id } },
      relations: ['product'],
    });
  }
  async remove(productId: number, user: any) {
    const item = await this.wishlistRepo.findOne({
      where: {
        user: { id: user.id },
        product: { id: productId },
      },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    await this.wishlistRepo.remove(item);

    return { message: 'Removed from wishlist' };
  }
}
