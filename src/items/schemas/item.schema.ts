import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

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

export const CreateItemArraySchema = z.array(CreateItemSchema).min(1, 'At least one item is required');

export const UpdateItemSchema = CreateItemSchema;

export const ItemComparisonSchema = z.object({
  itemIds: z
    .array(z.string().uuid('Invalid item ID format'))
    .min(2, 'At least 2 items are required for comparison')
    .max(5, 'Maximum 5 items can be compared at once'),
});

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

export class CreateItemDto extends createZodDto(CreateItemSchema) {};
export class CreateItemArrayDto extends createZodDto(CreateItemArraySchema) {};
export class UpdateItemDto extends createZodDto(UpdateItemSchema) {};
export class ItemComparisonDto extends createZodDto(ItemComparisonSchema) {};
export class PaginationDto extends createZodDto(PaginationSchema) {};