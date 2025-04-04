import { Request, Router, type Response } from "express";

import db from "@/db"
import keycloak from "@/middleware/keycloak";

const router = Router();
// router.use(keycloak.protect());

//* GET

router.get("/", async (req: Request, res: Response) => {
    // print user info
    console.log("User info:", (req as any).kauth?.grant.access_token.content);

    console.log("GET /survey");
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
    console.log("PUT /survey", req.body);
    res.status(200).json({ message: "Survey updated", data: req.body });
})

//* DELETE

router.delete("/", (req: Request, res: Response) =>{
    console.log("DELETE /survey", req.body);
    res.status(200).json({ message: "Survey deleted", data: req.body });
})

export default router;