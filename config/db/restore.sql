use "BEMED";

-- Users Table
CREATE TABLE
    users (
        id INT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
    );

-- Treatments Table
CREATE TABLE
    treatments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
        updatedAt DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY (userId) REFERENCES users (id)
    );

-- Questions Table
CREATE TABLE
    questions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        question VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
    );

-- Answers Table
CREATE TABLE
    answers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        questionId INT NOT NULL,
        treatmentId INT NOT NULL,
        answer VARCHAR(255) NOT NULL,
        FOREIGN KEY (questionId) REFERENCES questions (id) FOREIGN KEY (treatmentId) REFERENCES treatments (id)
    );

-- Products Table
CREATE TABLE
    products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        weight FLOAT NOT NULL,
        EF FLOAT NOT NULL,
        alternativeId INT,
        FOREIGN KEY (alternativeId) REFERENCES alternatives (id)
    );

-- Assesments Table
CREATE TABLE
    assesments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userId INT NOT NULL,
        ppm INT NOT NULL,
        productId INT NOT NULL,
        createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
        updatedAt DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY (userId) REFERENCES users (id),
        FOREIGN KEY (productId) REFERENCES alternatives (id)
    );

-- Alternatives Table
CREATE TABLE
    alternatives (
        id INT PRIMARY KEY AUTO_INCREMENT,
        productId INT NOT NULL,
        FOREIGN KEY (productId) REFERENCES products (id) ON DELETE CASCADE
    );

INSERT INTO
    questions (question, type)
VALUES
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

INSERT INTO
    alternatives (id, productId)
VALUES
    (1, 1);

(2, 1);

INSERT INTO
    products (name, price, weight, EF, alternativeId)
VALUES
    ('Plastic straws', 0.10, 0.01, 0.5, NULL),
    ('Paper straws', 0.15, 0.01, 0.2, 1),
    ('Reusable straws', 0.50, 0.25, 0.1, 2);