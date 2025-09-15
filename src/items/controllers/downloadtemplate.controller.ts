import { Controller, Get, Header, Res, StreamableFile } from "@nestjs/common";
import { ApiOkResponse, ApiProduces, ApiTags } from "@nestjs/swagger";
import { Item } from "../entities/item.entity";
import { faker } from "@faker-js/faker";


@ApiTags('items')
@Controller('items')
export class DownloadTemplateController {
    
    @Get('download-template')
    @ApiProduces('application/json')
    @ApiOkResponse({
        description: 'Download item creation template in JSON format',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'Sample Item' },
                    description: { type: 'string', example: 'This is a sample item description.' },
                    price: { type: 'number', example: 19.99 },
                    category: { type: 'string', example: 'Sample Category' }
                },
                required: ['name', 'price']
            }
        }
    })
    @Header('Content-Disposition', 'attachment; filename="item-template.json"')
    async downloadTemplate(): Promise<StreamableFile> {
        const item = new Item({
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price({ dec: 2, min: 1, max: 1000 })),
            category: faker.commerce.department(),
            imageUrl: faker.image.url(),
            rating: parseFloat((Math.random() * 5).toFixed(1)),
            specifications: {
                screen: `${faker.number.int({ min: 4, max: 7 })}.${faker.number.int({ min: 0, max: 9 })} inches`,
                storage: `${faker.helpers.arrayElement(['64GB', '128GB', '256GB', '512GB', '1TB'])}`,
                camera: `${faker.number.int({ min: 8, max: 108 })}MP`,
                battery: `${faker.number.int({ min: 2000, max: 5000 })}mAh`,
                ram: `${faker.helpers.arrayElement(['2GB', '4GB', '6GB', '8GB', '12GB', '16GB'])}`,
                processor: faker.helpers.arrayElement(['Snapdragon 888', 'Apple A14 Bionic', 'Exynos 2100', 'Kirin 9000', 'MediaTek Dimensity 1200']),
            }
        }); 

        return new StreamableFile(Buffer.from(JSON.stringify([item], null, 2), 'utf-8'));
    }
}