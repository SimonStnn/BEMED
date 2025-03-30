use "BEMED";
-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);
-- Treatments Table
CREATE TABLE treatments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (userId) REFERENCES users (id)
);
-- Questions Table
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL
);
-- Answers Table
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questionId INT NOT NULL,
    treatmentId INT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (questionId) REFERENCES questions (id),
    FOREIGN KEY (treatmentId) REFERENCES treatments (id)
);
-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    price FLOAT NOT NULL,
    weight FLOAT NOT NULL,
    EF FLOAT NOT NULL
);
-- Alternatives Table
CREATE TABLE alternatives (
    productId INT NOT NULL,
    alternativeId INT NOT NULL,
    PRIMARY KEY (productId, alternativeId),
    FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE,
    FOREIGN KEY (alternativeId) REFERENCES products (id) ON DELETE CASCADE
);
-- Assesments Table
CREATE TABLE assesments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    productId INT NOT NULL,
    ppm INT NOT NULL,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
    updatedAt DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (productId) REFERENCES products (id)
);
-- Insert Questions
INSERT INTO questions (question, type)
VALUES (
        'Does your institution currently practice waste separation?',
        'text'
    ),
    (
        'Does your institution have special bins or containers for separate waste collection?',
        'text'
    ),
    (
        'Does your institution have established policies or guidelines for waste management?',
        'text'
    ),
    (
        'Does your institution conduct training to raise awareness about waste management?',
        'text'
    ),
    (
        'How much single-use plastic packaging has your institution collected since the beginning of the year? Approximation in KG',
        'number'
    ),
    (
        'How much paper (if collected separately) has your institution gathered so far? Approximation in KG',
        'number'
    ),
    (
        'What is the total amount of separately collected waste? Approximation in KG',
        'number'
    );
-- Insert Products
INSERT INTO products (id, name, price, weight, EF)
VALUES (1, 'Plastic straws', 0.10, 0.01, 0.5),
    (2, 'Paper straws', 0.15, 0.01, 0.2),
    (3, 'Reusable straws', 0.50, 0.25, 0.1);
-- Insert Alternatives
INSERT INTO alternatives (productId, alternativeId)
VALUES -- plastic straws can be replaced by paper straws
    (1, 2),
    -- plastic straws can be replaced by reusable straws
    (1, 3),
    -- paper straws can be replaced by reusable straws
    (2, 3),
    -- reusable straws can be replaced by paper straws
    (3, 2);