/** Pfad innerhalb der Seite inkl. Basis-Pfad (für GitHub Pages im Unterordner). */
export function url(pfad = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(pfad)) return pfad;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (pfad.startsWith('/') ? pfad : '/' + pfad);
}

// Datumsangaben aus dem CMS sind reine Kalendertage (ohne Uhrzeit) → in UTC formatieren.
const opts = { timeZone: 'UTC' } as const;

export const datumLang = (d: Date) =>
  d.toLocaleDateString('de-DE', { ...opts, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const datumKurz = (d: Date) =>
  d.toLocaleDateString('de-DE', { ...opts, day: '2-digit', month: '2-digit', year: 'numeric' });

export const tag = (d: Date) => d.toLocaleDateString('de-DE', { ...opts, day: '2-digit' });
export const monat = (d: Date) => d.toLocaleDateString('de-DE', { ...opts, month: 'short' }).replace('.', '');

/** Heute 00:00 UTC – Termine ab heute gelten als „kommend“. */
export function heute(): Date {
  const n = new Date();
  return new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()));
}
