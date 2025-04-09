import fs from "fs";
import path from "path";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import AssessmentSchema, { table } from "@/schemas/assessment";
import db from "@/db";

const queriesPath = path.resolve(__dirname, "..", "db", "queries");

type Assessment = AssessmentSchema;

class AssessmentController {
  public static async create(
    assessment: Omit<AssessmentSchema, "id" | "createdAt" | "updatedAt">
  ): Promise<Assessment[]> {
    const query = `INSERT INTO ${table} (userId, productId, ppm) VALUES (?, ?, ?);`;
    const values = [assessment.userId, assessment.productId, assessment.ppm];

    const [result] = await db.execute<ResultSetHeader>(query, values);

    return await this.get({ id: result.insertId });
  }

  public static async get(
    filter?: Partial<Pick<AssessmentSchema, "id" | "productId" | "userId">>,
    skip: number = 0,
    limit: number = 10
  ): Promise<Assessment[]> {
    const queryPath = path.resolve(queriesPath, "getAssessment.sql");
    let query = await fs.promises.readFile(queryPath, "utf-8");
    const whereClauses: string[] = Object.keys(filter || {}).filter(
      (key) => filter?.[key as keyof typeof filter] !== undefined
    );
    const bindParam: any[] = [];

    // Replace trailing ";" with " " to avoid SQL syntax error
    query = query.replace(/;(?=\s*$)/, " ");

    if (filter) {
      query += ` WHERE ${whereClauses
        .map((clause) => `a.${clause} = ?`)
        .join(" AND ")}`;
    }
    query += ` LIMIT ? OFFSET ?;`;

    if (filter)
      for (const clause of whereClauses)
        bindParam.push(filter[clause as keyof typeof filter]);

    const [result, _] = await db.execute<RowDataPacket[]>(query, [
      ...bindParam,
      limit,
      skip,
    ]);

    return result as any satisfies Assessment[];
  }

  public static async update(
    assessment: Pick<AssessmentSchema, "id"> &
      Partial<Pick<AssessmentSchema, "ppm">>
  ): Promise<Assessment[]> {
    const updateValues = Object.keys(assessment)
      .filter((key) => key !== ("id" as keyof AssessmentSchema["id"]))
      .filter(
        (key) => assessment[key as keyof typeof assessment] !== undefined
      );

    const keys = updateValues.map((key) => {
      return `${key} = ?`;
    });
    const query = `UPDATE ${table} SET ${keys.join(", ")} WHERE id = ?;`;

    const [result] = await db.execute<ResultSetHeader>(query, [
      ...updateValues,
      assessment.id,
    ]);

    return await this.get({ id: assessment.id });
  }

  public static async delete(id: Assessment["id"]): Promise<Assessment[]> {
    const predelete = await this.get({ id });

    const query = `DELETE FROM ${table} WHERE id = ?;`;
    const [result] = await db.execute<ResultSetHeader>(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error("404");
    }

    return predelete;
  }
}

export default AssessmentController;
