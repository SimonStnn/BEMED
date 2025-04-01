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
    type VARCHAR(50) NOT NULL,
    required BOOLEAN NOT NULL DEFAULT TRUE,
    options VARCHAR(255) NULL DEFAULT NULL,
    unit VARCHAR(50) NULL DEFAULT NULL,
    regex VARCHAR(255) NULL DEFAULT NULL
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
    description VARCHAR(255) NULL DEFAULT NULL,
    price FLOAT NULL DEFAULT NULL,
    weight FLOAT NULL DEFAULT NULL,
    EF FLOAT NULL DEFAULT NULL
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
CREATE TABLE assessments (
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
VALUES --
    (
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
INSERT INTO products (name, description, price, weight, EF)
VALUES --
    -- SUP plastic straws
    (
        'SUP straws',
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        'Paper straws',
        'Single use paper straws',
        NULL,
        NULL,
        6.21
    ),
    (
        'Reusable straws',
        'Reusable straws from hard plastic',
        NULL,
        NULL,
        3.24
    ),
    (
        'No straws',
        NULL,
        NULL,
        NULL,
        0.0
    ),
    -- SUP plastic cups
    (
        'SUP cups',
        'Single use plastic cups',
        NULL,
        NULL,
        NULL
    ),
    (
        'Paper cups',
        'Single use paper cups',
        NULL,
        NULL,
        7.02
    ),
    (
        'Reusable cups',
        'Reusable cups from hard plastic',
        NULL,
        NULL,
        3.69
    ),
    (
        'Reusable cups',
        'Reusable cups from ceramic, glass or other materials',
        NULL,
        NULL,
        3.15
    ),
    -- SUP plastic plates
    (
        'SUP plates',
        NULL,
        0.30,
        0.03,
        0.7
    ),
    (
        'Paper plates',
        NULL,
        0.35,
        0.03,
        0.4
    ),
    (
        'Reusable plates',
        NULL,
        1.50,
        1.0,
        0.3
    ),
    -- SUP water bottles
    (
        'SUP water bottles',
        NULL,
        0.50,
        0.05,
        0.8
    ),
    (
        'No water bottles',
        'No water bottles, only tapwater',
        1.50,
        0.5,
        0.4
    ),
    (
        'Water dispencer',
        'Water dispencer with returnable 5L bottles',
        1.50,
        0.5,
        0.4
    ),
    (
        'Reusable water bottles',
        'Reusable water bottles e.g. glass bottles',
        1.50,
        0.5,
        0.4
    ),
    -- SUP juice bottles
    (
        'SUP juice bottles',
        NULL,
        0.50,
        0.05,
        0.8
    ),
    (
        'Drinks made on site',
        NULL,
        1.50,
        0.5,
        0.4
    ),
    (
        'Big (>5L) SUP bottles',
        'Juice dispencer with returnable 5L bottles',
        1.50,
        0.5,
        0.4
    ),
    (
        'Cans with plastic lids',
        NULL,
        1.50,
        0.5,
        0.4
    ),
    (
        'Tetra packs',
        NULL,
        1.50,
        0.5,
        0.4
    ),
    -- Plastic coffee capsules
    (
        'Plastic coffee capsules',
        NULL,
        0.50,
        0.05,
        0.8
    ),
    (
        'Coffee in plastic or aluminium bags',
        NULL,
        1.50,
        0.5,
        0.4
    ),
    (
        'Coffee purchased by weight',
        NULL,
        1.50,
        0.5,
        0.4
    ),
    (
        'No capsules used',
        NULL,
        1.50,
        0.5,
        0.4
    ) --
;
-- Insert Alternatives
INSERT INTO alternatives (productId, alternativeId)
VALUES --
    -- plastic straws can be replaced by paper straws
    (1, 2),
    -- plastic straws can be replaced by reusable straws
    (1, 3),
    -- paper straws can be replaced by reusable straws
    (2, 3),
    -- reusable straws can be replaced by paper straws
    (3, 2),
    -- SUP cups can be replaced by paper cups
    (5, 6),
    -- SUP cups can be replaced by reusable cups
    (5, 7),
    -- SUP cups can be replaced by reusable cups
    (5, 8),
    -- paper cups can be replaced by reusable cups
    (6, 7),
    -- paper cups can be replaced by reusable cups
    (6, 8),
    -- reusable cups can be replaced by paper cups
    (7, 6) --
;