import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';

export const animeTable = pgTable('ANIME', {
	id: serial('ID').primaryKey(),
	title: text('TITLE'),
	enjoyment: integer('ENJOYMENT'),
	plot: integer('PLOT'),
	quality: integer('QUALITY'),
	status: integer('STATUS'),
	notes: text('NOTES'),
	image: text('IMAGE')
});
