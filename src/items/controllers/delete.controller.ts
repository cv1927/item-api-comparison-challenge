import { Controller, Delete, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

// Services
import { ItemService } from "../item.service";


/**
 * Controller for deleting items.
 * Provides an endpoint to delete an item by its unique identifier.
 * Returns a success response upon successful deletion.
 */
@ApiTags('items')
@Controller('items')
export class DeleteItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete item by ID',
        description: 'Deletes an existing item by its unique identifier',
    })
    @ApiQuery({ name: 'id', description: 'Item UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Item deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found' })
    async remove(@Query('id') id: string) {
        await this.itemsService.remove(id);
    }

}