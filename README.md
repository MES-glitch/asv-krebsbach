# ASV Krebsbach – Vereinswebseite

Webseite des Angelsportvereins Krebsbach e. V., gebaut mit [Astro](https://astro.build) und gepflegt über das [Sveltia CMS](https://github.com/sveltia/sveltia-cms).

- **Webseite:** https://mes-glitch.github.io/asv-krebsbach/
- **Redaktionsbereich:** https://mes-glitch.github.io/asv-krebsbach/admin/

## Für den Vorstand: Inhalte pflegen

1. Den Redaktionsbereich (`/admin/`) öffnen und mit GitHub anmelden (siehe unten).
2. Links die Rubrik wählen:
   - **Termine** – Arbeitseinsätze, Hegefischen, Versammlungen. Vergangene Termine wandern automatisch ins Archiv.
   - **Neuigkeiten** – Berichte mit Bild. Mit „Entwurf“ bleibt ein Beitrag noch unsichtbar.
   - **Seiten** – Gewässer, Mitgliedschaft, Verein, Impressum, Datenschutz.
   - **Verein & Vorstand** – Texte der Startseite, Anschrift, Vorstandsmitglieder.
3. Speichern → nach ca. 1–2 Minuten ist die Änderung auf der Webseite sichtbar.

### Anmeldung

Jedes Vorstandsmitglied braucht ein (kostenloses) GitHub-Konto und muss vom Admin unter
*Repository → Settings → Collaborators* eingeladen werden.

Bis eine „Mit GitHub anmelden“-Schaltfläche eingerichtet ist, meldet man sich per **Zugangstoken** an:
GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens* →
Repository `asv-krebsbach`, Berechtigung *Contents: Read and write* → Token im CMS einfügen.

## Für Entwickler

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statische Seite in dist/
```

| Ordner | Inhalt |
| --- | --- |
| `src/content/termine/` | Termine (Markdown) |
| `src/content/neuigkeiten/` | Neuigkeiten (Markdown) |
| `src/content/seiten/` | Feste Seiten (Markdown) |
| `src/data/` | Vereinsangaben und Vorstand (JSON) |
| `public/admin/config.yml` | Felder des Redaktionsbereichs |
| `public/uploads/` | Im CMS hochgeladene Bilder |

Jeder Push auf `main` veröffentlicht die Seite über GitHub Actions auf GitHub Pages; zusätzlich wird täglich neu gebaut.
