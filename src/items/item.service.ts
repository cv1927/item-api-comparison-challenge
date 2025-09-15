import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { join } from "path";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { v4 as uuidv4 } from 'uuid';

// Entities
import { Item } from "./entities/item.entity";
import { CreateItemDto, PaginationDto, UpdateItemDto } from "./schemas/item.schema";

@Injectable()
export class ItemService {
    private readonly logger = new Logger(ItemService.name);
    private readonly directoryPath = join(process.cwd(), 'data');
    private readonly dataPath = join(this.directoryPath, 'items.json');
    private items: Item[] = [];

    constructor() {
        this.loadItems();
    }

    private loadItems() {
        try {
            if (!existsSync(this.directoryPath)) {
                this.logger.warn(`Data directory not found, creating at ${this.directoryPath}`);
                mkdirSync(this.directoryPath);
            }

            if (!existsSync(this.dataPath)) {
                this.logger.warn(`Data file not found at ${this.dataPath}, initializing empty item list.`);
                this.items = [];
                this.saveItems();
                return;
            }

            const data = readFileSync(this.dataPath, 'utf-8');
            this.items = JSON.parse(data) as Item[];
            this.logger.log(`Loaded ${this.items.length} items from ${this.dataPath}`);
        } catch (error) {
            this.logger.error('Failed to load items', error);
        }
    }

    private saveItems(): void {
        try {
            // Validate directory existence
            if (!existsSync(this.directoryPath)) {
                this.logger.warn(`Data directory not found, creating at ${this.directoryPath}`);
                mkdirSync(this.directoryPath);
            }

            writeFileSync(this.dataPath, JSON.stringify(this.items, null, 2), 'utf-8');
            this.logger.log(`Saved ${this.items.length} items to ${this.dataPath}`);
        } catch (error) {
            this.logger.error('Failed to save items', error);
        }
    }

    async findAllPagination(pagination: PaginationDto) {
        let filteredItems = [...this.items];

        if (pagination.search) {
            const searchLower = pagination.search.toLowerCase();
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchLower) ||
                (item.description?.toLowerCase().includes(searchLower))
            );
        }

        if (pagination.category) {
            filteredItems = filteredItems.filter(
                item => item.category.toLowerCase() === (pagination.category ? pagination.category.toLowerCase() : "")
            );
        }

        const page = pagination.page || 1;
        const limit = pagination.limit || 10;
        const offset = (page - 1) * limit;
        const total = filteredItems.length;
        const totalPages = Math.ceil(total / limit);

        const paginatedItems = filteredItems.slice(offset, offset + limit);

        return {
            data: paginatedItems,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }

    async findAll(): Promise<Item[]> {
        this.logger.log(`Fetching all items, total count: ${this.items.length}`);
        return this.items;
    }

    async findOne(id: string): Promise<Item> {
        this.logger.log(`Finding item with id: ${id}`);
        const item = this.items.find(item => item.id === id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        return item;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const newItem = new Item({
            id: uuidv4(),
            ...createItemDto
        });

        this.items.push(newItem);
        this.saveItems();
        this.logger.log(`Created new item with id: ${newItem.id}`);
        return newItem;
    }

    async createMany(createItemDtos: CreateItemDto[]): Promise<Item[]> {
        
        const newItems = createItemDtos.map(dto => new Item({
            id: uuidv4(),
            ...dto
        }));

        this.items.push(...newItems);
        this.saveItems();
        this.logger.log(`Created ${newItems.length} new items`);
        return newItems;
    }

    async remove(id: string): Promise<void> {
        this.logger.log(`Removing item with id: ${id}`);
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        this.items.splice(index, 1);
        this.saveItems();
    }

    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        this.logger.log(`Updating item with id: ${id}`);
        const itemFound = await this.findOne(id);
        const updatedItem = new Item({ ...itemFound, ...updateItemDto, id });
        const index = this.items.findIndex(item => item.id === id);
        this.items[index] = updatedItem;
        this.saveItems();
        return updatedItem;
    }
}