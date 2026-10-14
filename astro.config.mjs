// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

// SITE und BASE werden beim Deployment (GitHub Actions) gesetzt.
// Lokal läuft die Seite unter http://localhost:4321/
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE || '/';

/**
 * Im CMS hochgeladene Bilder werden als "/uploads/..." gespeichert.
 * Läuft die Seite in einem Unterordner (GitHub Pages ohne eigene Domain),
 * wird der Basis-Pfad davorgesetzt.
 */
function rehypeBasePfad() {
  const prefix = base.replace(/\/$/, '');
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === 'element') {
      for (const attr of ['src', 'href']) {
        const v = node.properties?.[attr];
        if (prefix && typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) {
          node.properties[attr] = prefix + v;
        }
      }
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site,
  base,
  markdown: {
    // Zeilenumbruch im Editor = Zeilenumbruch auf der Seite
    processor: unified({
      remarkPlugins: [remarkBreaks],
      rehypePlugins: [rehypeBasePfad],
    }),
  },
});
