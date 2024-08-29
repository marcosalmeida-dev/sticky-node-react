# Use the official Node.js image.
FROM node:21.6.2-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the source code into the container
COPY . .

# Expose the frontend port
EXPOSE 3000

# Command to run the frontend in development mode
CMD ["npm", "start"]
