export const dynamic = 'force-dynamic';

import { db } from "../../../db/index.js";
import { proyectos } from "../../../db/schema.js";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(proyectos).orderBy(desc(proyectos.id));
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('GET Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request) {
  try {
    const { titulo, descripcion } = await request.json();
    const nuevoproyecto = { titulo, descripcion };
    const result = await db.insert(proyectos).values(nuevoproyecto).returning();
    return new Response(JSON.stringify(result[0]), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('POST Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}