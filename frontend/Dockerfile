# Use the official Node.js image as the base image
FROM node:21-alpine AS build

WORKDIR /app

# Load args and set env variables
ARG KEYCLOAK_REALM
ARG KEYCLOAK_FRONTEND_CLIENT_ID
ARG KEYCLOAK_CLIENT_SECRET
ARG BEMED_DOMAIN
ARG DNS_PREFIX_KEYCLOAK
ARG DNS_PREFIX_BEMED_BACKEND

ENV KEYCLOAK_REALM=$KEYCLOAK_REALM
ENV KEYCLOAK_FRONTEND_CLIENT_ID=$KEYCLOAK_FRONTEND_CLIENT_ID
ENV KEYCLOAK_CLIENT_SECRET=$KEYCLOAK_CLIENT_SECRET
ENV BEMED_DOMAIN=$BEMED_DOMAIN
ENV DNS_PREFIX_KEYCLOAK=$DNS_PREFIX_KEYCLOAK
ENV DNS_PREFIX_BEMED_BACKEND=$DNS_PREFIX_BEMED_BACKEND

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

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
