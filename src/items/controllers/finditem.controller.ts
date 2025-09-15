import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


// Services
import { ItemService } from "../item.service";


// Entities
import { Item } from "../entities/item.entity";

/**
 * Controller for retrieving a single item by its ID.
 * Provides an endpoint to fetch an item by its unique identifier.
 * Returns the item upon successful retrieval.
 */
@ApiTags('items')
@Controller('items')
export class FindItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Get('/by-id')
    @ApiOperation({
        summary: 'Get item by ID',
        description: 'Retrieves a single item by its unique identifier',
    })
    @ApiQuery({ name: 'id', required: true, description: 'Item UUID', example: 'uuid-v4-string' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Item by Id', type: Item })
    async findOne(
        @Query('id') id: string,
    ) {
        return this.itemsService.findOne(id)
    }

}