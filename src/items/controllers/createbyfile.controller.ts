import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

// Pipes
import { ZodValidationFilePipe } from "src/common/pipes/zod-validation-file.pipe";

// Services
import { ItemService } from "../item.service";

// Schemas
import { CreateItemArraySchema } from "../schemas/item.schema";

// Entities
import { Item } from "../entities/item.entity";


/**
 * Controller for creating items via file upload.
 * Provides an endpoint to upload a JSON file containing an array of items.
 * Uses ZodValidationFilePipe to validate the uploaded file against CreateItemArraySchema.
 * Returns the created items upon successful creation.
 */
@ApiTags('items')
@Controller('items')
export class CreateItemFileController {
    constructor(private readonly itemsService: ItemService) {}

    @Post('upload')
    @ApiOperation({
        summary: 'Create items by file upload',
        description: 'Creates a new items with file uploaded.',
    })
    @ApiCreatedResponse({
        description: 'Items successfully created.',
        type: [Item]
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'JSON file containing an array of items to create',
                },
            },
            required: ['file'],
        }
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage(),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'application/json') {
                return cb(new BadRequestException('Only JSON files are allowed!'), false);
            }
            cb(null, true);
        }
    }))
    @UsePipes(new ZodValidationFilePipe(CreateItemArraySchema))
    async create(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        const dataFile = file.buffer.toString('utf-8');
        const dataParsed = JSON.parse(dataFile);

        return this.itemsService.createMany(dataParsed);
    }

}