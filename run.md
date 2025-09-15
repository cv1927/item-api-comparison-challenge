## Setup Instructions

### 1. Requirement
- Node.js >= 18
- Docker (Optional, for deploy)

### 2. Install
```bash
# Install dependencies
$ npm install
```

### 3. Compile the project
```bash
# Build the project
$ npm run build
```

### 5. Run project
```bash
# Execute the project
$ npm run start:prod
```

-------
(Optional)

### 1. Seed data
```bash
# Execute the script seed
# If you need some data testing run this command
$ npm run seed
```

### 2. Use with Docker
```bash
# Build and up the services
$ docker-compose up --build
```

### 3. Testing
```bash
# Execute the test
$ npm run test

# Execute the test end-to-end
$ npm run test:e2e
```