USE "BEMED";

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Treatments Table
CREATE TABLE treatments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- Questions Table
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    treatmentId INT NOT NULL,
    question VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (treatmentId) REFERENCES treatments(id)
);

-- Answers Table
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questionId INT NOT NULL,
    treatmentId INT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (questionId) REFERENCES questions(id)
    FOREIGN KEY (treatmentId) REFERENCES treatments(id)
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    EF FLOAT NOT NULL,
    productId INT,
    FOREIGN KEY (productId) REFERENCES products(id)
);

-- Assesments Table
CREATE TABLE assesments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    ppm INT NOT NULL,
    productId INT NOT NULL,
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES alternatives(id)
);

-- Alternatives Table
CREATE TABLE alternatives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);
