USE "BEMED";

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Treatments Table
CREATE TABLE treatments (
    id INT PRIMARY KEY,
    userId INT,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Questions Table
CREATE TABLE questions (
    id INT PRIMARY KEY,
    questionFor INT,
    question VARCHAR(255),
    type VARCHAR(50),
    FOREIGN KEY (questionFor) REFERENCES treatments(id)
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price FLOAT,
    weight FLOAT,
    EF FLOAT,
    toProduct INT,
    FOREIGN KEY (toProduct) REFERENCES products(id)
);

-- Assesments Table
CREATE TABLE assesments (
    id INT PRIMARY KEY,
    userId INT,
    ppm INT,
    productId INT,
    createdAt DATE,
    updatedAt DATE,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);

-- Alternatives Table
CREATE TABLE alternatives (
    id INT PRIMARY KEY,
    productId INT,
    FOREIGN KEY (productId) REFERENCES products(id)
);
