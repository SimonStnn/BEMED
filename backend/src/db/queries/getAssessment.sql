SELECT a.id,
    a.userId,
    a.productId,
    a.ppm,
    a.createdAt,
    a.updatedAt,
    p.name AS productName,
    p.description AS productDescription,
    p.price AS productPrice,
    p.weight AS productWeight,
    p.EF AS productEF
FROM assessments a
    JOIN products p ON a.productId = p.id;