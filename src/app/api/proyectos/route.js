export const dynamic = 'force-dynamic';

import { db } from "../../../db/index.js";
import { proyectos } from "../../../db/schema.js";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { auth, ensureAuthSetup } from "@/lib/auth";

const htmlTagPattern = /<\s*\/?\s*[a-zA-Z][^>]*>/;
const javascriptProtocolPattern = /javascript\s*:/i;
const controlCharactersPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

const safeText = (schema) => schema
  .refine((value) => !htmlTagPattern.test(value), "No se permite HTML")
  .refine((value) => !javascriptProtocolPattern.test(value), "No se permite javascript:")
  .refine((value) => !controlCharactersPattern.test(value), "No se permiten caracteres de control");

const proyectoSchema = z.object({
  titulo: safeText(z.string().trim().min(1).max(120)),
  descripcion: safeText(z.string().trim().min(1).max(2000)),
});

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
    await ensureAuthSetup();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const validation = proyectoSchema.safeParse(body);

    if (!validation.success) {
      return new Response(JSON.stringify({ error: 'Datos invalidos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { titulo, descripcion } = validation.data;
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
