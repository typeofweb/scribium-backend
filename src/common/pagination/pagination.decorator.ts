import { Query, ValidationPipe } from '@nestjs/common';

export const Pagination = () => Query(new ValidationPipe({ transform: true }));
