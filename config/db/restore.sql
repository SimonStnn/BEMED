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
    def VARCHAR(255) NULL DEFAULT NULL,
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
        'SUP straws',
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
        'Reusable straws',
        NULL,
        NULL,
        3.24
    ),
    (
        'No straws',
        'None',
        0.0,
        0.0,
        0.0
    ),
    -- SUP plastic cups
    (
        'SUP cups',
        'SUP cups',
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
        'SUP plates',
        NULL,
        NULL,
        NULL
    ),
    (
        'Paper plates',
        'Single use paper or cardboard plates',
        NULL,
        NULL,
        7.02
    ),
    (
        'Reusable plates',
        'Reusable plates from ceramic or other',
        NULL,
        NULL,
        3.51
    ),
    (
        'Hard plastic plates',
        'Reusable plates from hard plastic',
        NULL,
        NULL,
        3.60
    ),
    -- SUP water bottles
    (
        'SUP water bottles',
        'SUP water bottles',
        NULL,
        NULL,
        NULL
    ),
    (
        'No water bottles',
        'No water bottles, only tapwater',
        0.0,
        0.0,
        0.0
    ),
    (
        'Water dispencer',
        'Water dispencer with returnable 5L bottles',
        NULL,
        NULL,
        1.85
    ),
    (
        'Returnable glass bottles',
        'Water in returnable glass bottles',
        NULL,
        NULL,
        3.00
    ),
    (
        'Single use glass bottles',
        'Water in single use glass bottles',
        NULL,
        NULL,
        5.00
    ),
    -- SUP juice bottles
    (
        'SUP juice bottles',
        'SUP juice bottles',
        NULL,
        NULL,
        NULL
    ),
    (
        'Returnable glass bottles',
        'Drinks in returnable glass bottles',
        NULL,
        NULL,
        3.0
    ),
    (
        'Single use glass bottles',
        'Drinks in single use glass bottles',
        NULL,
        NULL,
        5.5
    ),
    (
        'Drinks made on site',
        'No bottles, on-site drinks only',
        0.0,
        0.0,
        0.0
    ),
    (
        'Big (>5L) SUP bottles',
        'Juice dispencer with single use 5L bottles',
        NULL,
        NULL,
        3.69
    ),
    (
        'Cans with plastic lining',
        'Cans with plastic lining',
        NULL,
        NULL,
        6.48
    ),
    (
        'Tetra packs',
        'Drinks in Tetra Paks (with plastic lining)',
        NULL,
        NULL,
        8.0
    ),
    -- Plastic coffee capsules
    (
        'Plastic coffee capsules',
        'Plastic coffee capsules',
        NULL,
        NULL,
        7.38
    ),
    (
        'Coffee in plastic or aluminium bags',
        'Coffee in plastic or aluminium bags',
        NULL,
        NULL,
        5.54
    ),
    (
        'Coffee purchased by weight',
        'Coffee purchased by weight',
        0.0,
        0.0,
        0.0
    ),
    (
        'No capsules used',
        'No coffee capsules',
        0.0,
        0.0,
        0.0
    ),
    -- Tea bags
    (
        'Single use tea bags',
        'Single use tea bags',
        NULL,
        NULL,
        NULL
    ),
    (
        'Tea in plastic bags',
        'Tea in bigger plastic bags',
        NULL,
        NULL,
        7.38
    ),
    (
        'Tea purchased by weight',
        'Tea purchased by weight',
        0.0,
        0.0,
        0.0
    ),
    (
        'No tea bags',
        'No tea bags used',
        0.0,
        0.0,
        0.0
    ),
    (
        'Single use paper tea bags',
        'Single use paper tea bags',
        NULL,
        NULL,
        6.21
    ),
    -- plastic coffee stir sticks
    (
        'Plastic coffee stirs',
        'Plastic coffee stir sticks',
        NULL,
        NULL,
        NULL
    ),
    (
        'Reusable spoons',
        'Reusable spoons from metal or other materials',
        NULL,
        NULL,
        3.24
    ),
    (
        'Wooden sticks',
        'Wooden stir sticks',
        NULL,
        NULL,
        6.39
    ),
    (
        'No stir sticks',
        'No stir sticks',
        0.0,
        0.0,
        0.0
    ),
    -- Plastic cutlery
    (
        'SUP cutlery',
        'SUP cutlery',
        NULL,
        NULL,
        NULL
    ),
    (
        'Reusable cutlery',
        'Reusable cutlery made of metal',
        NULL,
        NULL,
        3.24
    ),
    (
        'Single use bio cutlery',
        'Single use biodegradable cutlery, paper wood etc.',
        NULL,
        NULL,
        6.48
    ),
    (
        'Bring your own cutlery',
        'Bring your own cutlery',
        0.0,
        0.0,
        0.0
    ),
    -- Plastic bags
    (
        'SUP bags',
        'SUP bags',
        NULL,
        NULL,
        NULL
    ),
    (
        'Paper bags',
        'Paper bags',
        NULL,
        NULL,
        4.66
    ),
    (
        'Reusable bags',
        'Reusable and durable bags or baskets made from organic materials',
        NULL,
        NULL,
        2.63
    ),
    (
        'BYO',
        'BYO - bring your own bag',
        0.0,
        0.0,
        0.0
    ),
    (
        'No bags',
        'Not using any bags',
        0.0,
        0.0,
        0.0
    ),
    -- plastic / polystyrene food packaging
    (
        'Plastic/polystyrene food packaging',
        'Plastic/polystyrene food packaging',
        NULL,
        NULL,
        NULL
    ),
    (
        'Single use paper boxes',
        'Single use paper or cardboard boxes',
        NULL,
        NULL,
        7.02
    ),
    (
        'No boxes',
        'No food packaging boxes',
        0.0,
        0.0,
        0.0
    ),
    -- individual packaging (sugar, coffee, oil, vinegar etc.)
    (
        'Individual packaging',
        'individual packaging (sugar, coffee, oil, vinegar etc.)',
        NULL,
        NULL,
        NULL
    ),
    (
        'Reusable containers',
        'Reusable containers',
        NULL,
        NULL,
        4.0
    ),
    (
        'Individual portions medium up to 1KG, large >1KG',
        'Individual portions medium up to 1KG, large >1KG packaging',
        NULL,
        NULL,
        4.0
    ),
    -- toiletries
    (
        'Plastic toilet products/packaging',
        'Plastic toilet products/packaging',
        NULL,
        NULL,
        NULL
    ),
    (
        'Toiletries in reusable containers',
        'Toiletries in reusable containers filled from single use packaging',
        NULL,
        NULL,
        3.69
    ),
    (
        'Soaps without plastic packaging',
        'Soaps without plastic packaging',
        NULL,
        NULL,
        6.21
    ),
    (
        'No toiletries',
        'No toiletries used',
        0.0,
        0.0,
        0.0
    ),
    -- plastic hand sanitizer bottles
    (
        'Hand sanitizer in large single use bottles',
        'Hand sanitizer in large single use bottles',
        NULL,
        NULL,
        3.69
    ),
    (
        'Hand washing',
        'No hand sanitizer available, only hand washing',
        0.0,
        0.0,
        0.0
    ),
    (
        'SUP gloves',
        'SUP gloves',
        NULL,
        NULL,
        NULL
    ),
    (
        'Reusable rubber gloves',
        'Reusable rubber gloves',
        NULL,
        NULL,
        4.05
    ),
    (
        'Washing hands often',
        'No gloves used, washing hands frequently',
        0.0,
        0.0,
        0.0
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