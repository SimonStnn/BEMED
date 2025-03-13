import { Request, Router, type Response } from "express";
import mysql from "mysql2/promise";

const router = Router();

let db: mysql.Connection | null = null;

//* CONNECT
(async () => {
    try {
        db = await mysql.createConnection({
            host: "localhost",
            port: 3307,
            user: "root",
            password: "rootpassword",
            database: "BEMED"
        });
        console.log("Connected to MySQL database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
})();

//* GET

router.get("/", async (req: Request, res: Response) => {
    console.log("GET /survey");

    if (!db)    {
        res.status(500).json({message: "Database not initialized"});
        return;
    }
    try {
        const [rows] = await db.execute("SELECT * FROM survey_responses");
        res.status(200).json({ message: "Survey data retreived", data: rows });
    } catch (error)   {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error"});
    }
})

//* POST

router.post("/", async (req: Request, res: Response) => {
    console.log("POST /survey request received");

    if (!db)    {
        res.status(500).json({message: "Database not initialized"});
        return;
    }

    console.log("Received request body:", req.body);

    const { question } = req.body;

    if (!question || Object.values(question).some(q => q === null)) {
    res.status(400).json({ message: "Missing answer" });
        return;
    }

    try {

        await db.execute("INSERT INTO survey_responses (question1, question2, question3, question4, question5, question6, question7) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [
                question[1], question[2], question[3], question[4],
                question[5], question[6], question[7]
            ]);
        res.status(201).json({ message: "Survey submitted successfully", data: req.body});
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({message: "Internal server error" });
    }

    res.status(200).json({ message: "Survey received"});
});

//* PUT

router.put("/", (req: Request, res: Response) => {
    console.log("PUT /survey", req.body);
    res.status(200).json({ message: "Survey updated", data: req.body });
})

//* DELETE

router.delete("/", (req: Request, res: Response) =>{
    console.log("DELETE /survey", req.body);
    res.status(200).json({ message: "Survey deleted", data: req.body });
})

export default router;