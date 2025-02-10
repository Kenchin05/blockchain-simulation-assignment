# Simple Blockchain Implementation

## Overview
This project is a basic implementation of a blockchain using Node.js. It demonstrates core blockchain concepts including:
- Block creation and chaining
- Proof of Work (PoW) mining mechanism
- Chain validation
- Hash calculation using SHA-256

The application exposes REST APIs to interact with the blockchain, allowing users to:
- Mine new blocks
- View the entire chain
- Adjust mining difficulty
- Get previous block information

## Technical Stack
- Node.js
- Express.js
- Docker
- SHA-256 for hashing

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine
- Node.js (if running without Docker)

### Running with Docker

1. Clone the repository
```bash
git clone <repository-url>
cd blockchain-app
```

2. Build the Docker image
```bash
docker build -t blockchain-app .
```

3. Run using Docker Compose
```bash
docker-compose up
```

The application will be available at `http://localhost:5000`

### Running without Docker

1. Install dependencies
```bash
npm install
```

2. Start the application
```bash
npm start
```



## Proof of Work
The project implements a basic Proof of Work mechanism where:
- Each block requires computational work to be mined
- Difficulty level determines required leading zeros in block hash
- Default difficulty is set to 5 (configurable)

## Docker Configuration
The application is containerized with:
- Node.js 18 Alpine base image
- Volume mounting for development
- Port 5000 exposed
- Hot-reloading enabled for development

## Example Usage

1. Mine a new block:
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"data":"My First Block"}' \
     http://localhost:5000/mineblock
```

2. View the blockchain:
```bash
curl http://localhost:5000/getchain
```

3. Change mining difficulty:
```bash
curl http://localhost:5000/setDifficulty?difficulty=4
```

## Development

To run in development mode with hot-reloading:
```bash
docker-compose up --build
```


