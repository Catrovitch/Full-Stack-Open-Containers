# Use official Node.js image as base for development
FROM node:14 as development

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
