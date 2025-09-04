import { z } from "zod";

const BASE_URL = 'http://localhost:5165/chess-api'
export async function sendPost<T>(path: string, body: unknown, schema: z.ZodSchema<T>) {

  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const jsonData = await response.json();
    return schema.parse(jsonData);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
