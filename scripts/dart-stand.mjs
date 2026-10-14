// Speichert den aktuellen Ligastand aus dem 3K-Portal als Rückfall für den Build.
// Aufruf: npm run dart:stand
import fs from 'node:fs';
import { ladeLigaLive } from '../src/lib/dart-liga-api.mjs';

const dart = JSON.parse(fs.readFileSync('src/data/dart.json', 'utf8'));
const ziel = 'src/data/dart-liga-stand.json';
const stand = {};
for (const t of dart.teams.filter((t) => t.eventId && t.participantId)) {
  const daten = await ladeLigaLive(t.eventId, t.participantId);
  stand[t.participantId] = daten;
  console.log(`${t.name}: ${daten.spiele.length} Spiele, ${daten.kader.length} Spieler, Gruppe ${daten.gruppe}`);
}
fs.writeFileSync(ziel, JSON.stringify(stand, null, 2) + '\n');
console.log('Gespeichert:', ziel);
