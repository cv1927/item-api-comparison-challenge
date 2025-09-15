import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';


/**
 * Zod schema for creating a new item.
 * Validates fields such as name, imageUrl, description, price, rating, specifications, and category.
 * Includes constraints like required fields, maximum lengths, and value ranges.
 */
export const CreateItemSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(100, 'Name must be at most 100 characters long')
        .trim(),
    imageUrl: z.url('Image URL must be a valid URL')
        .optional()
        .or(z.literal('')),
    description: z.string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    price: z.number()
        .positive('Price must be positive')
        .max(999999.99, 'Price too high'),
    rating: z.number()
        .min(0, 'Rating must be at least 0')
        .max(5, 'Rating must be at most 5')
        .optional(),
    specifications: z.record(z.string(), z.any())
        .optional(),
    category: z.string()
        .min(1, 'Category is required')
        .max(50, 'Category must be less than 50 characters')
        .trim(),
});

/**
 * Zod schema for an array of items.
 * Ensures at least one item is present in the array.
 */
export const CreateItemArraySchema = z.array(CreateItemSchema).min(1, 'At least one item is required');


/**
 * Zod schema for updating an item.
 * Reuses the CreateItemSchema as all fields are optional for updates.
 */
export const UpdateItemSchema = CreateItemSchema;

/**
 * Zod schema for Pagination parameters.
 * Includes page number, limit, search term, and category filter.
 */
export const PaginationSchema = z.object({
  page: z
    .number()
    .int()
    .positive('Page must be positive')
    .default(1)
    .optional(),
  limit: z
    .number()
    .int()
    .positive('Limit must be positive')
    .max(100, 'Limit cannot exceed 100')
    .default(10)
    .optional(),
  search: z
    .string()
    .max(100, 'Search term too long')
    .optional(),
  category: z
    .string()
    .max(50, 'Category filter too long')
    .optional(),
});

/**
 * DTO classes generated from Zod schemas for type-safe validation in NestJS.
 */
export class CreateItemDto extends createZodDto(CreateItemSchema) {};
export class CreateItemArrayDto extends createZodDto(CreateItemArraySchema) {};
export class UpdateItemDto extends createZodDto(UpdateItemSchema) {};
export class PaginationDto extends createZodDto(PaginationSchema) {};