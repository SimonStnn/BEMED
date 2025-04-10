SELECT p.id,
    p.name,
    p.description,
    p.price,
    p.weight,
    p.EF,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id',
            a.id,
            'name',
            a.name,
            'description',
            a.description,
            'price',
            a.price,
            'weight',
            a.weight,
            'EF',
            a.EF
        )
    ) AS alternatives
FROM products p
    LEFT JOIN alternatives alt ON p.id = alt.productId
    LEFT JOIN products a ON alt.alternativeId = a.id
WHERE p.id = ?
GROUP BY p.id;