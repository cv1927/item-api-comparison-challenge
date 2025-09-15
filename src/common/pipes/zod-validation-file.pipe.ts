import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';


/**
 * A NestJS pipe that validates uploaded files using a Zod schema.
 * It reads the file buffer, parses it as JSON, and validates it against the provided schema.
 * If validation fails, it throws a BadRequestException with detailed error messages.
 */
@Injectable()
export class ZodValidationFilePipe implements PipeTransform {
    constructor(private schema: ZodType) { }

    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        try {
            
            const dataFile = value.buffer.toString();
            const dataParsed = JSON.parse(dataFile);

            const parsedValue = this.schema.parse(dataParsed);
            
            if (!parsedValue) {
                throw new BadRequestException('Validation failed: Parsed value is empty or invalid');
            }

            return value;
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