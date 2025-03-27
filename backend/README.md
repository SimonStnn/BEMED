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
    int for FK "question for"
    string question
    string type "text, number, date, etc."
}

assesments["Assesments"] {
    int id PK
    string userId FK
    int ppm "pieces per month"
    int productId FK
    date createdAt
    date updatedAt
}

products["Product SUPP"] {
    int id PK
    string name
    float price 
    float weight "in grams"
    float EF "Environmental Footprint"
    int to FK "alternative to"
}

alternatives["Alternatives"] {
    int id PK
    int productId FK
}

treatments ||--o{ questions : "has"
users ||--o{ treatments : "has"
users ||--o{   assesments : "makes"
products ||--o{ alternatives : "has"
assesments }o--|| products : "uses"
```
