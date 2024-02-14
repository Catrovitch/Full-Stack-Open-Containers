# Use official Node.js image as base for building
FROM node:14 as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the production version of the application
RUN npm run build

# Expose the port your Node.js server will listen on
EXPOSE 3000

# Command to start the Node.js server
CMD ["node", "app.js"]
