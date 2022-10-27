import { NotFoundException } from '@nestjs/common';

export class SchoolNotFoundException extends NotFoundException {
  constructor() {
    super('School not found.');
  }
}
