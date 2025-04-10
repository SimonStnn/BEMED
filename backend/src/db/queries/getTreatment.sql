SELECT t.id,
    t.userId,
    t.createdAt,
    t.updatedAt,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id',
            a.id,
            'questionId',
            a.questionId,
            'treatmentId',
            a.treatmentId,
            'answer',
            a.answer,
            'question',
            JSON_OBJECT(
                'id',
                q.id,
                'question',
                q.question,
                'type',
                q.type,
                'options',
                q.options
            )
        )
    ) AS answers
FROM treatments t
    LEFT JOIN answers a ON t.id = a.treatmentId
    LEFT JOIN questions q ON a.questionId = q.id
WHERE t.id = ?
GROUP BY t.id;