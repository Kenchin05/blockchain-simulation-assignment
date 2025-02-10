# Use Node.js official image as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy the rest of the application
COPY . .

# Expose port
EXPOSE 5000

# Start command
CMD ["node", "server/server.js"]