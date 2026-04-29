import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';

// Usamos el archivo codenode.db en la raíz del proyecto
const sqlite = new Database(path.join(process.cwd(), 'codenode.db'));
export const db = drizzle(sqlite);
