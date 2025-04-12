import fs from "fs";
import path from "path";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import ProductSchema, { table } from "@/schemas/product";
import { table as alternativesTable } from "@/schemas/alternative";
import db from "@/db";

const queriesPath = path.resolve(__dirname, "..", "db", "queries");

type Product = ProductSchema & {
  alternatives: ProductSchema[];
};

class ProductController {
  public static async create(
    product: Omit<ProductSchema, "id">
  ): Promise<Product> {
    const query = `INSERT INTO ${table} (name, description, price, weight, EF) VALUES (?, ?, ?, ?, ?);`;
    const values = [
      product.name,
      product.description,
      product.price,
      product.weight,
      product.EF,
    ];
    const [result] = await db.execute<ResultSetHeader>(query, values);

    return (await this.get(result.insertId))[0];
  }

  public static async get(
    filter?: ProductSchema["id"],
    skip: number = 0,
    limit: number = 10
  ): Promise<Product[]> {
    const queryPath = path.resolve(queriesPath, "getProduct.sql");
    let query = await fs.promises.readFile(queryPath, "utf-8");
    const bindParam = filter ? [filter] : [];

    // Replace ";" with " " to avoid SQL syntax error
    query = query.replace(/;(?=\s*$)/g, " ");
    if (!filter) {
      query = query.replace(/WHERE p.id = \?/g, " ");
    }
    query += ` LIMIT ? OFFSET ?;`;

    const [result, _] = await db.execute<RowDataPacket[]>(query, [
      ...bindParam,
      limit,
      skip,
    ]);

    for (let row of result) {
      row.alternatives = JSON.parse(
        row.alternatives
      ) as Partial<ProductSchema>[];

      row.alternatives = row.alternatives.filter((x: Partial<ProductSchema>) =>
        Object.values(x).some((key) => {
          return key !== null && key !== undefined;
        })
      );
      // Round EF, price, and weight to 2 decimal places
      if (row.EF !== undefined && row.EF !== null)
        row.EF = parseFloat(row.EF.toFixed(2));
      if (row.price !== undefined && row.price !== null)
        row.price = parseFloat(row.price.toFixed(2));
      if (row.weight !== undefined && row.weight !== null)
        row.weight = parseFloat(row.weight.toFixed(2));
    }
    return result as any satisfies Product;
  }

  public static async update(
    product: Partial<ProductSchema> & { id: ProductSchema["id"] }
  ): Promise<Product> {
    const updateValues = Object.keys(product)
      .filter((key) => key !== ("id" as keyof ProductSchema["id"]))
      .filter((key) => product[key as keyof typeof product] !== undefined);

    const keys = updateValues.map((key) => {
      return `${key} = ?`;
    });
    const query = `UPDATE ${table} SET ${keys.join(", ")} WHERE id = ?;`;

    const result = await db.execute<ResultSetHeader>(query, [
      ...updateValues,
      product.id,
    ]);
    return (await this.get(product.id))[0];
  }

  public static async delete(id: ProductSchema["id"]): Promise<Product> {
    const predelete = (await this.get(id))[0];

    const query = `DELETE FROM ${table} WHERE id = ?;`;
    const [result] = await db.execute<ResultSetHeader>(query, [id]);

    if (result.affectedRows === 0) {
      throw new Error("404");
    }

    return predelete;
  }

  public static async createAlternative(
    productId: Product["id"],
    alternativeId: Product["id"]
  ): Promise<Product> {
    const query = `INSERT INTO ${alternativesTable} (productId, alternativeId) VALUES (?, ?);`;
    const values = [productId, alternativeId];
    const [result] = await db.execute<ResultSetHeader>(query, values);

    return (await this.get(productId))[0];
  }

  public static async deleteAlternative(
    productId: Product["id"],
    alternativeId: Product["id"]
  ): Promise<Product> {
    const query = `DELETE FROM ${alternativesTable} WHERE productId = ? AND alternativeId = ?;`;
    const values = [productId, alternativeId];
    const [result] = await db.execute<ResultSetHeader>(query, values);

    return (await this.get(values[0]))[0];
  }
}

export default ProductController;
