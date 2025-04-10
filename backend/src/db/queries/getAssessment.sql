SELECT a.id,
    a.userId,
    a.productId,
    a.ppm,
    a.createdAt,
    a.updatedAt,
    JSON_OBJECT(
        'id',
        p.id,
        'name',
        p.name,
        'description',
        p.description,
        'price',
        p.price,
        'weight',
        p.weight,
        'EF',
        p.EF
    ) AS product
FROM assessments a
    JOIN products p ON a.productId = p.id;