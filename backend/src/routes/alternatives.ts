import { Request, Router, type Response } from "express";
import db from "@/db"

const router = Router();

//* GET

router.get("/", async (req: Request, res: Response) => {
    console.log("GET /alternatives");
    try {
        const [rows] = await db.execute("SELECT * FROM alternatives_responses");
        res.status(200).json({ message: "Survey data retreived", data: rows });
    } catch (error)   {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error"});
    }
})

//* POST

router.post("/", async (req: Request, res: Response) => {
    console.log("POST /alternatives request received");
    console.log("Received request body:", req.body);

    const { q1, q2, q3, q4, q5, q6, q7 } = req.body;

    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 ) {
    res.status(400).json({ message: "Missing answer" });
        return;
    }

    try {

        await db.execute("INSERT INTO surveys (question1, question2, question3, question4, question5, question6, question7) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [
                q1, q2, q3, q4, q5, q6, q7
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
    console.log("PUT /alternatives", req.body);
    res.status(200).json({ message: "Survey updated", data: req.body });
})

//* DELETE

router.delete("/", (req: Request, res: Response) =>{
    console.log("DELETE /alternatives", req.body);
    res.status(200).json({ message: "Survey deleted", data: req.body });
})

export default router;