// Ligadaten der Dart-Mannschaften aus dem 3K-Darts-Portal (DSAB).
// Wird beim Build abgerufen (täglicher Neubau → automatisch aktuell).
// Ist das Portal nicht erreichbar, wird der gespeicherte Stand aus src/data/dart-liga-stand.json verwendet
// (aktualisieren mit: npm run dart:stand).
import stand from '../data/dart-liga-stand.json';
import { ladeLigaLive } from './dart-liga-api.mjs';

export interface Spiel {
  runde: string; datum: string; heim: string; gast: string; heimId: number; gastId: number;
  fertig: boolean; setsHeim?: number; setsGast?: number; legsHeim?: number; legsGast?: number;
}
export interface Tabellenzeile {
  platz: string; name: string; id: number; spiele: number; siege: number; niederlagen: number; unentschieden: number;
  punkte: number; sets1: number; sets2: number; legs1: number; legs2: number;
}
export interface LigaDaten {
  abgerufen: string; teamName: string; participantId: number; gruppe: string; region: string; saison: string; dartart: string;
  kader: { name: string; captain: boolean; coCaptain: boolean }[];
  spiele: Spiel[]; tabelle: Tabellenzeile[]; portalUrl: string;
}

const zwischenspeicher = new Map<number, Promise<LigaDaten | null>>();

/** Ligadaten eines Teams – live, sonst gespeicherter Stand, sonst null. */
export function ladeLiga(eventId?: number, participantId?: number): Promise<LigaDaten | null> {
  if (!eventId || !participantId) return Promise.resolve(null);
  if (!zwischenspeicher.has(participantId)) {
    zwischenspeicher.set(participantId, ladeLigaLive(eventId, participantId).catch((err: Error) => {
      console.warn(`[dart-liga] Portal nicht erreichbar (${err.message}) – verwende gespeicherten Stand.`);
      return (stand as Record<string, LigaDaten>)[String(participantId)] ?? null;
    }));
  }
  return zwischenspeicher.get(participantId)!;
}

// Anzeige-Helfer (Zeiten aus dem Portal sind UTC → deutsche Zeit)
const tz = { timeZone: 'Europe/Berlin' } as const;
export const spielDatum = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { ...tz, weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
export const spielZeit = (iso: string) => new Date(iso).toLocaleTimeString('de-DE', { ...tz, hour: '2-digit', minute: '2-digit' });
export const standDatum = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { ...tz, day: '2-digit', month: '2-digit', year: 'numeric' });

/** Ergebnis aus Sicht des eigenen Teams. */
export function ergebnis(s: Spiel, eigeneId: number) {
  if (!s.fertig || s.setsHeim == null || s.setsGast == null) return null;
  const heim = s.heimId === eigeneId;
  const wir = heim ? s.setsHeim : s.setsGast, die = heim ? s.setsGast : s.setsHeim;
  return { wir, die, ausgang: wir > die ? 'sieg' : wir < die ? 'niederlage' : 'remis' } as const;
}
