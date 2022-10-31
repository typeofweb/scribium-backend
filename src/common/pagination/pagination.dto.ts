import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  limit = 10;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset = 0;
}
