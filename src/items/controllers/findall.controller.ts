import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


// Services
import { ItemService } from "../item.service";


// Entities
import { Item } from "../entities/item.entity";

@ApiTags('items')
@Controller('items')
export class FindAllItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all items',
        description: 'Retrieves a list of all items',
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of items', type: [Item] })
    async findAll() {
        return this.itemsService.findAll();
    }

}