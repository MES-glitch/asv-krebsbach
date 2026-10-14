import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const termine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/termine' }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    bis: z.coerce.date().optional(),
    uhrzeit: z.string().optional(),
    ort: z.string().optional(),
    kategorie: z.enum(['Arbeitseinsatz', 'Hegefischen', 'Versammlung', 'Veranstaltung', 'Sonstiges']).default('Sonstiges'),
    nurMitglieder: z.boolean().default(false),
  }),
});

const neuigkeiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/neuigkeiten' }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    kurztext: z.string().optional(),
    bild: z.string().optional(),
    entwurf: z.boolean().default(false),
  }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/seiten' }),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string().optional(),
    dachzeile: z.string().optional(),
    bild: z.string().optional(),
    bildPlatzhalter: z.string().optional(),
  }),
});

export const collections = { termine, neuigkeiten, seiten };
