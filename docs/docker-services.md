# Docker Services Documentation

## Overview

The BEMED application architecture is based on a microservices approach using Docker containers, orchestrated with Docker Compose. This document details each service, its purpose, configuration, and how it integrates with other components.

## Traefik

Traefik serves as the entry point for all requests, acting as a reverse proxy and load balancer.

### Configuration Traefik

```yaml
traefik:
  container_name: traefik
  env_file: .env
  image: traefik:latest
  restart: unless-stopped
  ports:
    - "80:80"
    - "443:443"
    - "8080:8080"
  volumes:
    - ./config/traefik/:/etc/traefik/:ro
    - /var/run/docker.sock:/var/run/docker.sock:ro
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.traefik.rule=Host(`traefik.${BEMED_DOMAIN}`)"
    - "traefik.http.routers.traefik.entrypoints=web"
    - "traefik.http.services.traefik.loadbalancer.server.port=8080"
```

### Key Features Traefik

- **Dynamic Configuration**: Automatically discovers and configures routes to services
- **Dashboard**: Web UI for monitoring and management at port 8080
- **TLS Termination**: Handles HTTPS connections and certificate management
- **Host-Based Routing**: Routes traffic based on domain names

## Portainer

Portainer provides a web interface for managing Docker containers, images, networks, and volumes.

### Configuration Portainer

```yaml
portainer:
  container_name: portainer
  image: portainer/portainer-ce:latest
  restart: always
  environment:
    - ADMIN_PASSWORD=admin
  ports:
    - "9000:9000" 
  volumes:
    - "/var/run/docker.sock:/var/run/docker.sock:ro" 
    - "portainer_data:/data" 
```

### Key Features Portainer

- **Container Management**: Start, stop, and manage containers
- **Resource Monitoring**: Track container resource usage
- **Volume Management**: Create and manage Docker volumes
- **Access Control**: User management with role-based access control

## Keycloak

Keycloak provides identity and access management for the application, handling authentication and authorization.

### Configuration Keycloak

```yaml
keycloak:
  container_name: keycloak
  env_file: .env
  restart: unless-stopped
  image: quay.io/keycloak/keycloak:26.1
  command:
    - "start-dev"
    - "--import-realm"
  environment:
    - KC_BOOTSTRAP_ADMIN_USERNAME=${KC_BOOTSTRAP_ADMIN_USERNAME}
    - KC_BOOTSTRAP_ADMIN_PASSWORD=${KC_BOOTSTRAP_ADMIN_PASSWORD}
    - KC_DB_USERNAME=${KC_DB_USERNAME}
    - KC_DB_PASSWORD=${KC_DB_PASSWORD}
    - KC_DB=mariadb
    - KC_DB_URL=jdbc:mariadb://db/${KC_DB_NAME}
    - KC_HOSTNAME=${BEMED_PROTOCOL}://${DNS_PREFIX_KEYCLOAK}.${BEMED_DOMAIN}/
    - KC_PROXY_HEADERS=xforwarded 
    - KC_HEALTH_ENABLED=true
    - KC_METRICS_ENABLED=true
    - KC_HTTP_ENABLED=true
    - KC_LOG_CONSOLE_LEVEL=debug
  ports:
    - "8082:8080"
    - "8433:8443"
    - "8083:9000"
  volumes:
    - ./config/keycloak/:/opt/keycloak/data/import/:ro
```

### Key Features Keycloak

- **User Management**: Registration, login, and profile management
- **Identity Brokering**: Connect to external identity providers like Google or Facebook
- **Multi-factor Authentication**: Additional security layers
- **OAuth2/OpenID Connect**: Standard protocols for authentication and authorization
- **Client Registration**: Register frontend and backend applications

## MariaDB

MariaDB serves as the primary database for the application, storing all application data.

### Configuration MariaDB

```yaml
db:
  container_name: database
  env_file: .env
  restart: unless-stopped
  image: mariadb:11.7.2
  environment:
    - MARIADB_ROOT_PASSWORD=${MARIADB_ROOT_PASSWORD}
  ports:
    - "3306:3306"
  volumes:
    - ./config/db/:/docker-entrypoint-initdb.d/:ro
    - database_data:/var/lib/mysql
```

### Key Features MariaDB

- **Relational Database**: SQL-compliant database for structured data
- **Data Persistence**: Volume mapping for persistent storage
- **Initialization Scripts**: Automatically runs SQL scripts for schema creation
- **Performance**: Optimized for high performance and concurrent connections

## PHPMyAdmin

PHPMyAdmin provides a web interface for database administration.

### Configuration PHPMyAdmin

```yaml
phpmyadmin:
  container_name: phpmyadmin
  env_file: .env
  restart: unless-stopped
  image: phpmyadmin:latest
  environment:
    - PMA_HOST=db
    - PMA_USER=root
    - PMA_PASSWORD=${MARIADB_ROOT_PASSWORD}
  ports:
    - "8081:80"
```

### Key Features PHPMyAdmin

- **Database Management**: Create, modify, and drop databases and tables
- **SQL Execution**: Run SQL queries through a web interface
- **Data Inspection**: Browse and edit database contents
- **Export/Import**: Import and export data in various formats

## Backend API

The backend API service provides the application's server-side logic and RESTful endpoints.

### Configuration Backend API

```yaml
backend:
  container_name: backend
  env_file: .env
  restart: unless-stopped
  build:
    context: ./backend
    target: production
  environment:
    - KEYCLOAK_REALM=${KEYCLOAK_REALM}
    - KEYCLOAK_CLIENT_ID=${KEYCLOAK_BACKEND_CLIENT_ID}
    - KEYCLOAK_CLIENT_SECRET=${KEYCLOAK_CLIENT_SECRET}
  ports:
    - "3000:${BEMED_API_PORT}"
```

### Key Features Backend API

- **API Endpoints**: RESTful API for application data
- **Authentication Integration**: Keycloak integration for secure endpoints
- **Database Access**: Interaction with MariaDB for data persistence
- **Business Logic**: Implementation of application business rules

## Frontend

The frontend service serves the Vue.js web application to users.

### Configuration Frontend

```yaml
frontend:
  container_name: frontend
  env_file: .env
  restart: unless-stopped
  build:
    context: ./frontend
    target: ${NODE_ENV}
    args:
      KEYCLOAK_REALM: ${KEYCLOAK_REALM}
      KEYCLOAK_FRONTEND_CLIENT_ID: ${KEYCLOAK_FRONTEND_CLIENT_ID}
      KEYCLOAK_CLIENT_SECRET: ${KEYCLOAK_CLIENT_SECRET}
      BEMED_DOMAIN: ${BEMED_DOMAIN}
      DNS_PREFIX_KEYCLOAK: ${DNS_PREFIX_KEYCLOAK}
      DNS_PREFIX_BEMED_BACKEND: ${DNS_PREFIX_BEMED_BACKEND}
      BEMED_PROTOCOL: ${BEMED_PROTOCOL}
```

### Key Features Frontend

- **Web Interface**: User interface for the application
- **Responsive Design**: Works on desktop and mobile devices
- **Authentication**: Integration with Keycloak for user authentication
- **API Communication**: Connection to backend API for data operations

## Documentation

The documentation service provides a web interface for viewing the project documentation.

### Configuration Documentation

```yaml
docs:
  container_name: docs
  build:
    context: .
    dockerfile: config/mkdocs/Dockerfile
  restart: unless-stopped
  volumes:
    - ./docs:/docs
    - ./config/mkdocs:/config/mkdocs
    - ./frontend/public/:/docs/assets/:ro
  user: "${UID:-1000}:${GID:-1000}"
  ports:
    - "8085:8000"
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.docs.rule=Host(`docs.${BEMED_DOMAIN}`)"
    - "traefik.http.routers.docs.entrypoints=web"
    - "traefik.http.services.docs.loadbalancer.server.port=8000"
  depends_on:
    - traefik
  environment:
    - ENABLE_LIVE_RELOAD=true
```

### Key Features Documentation

- **Documentation Website**: Web-based access to project documentation
- **Search**: Full-text search across documentation
- **Navigation**: Structured navigation menu
- **Markdown Support**: Documentation written in Markdown format
- **Live Updates**: Documentation updates automatically when source files change thanks to live reload
- **Asset Integration**: Frontend assets are available to the documentation
- **MkDocs Material Theme**: Modern and responsive documentation theme with dark/light mode

## Data Volumes

The application uses Docker volumes for persistent data storage:

```yaml
volumes:
  database_data:  # Persistent storage for MariaDB data
  portainer_data:  # Persistent storage for Portainer settings
```

## Network Configuration

All services are connected to the default bridge network created by Docker Compose, allowing them to communicate with each other using their service names as hostnames.
