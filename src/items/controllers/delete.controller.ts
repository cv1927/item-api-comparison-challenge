import { Controller, Delete, Get, HttpStatus, Param, Post, Put, UsePipes } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

// Services
import { ItemService } from "../item.service";


@ApiTags('items')
@Controller('items')
export class DeleteItemController {
    constructor(private readonly itemsService: ItemService) {}

    @Delete()
    @ApiOperation({
        summary: 'Delete item by ID',
        description: 'Deletes an existing item by its unique identifier',
    })
    @ApiParam({ name: 'id', description: 'Item UUID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Item deleted successfully' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found' })
    async remove(@Param('id') id: string) {
        await this.itemsService.remove(id);
    }

}