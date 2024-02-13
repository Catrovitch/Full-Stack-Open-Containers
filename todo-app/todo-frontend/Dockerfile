# Stage 1: Build and test
FROM node:16 AS test-stage
WORKDIR /usr/src/app

# Copy the source code
COPY . .

# Install dependencies
RUN npm ci

# Run tests with CI=true
ENV CI=true
RUN npm test

# Stage 2: Build for production
FROM node:16 AS build-stage
WORKDIR /usr/src/app

# Copy the source code
COPY . .

# Install dependencies
RUN npm ci

# Set environment variable for backend URL
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

# Build the React app
RUN npm run build

CMD ["npm", "start"]
