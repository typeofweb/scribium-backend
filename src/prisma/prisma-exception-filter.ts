import { Catch, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaErrorCode } from './prisma-errors';

import type { ExceptionFilter } from '@nestjs/common';
import type { PrismaErrors } from './prisma-errors';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<PrismaErrors> {
  catch(exception: PrismaErrors) {
    switch (exception.code) {
      case PrismaErrorCode.UniqueKeyViolation:
        const { target } = exception.meta;

        throw new ConflictException(
          `Provided ${target.join(' and ')} ${target.length === 1 ? 'is' : 'are'} already in use.`,
        );
      case PrismaErrorCode.RecordNotFound:
      case PrismaErrorCode.RelatedRecordNotFound:
      case PrismaErrorCode.ConnectedRecordsNotFound:
      case PrismaErrorCode.RecordRequiredButNotFound:
        throw new NotFoundException('Resource not found.');
      default:
        throw new InternalServerErrorException();
    }
  }
}
