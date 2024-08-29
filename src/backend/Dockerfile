FROM node:21.6.2-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci

COPY . .

# Command to run the backend
CMD ["npm", "start"]
