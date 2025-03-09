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

EXPOSE $BEMED_API_PORT

# Start the application
CMD ["npm", "run", "start"]

# Development stage
FROM node:21-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $BEMED_API_PORT

# Start the development server
CMD ["npm", "run", "dev"]
