# Items Comparison API

## API Design

This API is designed to compare and manage items. It uses NestJS as its main framework and follows REST principles for organizing its endpoints. The project structure is divided into modules, controllers, services, and entities, facilitating scalability and maintenance.

### Main Folders
- `src/items/`: Main logic about items (module, service, controllers, entities, schemas)
- `src/common/`: Common utilities and validations
- `src/health/`: Endpoint Healthcheck for monitoring
- `data/`: File data (eg: `items.json`)
- `scripts/`: Scripts aux (eg: seed data)

## Main Endpoints

### Items
- `GET /items`: Get all items
- `GET /items/pagination`: Get all items with pagination
- `GET /items/:id`: Get one item by ID
- `POST /items`: Create a new item
- `POST /items/file`: Create items from a file
- `PUT /items/:id`: Update a item by ID
- `DELETE /items/:id`: Delete a item by ID
- `GET /items/template`: Download a template file

### Health
- `GET /health`: Verify the API status

## Notes

- The API configuration is located in  `src/common/config/configuration.ts`.
- The data file is in `data/items.json`.
- To customize validations, review the pipes in `src/common/pipes/`.

## 🚀 Project Setup & Run Instructions

For detailed setup and run instructions, see [run.md](./run.md).

## Architecture & Patterns

This project follows a modular architecture using NestJS, which encourages separation of concerns and scalability. Key patterns and practices include:

- **Modularization:** Each feature (items, health, common utilities) is encapsulated in its own module, controller, and service, following the NestJS module system.
- **Dependency Injection:** Services and controllers use NestJS's dependency injection for testability and loose coupling.
- **DTO & Validation:** Data Transfer Objects (DTOs) and Zod schemas are used for input validation and type safety, implemented via custom pipes.
- **Repository Pattern (in-memory):** The service layer acts as a repository, abstracting data access and manipulation, making it easy to swap implementations (e.g., switch from file-based to database).
- **RESTful Controllers:** Controllers expose RESTful endpoints, each mapped to a specific HTTP method and route, with clear separation between read, write, and update operations.
- **Error Handling:** Uses NestJS exception filters and custom error responses for robust error management.
- **Testing:** The structure supports unit and e2e testing using Jest and NestJS testing utilities.

This approach ensures maintainability, scalability, and clarity in the codebase, making it easy to extend or refactor as requirements evolve.

## GenAI & Modern Development Tools

This project leverages Generative AI and modern development tools to boost productivity and code quality:

- **GitHub Copilot:** Used for code autocompletion, suggestions, and rapid prototyping, helping to write boilerplate and complex logic faster.
- **Copilot Agent Mode:** Assisted in generating key files such as the Dockerfile, README, and unit tests, streamlining repetitive and setup tasks.
- **Automated Documentation:** AI tools helped draft and refine documentation, ensuring clarity and consistency.
- **Testing Automation:** AI-assisted generation of test cases and specs improved coverage and reliability.

By integrating these tools, development becomes more efficient, less error-prone, and allows the team to focus on solving business problems rather than manual setup or repetitive coding.

