FROM node:21.6.2-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci

COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3001

# Command to run the frontend
CMD ["serve", "-s", "build"]