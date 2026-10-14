# ASV Krebsbach – Vereinswebseite

Privates Hobbyprojekt von Konstantin: eine moderne Webseite für den Angelsportverein **ASV Krebsbach**.
Dieses Projekt hat **nichts** mit Fosbury Tech oder Wasabi Works zu tun – deren Regeln, Skills und Workflows gelten hier nicht.

## Sprache
- Kommunikation und Webseiteninhalte auf Deutsch.

## Ziel
Eine moderne, mobilfreundliche Vereinswebseite, die Mitglieder und Interessierte informiert.

## Typische Inhalte (noch abzustimmen)
- Startseite mit Verein, Gewässer und aktuellen Neuigkeiten
- Gewässer / Fischbestand / Gewässerordnung
- Termine (Arbeitseinsätze, Hegefischen, Versammlungen)
- Mitgliedschaft & Gastkarten
- Vorstand & Kontakt
- Impressum & Datenschutz (Pflicht in Deutschland)

## Entscheidungen
- Technik: Astro 7 (statisch) + Sveltia CMS unter `/admin` – der Vorstand pflegt Termine, Neuigkeiten, Seiten und Vorstand selbst
- Repo: github.com/MES-glitch/asv-krebsbach (öffentlich), Hosting über GitHub Pages (Deploy per GitHub Actions, täglicher Rebuild)
- **Mitgliedschaft:** Aktive Plätze sind durch die Zahl der Gewässerkarten begrenzt – auf der Seite **nicht als Aufnahmestopp** formulieren, sondern „Vergabe nach Verfügbarkeit“. Aktive und passive Mitgliedschaft per Anfrage; passive Mitglieder wertschätzend als voll eingebunden darstellen. **Keine Gastkarten.** Jugendabteilung ab 10 J., Jugendfischereischein, **50 €/Jahr** →  (), Mitgliedschaft: 
- **Anfrageformular** : erzeugt eine mailto-E-Mail an den Vorstand (kein Server/Drittanbieter), bewusst **ohne Bankdaten** – Beitrittserklärung bleibt auf Papier
- Design „Komm ans Wasser“ (Variante E): Creme-Hintergrund, Wappenblau #3a3290, Pastell-Akzente, organische Fotoformen
- Schrift vom Wappen abgeleitet: Barlow Semi Condensed (Titel) + Barlow (Text), DIN-artige Grotesk
- Keine externen Schriften/Tracking (DSGVO) – Fonts per `@fontsource` selbst gehostet
- Fotos: `Foto.astro` zeigt Platzhalter, bis im CMS ein Bild hinterlegt ist (Startseite: `src/data/startseite.json`, Unterseiten: Feld `bild`)
- Astro 7: Markdown-Plugins über `unified()` aus `@astrojs/markdown-remark`

## Offene Punkte
- Eigene Domain (dann in GitHub Pages hinterlegen; `BASE` wird automatisch angepasst)
- OAuth-Login fürs CMS (sveltia-cms-auth auf Cloudflare Workers), bis dahin Login per Zugangstoken
- Echte Inhalte, Logo, Impressum und Datenschutz vom Vorstand

## Ordner
- `inhalte/` – Texte, Infos und Material vom Verein
- `inhalte/bilder/` – Fotos und Logo
