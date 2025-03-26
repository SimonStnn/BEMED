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

    const { questions } = req.body;

    if (!questions || typeof questions !== "object" ) {
    res.status(400).json({ message: "Missing answer" });
        return;
    }

    try {
        const entries = Object.entries(questions); // Convert object to an array of [key, value] pairs

        for (const [qId, answer] of entries) {
            await db.execute(
                `INSERT INTO alternatives (question_id, answer) VALUES (?, ?)`,
                [qId, answer]
            );
        }
        
        res.status(201).json({ message: "Survey submitted successfully", data: questions });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
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