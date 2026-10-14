// Abruf der Ligadaten aus dem 3K-Darts-Portal (DSAB) – genutzt vom Build (dart-liga.ts)
// und vom Skript scripts/dart-stand.mjs. Reines JavaScript, damit beide es laden können.
const API = 'https://backend-dsab.3k-darts.com/2k-backend-dsab/api/v1/frontend';
// Ohne Origin/Referer antwortet die API mit 403
const KOPF = {
  Origin: 'https://portal.3k-darts.com',
  Referer: 'https://portal.3k-darts.com/',
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36',
};

async function hole(pfad) {
  const r = await fetch(API + pfad, { headers: KOPF, signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`${r.status} ${pfad}`);
  return r.json();
}

/** @returns {Promise<import('./dart-liga').LigaDaten>} */
export async function ladeLigaLive(eventId, participantId) {
  const e = await hole(`/event/${eventId}`);
  const p = await hole(`/participant/${participantId}`);
  const t = await hole(`/event/${eventId}/phase/0/round/0/table`);
  const ts = p.participant.teamSeason;
  return {
    abgerufen: new Date().toISOString(),
    teamName: ts.name,
    participantId,
    gruppe: e.event.name,
    region: e.event.region?.name ?? '',
    saison: e.event.saison?.name ?? '',
    dartart: e.event.dartTypeCd === 'edart' ? 'E-Dart' : 'Steel-Dart',
    kader: ts.teamMembers.map((m) => ({ name: m.displayName, captain: !!m.tc1, coCaptain: !!m.tc2 })),
    spiele: p.matches
      .map((m) => ({
        runde: m.round?.name ?? '', datum: m.datePlanned,
        heim: m.participantHome.displayName, gast: m.participantGuest.displayName,
        heimId: m.participantHome.id, gastId: m.participantGuest.id,
        fertig: m.statusCd === 'FINISH',
        setsHeim: m.setsHome, setsGast: m.setsAway, legsHeim: m.legsHome, legsGast: m.legsAway,
      }))
      .sort((a, b) => a.datum.localeCompare(b.datum)),
    tabelle: t.tableEntries[0].tableEntries.map((r) => ({
      platz: r.placement, name: r.participantName, id: r.participantId, spiele: r.matchCount,
      siege: r.win, niederlagen: r.lost, unentschieden: r.tie, punkte: r.points1,
      sets1: r.sets1, sets2: r.sets2, legs1: r.legs1, legs2: r.legs2,
    })),
    portalUrl: `https://portal.3k-darts.com/frontend/events/9/event/${eventId}/participants/${participantId}`,
  };
}
