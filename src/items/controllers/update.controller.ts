import { Body, Controller, HttpStatus, Put, Query, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

// Pipes
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";

// Services
import { ItemService } from "../item.service";

// Dtos
import { UpdateItemDto } from "../schemas/item.schema";

// Schemas
import { UpdateItemSchema } from "../schemas/item.schema";

/**
 * Controller for updating items.
 * Provides an endpoint to update an existing item.
 * Uses ZodValidationPipe to validate the request body against UpdateItemSchema.
 * Returns the updated item upon successful update.
 */
@ApiTags('items')
@Controller('items')
export class UpdateItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Put()
    @ApiOperation({
        summary: 'Update an existing item',
        description: 'Updates an existing item by its unique identifier',
    })
    @ApiBody({ type: UpdateItemDto })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found' })
    @ApiQuery({ name: 'id', required: true, description: 'Item UUID', example: 'uuid-v4-string' })
    @UsePipes(new ZodValidationPipe(UpdateItemSchema))
    async update(@Query('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.itemsService.update(id, updateItemDto);
    }

}