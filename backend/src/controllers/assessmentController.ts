import fs from "fs";
import path from "path";
import { ResultSetHeader } from "mysql2/promise";

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

    console.debug("Creating assessment with values:", query, values);
    const result = (await db.execute(query, values))[0] as ResultSetHeader;

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

    const [result, _] = await db.execute(query, [...bindParam, limit, skip]);

    return result as any satisfies Assessment[];
  }

  public static async update(
    assessment: Partial<AssessmentSchema> & { id: number }
  ): Promise<Assessment[]> {
    const query = `UPDATE ${table} SET ? WHERE id = ?;`;
    const values = [assessment, assessment.id];

    console.debug("Updating assessment with values:", query, values);
    const result = (await db.execute(query, values))[0] as ResultSetHeader;

    return await this.get({ id: assessment.id });
  }

  public static async delete(id: number): Promise<Assessment[]> {
    const query = `DELETE FROM ${table} WHERE id = ?;`;
    const values = [id];

    console.debug("Deleting assessment with values:", query, values);
    const result = (await db.execute(query, values))[0] as ResultSetHeader;

    return await this.get({ id });
  }
}

export default AssessmentController;
