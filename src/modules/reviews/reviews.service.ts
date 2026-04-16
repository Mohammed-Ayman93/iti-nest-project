import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  async create(dto: CreateReviewDto, user: any) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // منع تكرار الريفيو
    const existing = await this.reviewRepo.findOne({
      where: {
        user: { id: user.id },
        product: { id: dto.productId },
      },
    });

    if (existing) {
      throw new BadRequestException('You already reviewed this product');
    }

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      user,
      product,
    });

    return this.reviewRepo.save(review);
  }
  async findByProduct(productId: number) {
  return this.reviewRepo.find({
    where: { product: { id: productId } },
    relations: ['user'], // optional علشان ترجع بيانات اليوزر
  });
}
async remove(id: number, user: any) {
  const review = await this.reviewRepo.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!review) {
    throw new NotFoundException('Review not found');
  }

  // authorization (owner أو admin)
  if (review.user.id !== user.id && user.role !== 'admin') {
    throw new ForbiddenException();
  }

  await this.reviewRepo.remove(review);

  return { message: 'Review deleted successfully' };
}
}
