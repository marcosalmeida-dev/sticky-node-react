# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the production build
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to run the frontend
CMD ["serve", "-s", "build"]
