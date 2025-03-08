# Use an appropriate base image for your backend application
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Production stage
FROM node:21-alpine AS production

WORKDIR /usr/src/app

# Copy only the necessary files for production
COPY --from=build /usr/src/app ./

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

# Development stage
FROM node:21-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
