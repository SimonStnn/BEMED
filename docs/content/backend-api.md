# Backend API Documentation

## Overview

The BEMED Backend API provides RESTful endpoints for managing waste treatments, products, assessments, and related data. The API is built using Node.js with Express and interfaces with a MariaDB database.

## Authentication

All API endpoints are secured with Keycloak authentication. The API uses the Keycloak middleware to protect routes and validate access tokens.

```typescript
// Sample authentication middleware implementation
router.use(keycloak.protect());
```

Authentication tokens should be included in the `Authorization` header as a Bearer token.

## API Endpoints

### Treatments

The treatments endpoints allow management of waste treatment systems and their associated survey answers.

#### GET /treatment

Retrieves treatment data based on the specified filters.

**Query Parameters:**
- `id` (optional): Treatment ID to retrieve a specific treatment
- `skip` (optional): Number of records to skip for pagination (default: 0)
- `limit` (optional): Maximum number of records to return (default: 10)

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user-uuid",
    "createdAt": "2025-04-17T12:00:00Z",
    "updatedAt": "2025-04-17T12:00:00Z",
    "answers": [
      {
        "questionId": 1,
        "answer": "Yes"
      }
    ]
  }
]
```

#### POST /treatment

Creates a new treatment record with associated answers.

**Request Body:**
```json
{
  "answers": [
    {
      "questionId": 1,
      "answer": "Yes"
    },
    {
      "questionId": 2,
      "answer": "No"
    }
  ]
}
```

**Response:**
Returns the created treatment object with its ID and timestamps.

#### DELETE /treatment

Deletes a treatment record.

**Query Parameters:**
- `id`: ID of the treatment to delete

### Products

The products endpoints allow management of product data and their environmental alternatives.

#### GET /product

Retrieves product data based on specified filters.

**Query Parameters:**
- `id` (optional): Product ID to retrieve a specific product
- `skip` (optional): Number of records to skip for pagination (default: 0)
- `limit` (optional): Maximum number of records to return (default: 10)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Plastic Water Bottle",
    "description": "Single-use plastic water bottle",
    "price": 1.5,
    "weight": 15,
    "EF": 8.4,
    "alternatives": [
      {
        "id": 2,
        "name": "Reusable Water Bottle",
        "description": "Stainless steel reusable water bottle",
        "price": 20,
        "weight": 250,
        "EF": 2.1
      }
    ]
  }
]
```

#### POST /product

Creates a new product record.

**Request Body:**
```json
{
  "name": "Plastic Water Bottle",
  "description": "Single-use plastic water bottle",
  "price": 1.5,
  "weight": 15,
  "EF": 8.4
}
```

**Response:**
Returns the created product object with its ID.

#### PUT /product

Updates an existing product record.

**Request Body:**
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "description": "Updated product description",
  "price": 2.5,
  "weight": 20,
  "EF": 7.8
}
```

**Response:**
Returns the updated product object.

#### DELETE /product

Deletes a product record.

**Query Parameters:**
- `id`: ID of the product to delete

#### POST /product/alternative

Creates a relationship between a product and its alternative.

**Request Body:**
```json
{
  "productId": 1,
  "alternativeId": 2
}
```

**Response:**
Returns the updated product object with its alternatives.

#### DELETE /product/alternative

Removes a relationship between a product and its alternative.

**Query Parameters:**
- `productId`: ID of the main product
- `alternativeId`: ID of the alternative to remove

### Assessments

The assessments endpoints allow creation and retrieval of product usage assessments.

#### GET /assessment

Retrieves assessment data based on the specified filters.

**Query Parameters:**
- `id` (optional): Assessment ID to retrieve a specific assessment
- `skip` (optional): Number of records to skip for pagination (default: 0)
- `limit` (optional): Maximum number of records to return (default: 10)

**Response:**
```json
[
  {
    "id": 1,
    "userId": "user-uuid",
    "productId": 1,
    "ppm": 30,
    "createdAt": "2025-04-17T12:00:00Z",
    "updatedAt": "2025-04-17T12:00:00Z",
    "product": {
      "id": 1,
      "name": "Plastic Water Bottle",
      "description": "Single-use plastic water bottle",
      "price": 1.5,
      "weight": 15,
      "EF": 8.4
    }
  }
]
```

#### POST /assessment

Creates a new assessment record.

**Request Body:**
```json
{
  "productId": 1,
  "ppm": 30
}
```

**Response:**
Returns the created assessment object with its ID and timestamps.

## Error Handling

The API uses a centralized error handling middleware that returns consistent error responses:

```json
{
  "error": {
    "message": "Error message",
    "status": 400,
    "details": {}
  }
}
```

Common HTTP status codes:
- `200 OK`: Request succeeded
- `201 Created`: Resource was created
- `400 Bad Request`: Invalid parameters or request body
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Authentication succeeded but user lacks permission
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Unexpected server error