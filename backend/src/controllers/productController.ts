import { ResultSetHeader } from "mysql2";
import ProductSchema, { table } from "@/schemas/product";
import db from "@/db";
import path from "path";
import fs from "fs";

const queriesPath = path.resolve(__dirname, "..", "db", "queries");

type Product = ProductSchema & {
  alternatives: ProductSchema[];
};

class ProductController {
  public static async create(
    product: Omit<ProductSchema, "id">
  ): Promise<Product[]> {
    const query = `INSERT INTO ${table} (name, description, price, weight, EF) VALUES (?, ?, ?, ?, ?);`;
    const values = [
      product.name,
      product.description,
      product.price,
      product.weight,
      product.EF,
    ];
    const [result, _] = await db.execute(query, values);

    return await this.get((result as any).insertId);
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
    query = query.replace(/;/g, " ");
    if (!filter) {
      query = query.replace(/WHERE p.id = \?/g, " ");
    }
    query += ` LIMIT ? OFFSET ?;`;

    const [result, _] = await db.execute(query, [...bindParam, limit, skip]);

    for (let row of result as (Product & { alternatives: any })[]) {
      row.alternatives = JSON.parse(
        row.alternatives
      ) as Partial<ProductSchema>[];

      row.alternatives = row.alternatives.filter((x: Partial<ProductSchema>) =>
        Object.values(x).some((key) => {
          return key !== null && key !== undefined;
        })
      );
    }

    return result as any satisfies Product;
  }

  public static async update(
    product: Partial<ProductSchema> & { id: ProductSchema["id"] }
  ): Promise<Product[]> {
    const updateValues = Object.keys(product)
      .filter((key) => key !== ("id" as keyof ProductSchema["id"]))
      .filter((key) => product[key as keyof typeof product] !== undefined);

    const keys = updateValues.map((key) => {
      return `${key} = ?`;
    });
    const query = `UPDATE ${table} SET ${keys.join(", ")} WHERE id = ?;`;

    const result = (
      await db.execute(query, [...updateValues, product.id])
    )[0] as ResultSetHeader;

    return await this.get(product.id);
  }

  public static async delete(id: ProductSchema["id"]): Promise<Product[]> {
    const predelete = await this.get(id);

    const query = `DELETE FROM ${table} WHERE id = ?;`;
    const result = (await db.execute(query, [id]))[0] as ResultSetHeader;

    
    if (result.affectedRows === 0) {
      throw new Error("404");
    }

    return predelete;
  }
}

export default ProductController;
