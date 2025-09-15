import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationFilePipe implements PipeTransform {
    constructor(private schema: ZodType) { }

    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        try {
            const dataFile = value.buffer.toString('utf-8');
            const dataParsed = JSON.parse(dataFile);

            const parsedValue = this.schema.parse(dataParsed);
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