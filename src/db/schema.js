import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const proyectos = sqliteTable('portfolio_proyectos', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	titulo: text('Titulo').notNull(),
	descripcion: text('Descripcion').notNull(),
});