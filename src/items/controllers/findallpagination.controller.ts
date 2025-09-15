import { Controller, Get, HttpStatus, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


// Services
import { ItemService } from "../item.service";


// Entities
import { Item } from "../entities/item.entity";

@ApiTags('items')
@Controller('items')
export class FindAllPaginationItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Get('pagination')
    @ApiOperation({
        summary: 'Get all items',
        description: 'Retrieves a list of all items, with optional pagination and filtering.',
    })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', example: 10 })
    @ApiQuery({ name: 'search', required: false, description: 'Search term to filter items by name or description', example: 'phone' })
    @ApiQuery({ name: 'category', required: false, description: 'Category to filter items', example: 'electronics' })
    @ApiResponse({ status: HttpStatus.OK, description: 'List of items', type: [Item] })
    async findAll(
        @Query('page') page,
        @Query('limit') limit,
        @Query('search') search,
        @Query('category') category,
    ) {
        return this.itemsService.findAllPagination({ page: page, limit: limit, search: search, category: category });
    }

}