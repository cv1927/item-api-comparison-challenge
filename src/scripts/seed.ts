import { faker } from "@faker-js/faker";
import { NestFactory } from "@nestjs/core";
import inquirer from "inquirer";
import { AppModule } from "src/app.module";
import { ItemService } from "src/items/item.service";
import { CreateItemDto } from "src/items/schemas/item.schema";


/**
 * Seed the database with initial data.
 * It can be configured via environment variables or interactive prompts.
 * 
 * Environment Variables:
 * - SEED: If set to '1' or 'true', enables seeding without prompt.
 * - SEED_COUNT: Number of items to create (default is 0, which prompts for input).
 * 
 * If not set, the script will prompt the user for confirmation and count.
 * @returns void
 */
async function run() {
    const appCtx = await NestFactory.createApplicationContext(AppModule);


    const itemService = appCtx.get(ItemService);

    const envSeed = process.env.SEED?.toLowerCase() === '1' || process.env.SEED?.toLowerCase() === 'true';
    const countEnv = Number(process.env.SEED_COUNT || 0);

    let doSeed = envSeed;
    let count = countEnv

    if (!envSeed && process.stdin.isTTY) {
        const answer = await inquirer.prompt([
            { type: 'confirm', name: 'seed', message: 'Do you want to seed the database with initial data?', default: false },
        ]);
        doSeed = answer.seed;

        if (doSeed) {
            const countAnswer = await inquirer.prompt([
                { type: 'number', name: 'count', message: 'How many items do you want to create?', default: 10 },
            ]);

            count = countAnswer.count;
        }
    }

    if (!doSeed) {
        console.log('Seeding aborted.');
        await appCtx.close();
        return;
    }

    const items: CreateItemDto[] = Array.from({ length: count }).map(() => ({
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
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await itemService.createMany(items);

    console.log(`Seeded ${items.length} items.`);

    await appCtx.close();
}

run().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
});