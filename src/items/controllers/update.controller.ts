import { Body, Controller, HttpStatus, Param, Post, Put, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// Pipes
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";

// Services
import { ItemService } from "../item.service";

// Dtos
import { UpdateItemDto } from "../schemas/item.schema";

// Schemas
import { UpdateItemSchema } from "../schemas/item.schema";


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
    @UsePipes(new ZodValidationPipe(UpdateItemSchema))
    async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.itemsService.update(id, updateItemDto);
    }

}