# Einwanderungs-Checkliste Schweiz

Interaktive Checkliste für EU/EFTA-Bürger, die in die Schweiz ziehen. Statisch, ohne Build-Schritt.

- `index.html` – helle Version
- `premium.html` – dunkle Version im Stil der Lebenplus-Landingpage
- `assets/data.js` – **alle Inhalte** (Schritte, Fristen, Beträge, Quellen). Texte und Zahlen nur hier ändern.
- `assets/app.js` – Logik: Fristen ab Einreisedatum, Fortschritt (localStorage), Profil-Filter, Kalender-Export (.ics), Drucken
- `assets/checklist.css` – gemeinsame Bausteine, `light.css` / `premium.css` – die beiden Designs

## Inhalte pflegen

Jeder Punkt in `data.js` hat `sources` mit offiziellen Links (admin.ch, ch.ch, BAZG, BAG, BSV, SEM, ESTV).
Beträge, die sich jährlich ändern, bitte jeweils im Herbst prüfen und `stand` anpassen:

| Wert | Quelle |
| --- | --- |
| Säule 3a Maximalbetrag | bsv.admin.ch/de/beitrag-3-sauele |
| Serafe-Abgabe | serafe.ch |
| Familienzulagen Mindestansätze | bsv.admin.ch/de/zulagen-fuer-familien |
| Vignette | ch.ch/de/autobahnvignette |
| Freimengen / Wertfreigrenze | bazg.admin.ch |

## Lokal ansehen

`python3 -m http.server` im Ordner starten und `http://localhost:8000` öffnen.
