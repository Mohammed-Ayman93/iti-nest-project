import { IsInt, Min, Max, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  comment!: string;

  @IsInt()
  productId!: number;
}