import { ApiProperty } from "@nestjs/swagger";

/**
 * Entity representing an item.
 * Includes properties such as id, name, description, imageUrl, price, rating, specifications, category, createdAt, and updatedAt.
 * The constructor initializes the item with provided values and sets timestamps.
 */
export class Item {

  @ApiProperty({
    description: 'Unique identifier for the item',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
  })
  id: string;

  @ApiProperty({
    description: 'Name of the item',
    example: 'Sample Item',
    maxLength: 100
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the item',
    example: 'This is a sample item used for demonstration purposes.',
    maxLength: 500
  })
  description?: string;

  @ApiProperty({
    description: 'URL of the item image',
    example: 'https://example.com/images/sample-item.jpg'
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Price of the item in USD',
    example: 999.99,
    minimum: 0.01,
    maximum: 999999.99,
  })
  price: number;

  @ApiProperty({
    description: 'Rating of the item (0-5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false,
  })
  rating?: number;

  @ApiProperty({
    description: 'Technical specifications of the item',
    example: {
      screen: '6.1 inches',
      storage: '128GB',
      camera: '48MP',
    },
    required: false,
  })
  specifications?: Record<string, any>;

  @ApiProperty({
    description: 'Category of the item',
    example: 'Electronics',
    maxLength: 50,
  })
  category: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  updatedAt: Date;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
    this.createdAt = this.createdAt || new Date();
    this.updatedAt = new Date();
  }
}