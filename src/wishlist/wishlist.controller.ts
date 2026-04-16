import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':productId')
  @UseGuards(JwtAuthGuard)
  add(@Param('productId', ParseIntPipe) productId: number, @Req() req) {
    return this.wishlistService.add(productId, req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  findMyWishlist(@Req() req) {
    return this.wishlistService.findMyWishlist(req.user);
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('productId', ParseIntPipe) productId: number, @Req() req) {
    return this.wishlistService.remove(productId, req.user);
  }
}
