import fs from "fs";
import path from "path";
import { ResultSetHeader } from "mysql2";

import TreatmentSchema, { table } from "@/schemas/treatment";
import AnswerSchema from "@/schemas/answer";
import db from "@/db";

const queriesPath = path.resolve(__dirname, "..", "db", "queries");

type Treatment = TreatmentSchema;

class ProductController {
  public static async create(
    userId: TreatmentSchema["userId"],
    answers: Pick<AnswerSchema, "questionId" | "answer">[]
  ): Promise<Treatment> {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [treatmentResult] = await connection.execute<ResultSetHeader>(
        "INSERT INTO treatments (userId) VALUES (?)",
        [userId]
      );

      const treatmentId = treatmentResult.insertId;

      for (const ans of answers) {
        await connection.execute(
          "INSERT INTO answers (questionId, treatmentId, answer) VALUES (?, ?, ?)",
          [ans.questionId, treatmentId, ans.answer]
        );
      }

      await connection.commit();
      return (await this.get({ userId, id: treatmentId }))[0];
    } catch (error) {
      await connection.rollback();
      throw new Error(`Transaction failed. ${error}`);
    } finally {
      connection.release();
    }
  }

  public static async get(
    filter: Pick<TreatmentSchema, "userId"> &
      Partial<Pick<TreatmentSchema, "id">>,
    skip: number = 0,
    limit: number = 10
  ): Promise<Treatment[]> {
    const queryPath = path.resolve(queriesPath, "getTreatment.sql");
    let query = await fs.promises.readFile(queryPath, "utf-8");
    const bindParam: (string | number)[] = [filter.userId];

    // Replace ";" with " " to avoid SQL syntax error
    query = query.replace(/;(?=\s*$)/g, " ");

    let whereClause = "WHERE t.userId = ?";
    if (filter.id) {
      whereClause += " AND t.id = ?";
      bindParam.push(filter.id);
    }
    console.log("Where Clause:", whereClause);
    query = query.replace(/WHERE t.id = \?/g, whereClause);

    query += ` LIMIT ? OFFSET ?;`;
    bindParam.push(limit, skip);

    console.log("Query:", query);
    console.log("Bind Params:", bindParam);
    const [result, _] = await db.execute(query, bindParam);

    for (let row of result as (Treatment & { answers: any })[]) {
      row.answers = JSON.parse(row.answers) as Partial<TreatmentSchema>[];

      row.answers = row.answers.filter((x: Partial<TreatmentSchema>) =>
        Object.values(x).some((key) => {
          return key !== null && key !== undefined;
        })
      );
    }

    return result as any satisfies Treatment;
  }

  public static async delete(
    userId: TreatmentSchema["userId"],
    id: TreatmentSchema["id"]
  ): Promise<Treatment> {
    const predelete = (await this.get({ userId, id }))[0];
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [treatmentResult] = await connection.execute<ResultSetHeader>(
        "DELETE FROM treatments WHERE userId = ? AND id = ?",
        [userId, id]
      );

      if (treatmentResult.affectedRows === 0) {
        throw new Error("No treatment found to delete.");
      }

      await connection.commit();
      return predelete;
    } catch (error) {
      await connection.rollback();
      throw new Error(`Transaction failed. ${error}`);
    } finally {
      connection.release();
    }
  }
}

export default ProductController;
