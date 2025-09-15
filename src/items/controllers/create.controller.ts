import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

// Pipes
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";

// Services
import { ItemService } from "../item.service";

// Dtos
import { CreateItemDto } from "../schemas/item.schema";

// Schemas
import { CreateItemSchema } from "../schemas/item.schema";

// Entities
import { Item } from "../entities/item.entity";


/**
 * Controller for creating items.
 * Provides an endpoint to create a new item.
 * Uses ZodValidationPipe to validate the request body against CreateItemSchema.
 * Returns the created item upon successful creation.
 */
@ApiTags('items')
@Controller('items')
export class CreateItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Post()
    @ApiOperation({
        summary: 'Create a new item',
        description: 'Creates a new item with the provided details.',
    })
    @ApiCreatedResponse({
        description: 'Item successfully created.',
        type: Item
    })
    @ApiBody({ type: CreateItemDto })
    @UsePipes(new ZodValidationPipe(CreateItemSchema))
    async create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

}