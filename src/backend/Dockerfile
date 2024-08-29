FROM node:21.6.2-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci

COPY . .

# Use ts-node with nodemon for hot-reload during development
CMD ["npm", "run", "dev"]
