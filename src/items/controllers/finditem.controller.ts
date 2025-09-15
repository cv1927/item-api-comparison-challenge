import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


// Services
import { ItemService } from "../item.service";


// Entities
import { Item } from "../entities/item.entity";

@ApiTags('items')
@Controller('items')
export class FindItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Get('/by-id')
    @ApiOperation({
        summary: 'Get item by ID',
        description: 'Retrieves a single item by its unique identifier',
    })
    @ApiParam({ name: 'id', required: true, description: 'Item UUID', example: 'uuid-v4-string' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Item by Id', type: Item })
    async findOne(
        @Param('id') id: string,
    ) {
        return this.itemsService.findOne(id)
    }

}