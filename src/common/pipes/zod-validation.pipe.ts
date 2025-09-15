import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type !== 'body') {
        return value;
      }

      const parsedValue = this.schema.parse(value);
      if (!parsedValue) {
        throw new BadRequestException('Validation failed: Parsed value is empty or invalid');
      }
      return parsedValue;
    } catch (error) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        })) || ['Invalid input'],
        statusCode: 400,
      });
    }
  }
}