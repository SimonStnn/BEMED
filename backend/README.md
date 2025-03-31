# Backend

## Entity Relationship Diagram

```mermaid
erDiagram
users["Users (Institution)"] {}

treatments["Waste Treatment System"] {
    int id PK
    string userId FK
    date createdAt
    date updatedAt
}

questions["Questions"] {
    int id PK
    string question
    string type "text, number, date, etc."
}

answer["Treatment answer"] {
    int id PK
    int questionId FK
    int treatmentId FK
    string answer
}

products["Product SUPP"] {
    int id PK
    string name
    string description
    float price 
    float weight "in grams"
    float EF "Environmental Footprint"
}

alternatives["Alternatives"] {
    int productId PK, FK
    int alternativeId PK, FK
}

assesments["Assesments"] {
    int id PK
    string userId FK
    int productId FK
    int ppm "pieces per month"
    date createdAt
    date updatedAt
}

questions ||--o{ answer : "has"
treatments ||-- |{ answer : "contains"
users ||--o{ treatments : "has"
users ||--o{ assesments : "makes"
products ||--o{ alternatives : "has"
assesments }o--|| products : "is for"

```
