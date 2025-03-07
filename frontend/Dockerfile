# Use the official Node.js image as the base image
FROM node:21-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

# Use a minimal nginx image to serve the built application
FROM nginx:alpine AS production

# Copy the built application from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM node:21-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
