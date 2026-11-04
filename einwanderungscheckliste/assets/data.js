/* Inhalte der Einwanderungs-Checkliste.
   Jede Zahl ist mit einer offiziellen Quelle belegt (siehe "sources" je Punkt).
   "due" = Frist in Tagen relativ zum Einreisedatum (negativ = davor), "yearEnd" = 31.12. des Einreisejahres.
   "when" = nur anzeigen, wenn das Profil-Merkmal aktiv ist.
   Zuletzt geprüft: November 2026. */
window.CHECKLIST = {
  stand: "November 2026",

  profile: [
    { id: "kinder", label: "Ich ziehe mit Kindern um", hint: "Familienzulagen, Schule, Krankenkasse fürs Kind", tag: "Mit Kindern" },
    { id: "auto", label: "Ich bringe ein Auto mit", hint: "Zoll, Schweizer Kontrollschilder", tag: "Mit Auto" },
    { id: "hund", label: "Ich ziehe mit Hund um", hint: "Tierarzt-Kontrolle innert 10 Tagen", tag: "Mit Hund" }
  ],

  phases: [
    /* ======================================================= */
    {
      id: "vorbereitung",
      title: "Vorbereitung",
      short: "Vorbereitung",
      time: "4–6 Monate vorher",
      lead: "Status klären, Unterlagen sammeln, Wohnungsdossier bauen.",
      items: [
        {
          id: "status",
          title: "Aufenthaltsstatus verstehen",
          timing: "Sobald der Job feststeht",
          due: -120,
          intro: "Als Bürgerin oder Bürger eines EU- oder EFTA-Staats (z. B. Deutschland, Österreich) brauchst du **kein Visum und keine Bewilligung im Voraus**. Welchen Ausweis du bekommst, hängt vom Arbeitsvertrag ab.",
          tasks: [
            { id: "status-1", text: "Arbeitsvertrag prüfen: **unbefristet oder mindestens 1 Jahr** → Bewilligung B, 5 Jahre gültig und verlängerbar" },
            { id: "status-2", text: "Vertrag **bis 364 Tage** → Kurzaufenthaltsbewilligung L" },
            { id: "status-3", text: "Stelle **bis 3 Monate** im Kalenderjahr: keine Bewilligung, aber Online-Meldung durch den Arbeitgeber ab dem ersten Tag" }
          ],
          notes: [
            { type: "info", title: "Nicht aus der EU/EFTA?", text: "Für Drittstaatsangehörige gelten andere Regeln (Kontingente, Bewilligung vor Einreise). Diese Checkliste ist auf EU/EFTA-Bürger ausgelegt." }
          ],
          sources: [
            { label: "SEM: FAQ EU/EFTA-Bürger", url: "https://www.sem.admin.ch/sem/de/home/themen/fza_schweiz-eu-efta/eu-efta_buerger_schweiz/faq.html" }
          ]
        },
        {
          id: "dokumente",
          title: "Wichtige Dokumente zusammenstellen",
          timing: "3–6 Monate vorher",
          due: -90,
          intro: "Diese Unterlagen brauchst du für Gemeinde, Arbeitgeber, Vermieter und Zoll. Lege sie als Original und als Scan bereit.",
          tasks: [
            { id: "dok-1", text: "Gültiger Reisepass oder Personalausweis (Ablaufdatum prüfen) – für alle Familienmitglieder" },
            { id: "dok-2", text: "Unterschriebener Arbeitsvertrag" },
            { id: "dok-3", text: "Zivilstandsdokumente: Geburts- und ggf. Heiratsurkunde, am besten als internationale Ausführung" },
            { id: "dok-4", text: "Diplome, Arbeitszeugnisse, Impfausweis" },
            { id: "dok-5", text: "Reglementierter Beruf (z. B. Gesundheit, Lehrberufe)? Anerkennung früh klären" }
          ],
          notes: [
            { type: "tip", title: "Arbeitsvertrag genau lesen", text: "Achte auf Wochenarbeitszeit, Ferientage, Kündigungsfrist und ob ein 13. Monatslohn vereinbart ist. Bei Unklarheiten vor der Unterschrift nachfragen." }
          ],
          sources: [
            { label: "SBFI: Ausländische Berufsqualifikationen", url: "https://www.sbfi.admin.ch/de/auslaendische-berufsqualifikationen-in-der-schweiz" }
          ]
        },
        {
          id: "dossier",
          title: "Wohnungssuche & Bewerbungsdossier",
          timing: "2–4 Monate vorher",
          due: -60,
          intro: "Auf Wohnungen bewirbt man sich in der Schweiz mit einem Dossier. Wer es vollständig und sofort abgibt, hat bessere Chancen.",
          tasks: [
            { id: "dos-1", text: "Ausweiskopie und (falls schon vorhanden) Aufenthaltsbewilligung" },
            { id: "dos-2", text: "Kopie Arbeitsvertrag oder Lohnnachweis" },
            { id: "dos-3", text: "Betreibungsregisterauszug: als Zuzüger hast du noch keinen – lege stattdessen eine Bonitätsauskunft aus deinem Herkunftsland bei (z. B. SCHUFA) und erkläre kurz, warum" },
            { id: "dos-4", text: "Referenz deines bisherigen Vermieters (optional, aber hilfreich)" },
            { id: "dos-5", text: "Privathaftpflichtversicherung abschliessen oder prüfen, ob die bisherige in der Schweiz gilt" }
          ],
          notes: [
            { type: "tip", title: "Privathaftpflicht", text: "Sie ist nicht gesetzlich vorgeschrieben, wird aber von sehr vielen Vermietern verlangt. Eine Bestätigung im Dossier spart Rückfragen." },
            { type: "info", title: "Kaution: höchstens 3 Monatsmieten", text: "Ein Mietzinsdepot ist nur fällig, wenn es im Vertrag steht, und beträgt bei Wohnungen **maximal drei Monatsmieten**. Der Vermieter muss es bei einer Bank auf einem Konto **auf deinen Namen** hinterlegen (Art. 257e OR)." }
          ],
          sources: [
            { label: "ch.ch: Mietvertrag", url: "https://www.ch.ch/de/wohnen/miete/mietvertrag-und-pachtvertrag/" },
            { label: "Art. 257e OR", url: "https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_257_e" }
          ]
        }
      ]
    },

    /* ======================================================= */
    {
      id: "planung",
      title: "Planung im Herkunftsland",
      short: "Planung",
      time: "1–3 Monate vorher",
      lead: "Verträge kündigen, Umzugsgut vorbereiten, Familie organisieren.",
      items: [
        {
          id: "kuendigen",
          title: "Wohnung & Verträge im Herkunftsland kündigen",
          timing: "3 Monate vorher",
          due: -90,
          intro: "In Deutschland beträgt die Kündigungsfrist für Mieter in der Regel **3 Monate** (§ 573c BGB). Ein Sonderkündigungsrecht wegen Auswanderung gibt es nicht, ein Nachmieter oder eine Einigung mit dem Vermieter kann helfen.",
          tasks: [
            { id: "kue-1", text: "Mietwohnung fristgerecht schriftlich kündigen" },
            { id: "kue-2", text: "Strom, Internet, Handy, Abos, Vereine kündigen (Abmeldebescheinigung hilft oft bei vorzeitiger Kündigung)" },
            { id: "kue-3", text: "Krankenversicherung, Versicherungen und Bank über den Wegzug informieren" }
          ],
          sources: [
            { label: "§ 573c BGB", url: "https://www.gesetze-im-internet.de/bgb/__573c.html" }
          ]
        },
        {
          id: "umzugsgut",
          title: "Umzugsgut & Formular 18.44 vorbereiten",
          timing: "4 Wochen vorher",
          due: -28,
          legal: true,
          intro: "Dein Hausrat ist **abgabenfrei**, wenn du deinen Wohnsitz in die Schweiz verlegst und du die Gegenstände **mindestens 6 Monate** selbst gebraucht hast und weiter benutzt.",
          tasks: [
            { id: "uz-1", text: "Formular **18.44** (Übersiedlungsgut) ausfüllen und unterschreiben" },
            { id: "uz-2", text: "Inventarliste erstellen: globale Angaben reichen (z. B. «12 Kartons Bücher»), Möbel, Wertsachen und grössere Geräte einzeln aufführen" },
            { id: "uz-3", text: "Neuere Gegenstände (unter 6 Monate) separat unter «zu verzollende Waren» mit Wert auflisten, Kaufbelege bereithalten" },
            { id: "uz-4", text: "Nachweis der Wohnsitzverlegung einpacken: Arbeitsvertrag, Mietvertrag, Abmeldebestätigung" },
            { id: "uz-5", text: "Spätere Nachsendungen schon bei der ersten Einfuhr auf einer separaten Liste anmelden" }
          ],
          notes: [
            { type: "warn", title: "Zu Bürozeiten über die Grenze", text: "Umzugsgut muss während der **Öffnungszeiten einer Zollstelle für Handelswaren** abgefertigt werden. Am Wochenende oder nachts geht das nicht. Eine Anmeldung im Voraus ist nicht nötig." }
          ],
          sources: [
            { label: "BAZG: Umzug in die Schweiz", url: "https://www.bazg.admin.ch/de/vorgehen-umzug-in-die-schweiz" },
            { label: "BAZG: FAQ Umzugsgut", url: "https://www.bazg.admin.ch/de/faq-umzugsgut" },
            { label: "Formular 18.44 (PDF)", url: "https://www.bazg.admin.ch/dam/de/sd-web/lokVGdOnQG-l/18_44_uebersiedlungsgut_d.pdf" }
          ]
        },
        {
          id: "kinder",
          title: "Familienzulagen & Schule vorbereiten",
          timing: "Planungsphase",
          due: -30,
          when: "kinder",
          intro: "Erwerbstätige erhalten in der Schweiz Familienzulagen. Sie kommen nicht automatisch, sondern laufen über den Arbeitgeber und dessen Familienausgleichskasse.",
          tasks: [
            { id: "ki-1", text: "Beim Arbeitgeber nach dem Antrag auf Familienzulagen fragen" },
            { id: "ki-2", text: "Geburtsurkunden der Kinder bereithalten" },
            { id: "ki-3", text: "Schule bzw. Kindergarten bei der Wohngemeinde anfragen" },
            { id: "ki-4", text: "Kinder ebenfalls innert 3 Monaten in der Krankenkasse versichern (jedes Familienmitglied einzeln)" }
          ],
          facts: [
            {
              title: "Bundesrechtliche Mindestansätze pro Kind und Monat",
              rows: [["Kinderzulage (bis 16 Jahre)", "mind. CHF 215"], ["Ausbildungszulage (16–25 Jahre, in Ausbildung)", "mind. CHF 268"]],
              note: "Viele Kantone zahlen mehr. Massgebend ist der Kanton des Arbeitgebers."
            }
          ],
          sources: [
            { label: "BSV: Zulagen für Familien", url: "https://www.bsv.admin.ch/de/zulagen-fuer-familien" }
          ]
        }
      ]
    },

    /* ======================================================= */
    {
      id: "umzug",
      title: "Der Umzug",
      short: "Umzug",
      time: "Umzugswoche",
      lead: "Abmelden, Grenze passieren, Wohnung übernehmen.",
      items: [
        {
          id: "abmeldung",
          title: "Abmeldung im Herkunftsland",
          timing: "1 Woche vorher bis 2 Wochen nach Auszug",
          due: -1,
          legal: true,
          intro: "Wer aus Deutschland ins Ausland zieht, muss sich **innerhalb von zwei Wochen nach dem Auszug** abmelden. Das geht **frühestens eine Woche vor dem Auszug** (§ 17 Abs. 2 BMG).",
          tasks: [
            { id: "ab-1", text: "Beim Bürgeramt abmelden (vielerorts auch online möglich)" },
            { id: "ab-2", text: "Abmeldebestätigung mitnehmen – sie dient am Zoll als Nachweis der Wohnsitzverlegung" }
          ],
          sources: [
            { label: "§ 17 BMG", url: "https://www.gesetze-im-internet.de/bmg/__17.html" }
          ]
        },
        {
          id: "auto-zoll",
          title: "Auto am Zoll anmelden",
          timing: "Am Grenzübertritt",
          due: 0,
          when: "auto",
          legal: true,
          intro: "Dein Auto gilt als Umzugsgut, wenn du es **mindestens 6 Monate** im Ausland gefahren hast. Es muss **direkt bei der Einfuhr** angemeldet werden.",
          tasks: [
            { id: "az-1", text: "Fahrzeug auf der Inventarliste bzw. separat beim Zoll anmelden" },
            { id: "az-2", text: "Fahrzeugpapiere mitnehmen; ist das Auto nicht auf dich zugelassen, eine schriftliche Erklärung des Halters" },
            { id: "az-3", text: "Zollpapiere aufbewahren – du brauchst sie später beim Strassenverkehrsamt" }
          ],
          notes: [
            { type: "warn", title: "Auto jünger als 6 Monate im Besitz?", text: "Dann kannst du es mit einer Zollbewilligung (Formular 15.30) höchstens zwei Jahre unverzollt nutzen. Danach muss es verzollt oder wieder ausgeführt werden." }
          ],
          sources: [
            { label: "BAZG: FAQ Umzugsgut", url: "https://www.bazg.admin.ch/de/faq-umzugsgut" }
          ]
        },
        {
          id: "freimengen",
          title: "Lebensmittel & Alkohol im Umzugswagen",
          timing: "Am Umzugstag",
          due: 0,
          intro: "Frisch gekaufte Vorräte sind kein Umzugsgut. Für sie gelten die normalen Reisefreimengen **pro Person und Tag**.",
          facts: [
            {
              title: "Freimengen pro Person und Tag",
              rows: [
                ["Fleisch & Fleischzubereitungen", "1 kg"],
                ["Butter & Rahm", "1 kg / Liter"],
                ["Öle & Fette", "5 kg / Liter"],
                ["Alkohol bis 18 % Vol.", "5 Liter (ab 17 Jahren)"],
                ["Alkohol über 18 % Vol.", "1 Liter (ab 17 Jahren)"],
                ["Zigaretten / Zigarren", "250 Stück (ab 17 Jahren)"]
              ],
              note: "Übersteigt der Gesamtwert aller mitgeführten Waren **CHF 150**, ist die Mehrwertsteuer fällig: **8,1 %**, reduziert **2,6 %** (z. B. Lebensmittel)."
            }
          ],
          tasks: [
            { id: "fm-1", text: "Vorräte und Getränke vor der Fahrt grob prüfen" },
            { id: "fm-2", text: "Bei Bedarf vorab in der App «QuickZoll» des BAZG verzollen" }
          ],
          sources: [
            { label: "BAZG: Freimengen", url: "https://www.bazg.admin.ch/de/freimengen-lebensmittel-alkohol-tabak" },
            { label: "BAZG: Wertfreigrenze CHF 150", url: "https://www.bazg.admin.ch/de/wertfreigrenze-mehrwertsteuer-einreise-150-franken" }
          ]
        },
        {
          id: "vignette",
          title: "Autobahnvignette",
          timing: "Vor der ersten Autobahnfahrt",
          due: 0,
          intro: "Auf Schweizer Autobahnen brauchst du eine Vignette. Sie kostet **CHF 40** und gilt vom 1. Dezember des Vorjahres bis zum 31. Januar des Folgejahres.",
          tasks: [
            { id: "vi-1", text: "E-Vignette online kaufen (an das Kontrollschild gebunden) oder Klebevignette besorgen" },
            { id: "vi-2", text: "Bei Schilderwechsel: Kontrollschild der E-Vignette anpassen" }
          ],
          sources: [
            { label: "ch.ch: Autobahnvignette", url: "https://www.ch.ch/de/autobahnvignette" }
          ]
        },
        {
          id: "wohnung",
          title: "Wohnungsübergabe & Strom",
          timing: "Einzugstag",
          due: 0,
          intro: "Bei der Übergabe wird ein Protokoll erstellt. Was dort nicht steht, kann dir beim Auszug angelastet werden.",
          tasks: [
            { id: "wo-1", text: "Übergabeprotokoll genau prüfen, Mängel notieren und fotografieren" },
            { id: "wo-2", text: "Zählerstände ablesen und beim lokalen Energieversorger anmelden" },
            { id: "wo-3", text: "Beleuchtung einplanen: In vielen Mietwohnungen hängen keine Deckenlampen" }
          ],
          sources: [
            { label: "ch.ch: Mietvertrag", url: "https://www.ch.ch/de/wohnen/miete/mietvertrag-und-pachtvertrag/" }
          ]
        }
      ]
    },

    /* ======================================================= */
    {
      id: "ankunft",
      title: "Ankunft & Behörden",
      short: "Ankunft",
      time: "Erste 3 Monate",
      lead: "Die gesetzlichen Fristen nach der Einreise.",
      items: [
        {
          id: "anmeldung",
          title: "Anmeldung bei der Gemeinde",
          timing: "Innert 14 Tagen, vor Arbeitsbeginn",
          due: 14,
          legal: true,
          intro: "Der wichtigste Behördengang. Melde dich **innert 14 Tagen nach der Ankunft und vor Stellenantritt** bei deiner Wohngemeinde an. Die Gemeinde leitet den Antrag für deine Bewilligung weiter.",
          tasks: [
            { id: "an-1", text: "Pass oder Identitätskarte" },
            { id: "an-2", text: "Arbeitsvertrag" },
            { id: "an-3", text: "Mietvertrag" },
            { id: "an-4", text: "Passfoto und Zivilstandsdokumente (je nach Gemeinde, vorher auf deren Website prüfen)" },
            { id: "an-5", text: "Termin für biometrische Daten wahrnehmen (Gesichtsbild und zwei Fingerabdrücke für den Ausländerausweis)" }
          ],
          notes: [
            { type: "info", title: "Gebühren", text: "Die Gebühren für Bewilligung, Ausweis und Biometrie legt der Kanton fest. Rechne mit einer Rechnung nach dem Termin." }
          ],
          sources: [
            { label: "SEM: FAQ EU/EFTA-Bürger", url: "https://www.sem.admin.ch/sem/de/home/themen/fza_schweiz-eu-efta/eu-efta_buerger_schweiz/faq.html" },
            { label: "SEM: Biometrischer Ausländerausweis", url: "https://www.sem.admin.ch/sem/de/home/themen/aufenthalt/biometr_auslaenderausweis.html" }
          ]
        },
        {
          id: "krankenkasse",
          title: "Krankenkasse (Grundversicherung) abschliessen",
          timing: "Innert 3 Monaten",
          due: 90,
          legal: true,
          intro: "Jede Person mit Wohnsitz in der Schweiz muss sich **spätestens drei Monate nach der Wohnsitznahme** versichern. Bei rechtzeitigem Beitritt gilt der Schutz **rückwirkend ab Zuzug** – und die Prämien sind ebenfalls rückwirkend zu zahlen.",
          tasks: [
            { id: "kk-1", text: "Prämien vergleichen auf priminfo.admin.ch (offizieller, werbefreier Rechner des Bundes)" },
            { id: "kk-2", text: "Franchise wählen: Erwachsene zwischen CHF 300 und 2500 (Kinder 0 bis 600)" },
            { id: "kk-3", text: "Mind. 8 Std./Woche bei einem Arbeitgeber angestellt? Dann bist du über die Unfallversicherung (UVG) gedeckt und kannst die Unfalldeckung in der Krankenkasse sistieren" },
            { id: "kk-4", text: "Jedes Familienmitglied einzeln anmelden" }
          ],
          notes: [
            { type: "tip", title: "Franchise richtig wählen", text: "Hohe Franchise = tiefere Prämie, aber du trägst die Kosten bis zu diesem Betrag selbst. Wähle eine hohe Franchise nur, wenn du den Betrag im Notfall auch zahlen kannst." },
            { type: "warn", title: "Zu spät angemeldet?", text: "Dann gilt der Schutz erst ab Beitritt, und bei nicht entschuldbarer Verspätung kann ein Prämienzuschlag fällig werden." }
          ],
          sources: [
            { label: "BAG: Versicherungspflicht", url: "https://www.bag.admin.ch/de/krankenversicherung-versicherungspflicht-fuer-in-der-schweiz-wohnhafte-versicherte" },
            { label: "BAG: Franchise & Prämien", url: "https://www.bag.admin.ch/de/praemien-und-kosten-antworten-auf-haeufige-fragen" },
            { label: "BAG: Unfalldeckung sistieren", url: "https://www.bag.admin.ch/de/krankenversicherung-zur-sistierung-der-unfalldeckung-berechtigte-versicherte" },
            { label: "Priminfo-Rechner", url: "https://www.priminfo.admin.ch" }
          ]
        },
        {
          id: "bank",
          title: "Bankkonto eröffnen",
          timing: "Erste Woche",
          due: 7,
          intro: "Für Lohn, Miete und Kaution brauchst du ein Schweizer Konto. Gebühren unterscheiden sich stark zwischen klassischen und digitalen Banken.",
          tasks: [
            { id: "ba-1", text: "Angebote vergleichen (Kontoführung, Karte, Fremdwährung)" },
            { id: "ba-2", text: "Konto eröffnen und IBAN an den Arbeitgeber geben" },
            { id: "ba-3", text: "Mietkautionskonto eröffnen oder eine Mietkautionsversicherung prüfen" }
          ]
        },
        {
          id: "quellensteuer",
          title: "Quellensteuer verstehen",
          timing: "Ab dem ersten Lohn",
          due: 30,
          intro: "Mit Bewilligung B oder L zieht der Arbeitgeber die Einkommenssteuer **direkt vom Lohn** ab. Eine Steuererklärung musst du dann in der Regel nicht ausfüllen. Die Tarife sind kantonal unterschiedlich.",
          tasks: [
            { id: "qs-1", text: "Erste Lohnabrechnung prüfen: Ist der richtige Quellensteuer-Tarif (Zivilstand, Kinder) angewendet?" },
            { id: "qs-2", text: "Säule-3a-Einzahlungen abziehen oder Verrechnungssteuer zurückholen? Dafür bis **31. März des Folgejahres** eine nachträgliche ordentliche Veranlagung (NOV) beantragen" }
          ],
          sources: [
            { label: "ch.ch: Quellensteuer", url: "https://www.ch.ch/de/steuern-und-finanzen/steuerarten/quellensteuer/" },
            { label: "ESTV: Quellensteuer", url: "https://www.estv.admin.ch/de/quellensteuer" }
          ]
        },
        {
          id: "hund",
          title: "Hund beim Tierarzt kontrollieren lassen",
          timing: "Innert 10 Tagen",
          due: 10,
          when: "hund",
          legal: true,
          intro: "Wer einen Hund aus dem Ausland einführt, muss **innert zehn Tagen** dessen Kennzeichnung (Chip) von einem Schweizer Tierarzt überprüfen lassen. Der Hund wird dann in der Datenbank AMICUS erfasst.",
          tasks: [
            { id: "hu-1", text: "Termin beim Tierarzt: Chip-Kontrolle und Erfassung in AMICUS" },
            { id: "hu-2", text: "Hund bei der Gemeinde anmelden (Hundesteuer, Regeln je nach Kanton)" }
          ],
          sources: [
            { label: "AMICUS", url: "https://www.amicus.ch" },
            { label: "BAZG: Mit Hund und Katze", url: "https://www.bazg.admin.ch/de/mit-hund-und-katze-in-die-schweiz" }
          ]
        },
        {
          id: "serafe",
          title: "Radio- & TV-Abgabe (Serafe)",
          timing: "Nach der Anmeldung",
          due: 30,
          intro: "Die Abgabe ist pro Haushalt geschuldet. Du musst dich in der Regel nicht selbst anmelden: Serafe erhält die Daten aus dem Einwohnerregister und schickt die Rechnung.",
          facts: [
            {
              rows: [["2026", "CHF 335 pro Jahr und Privathaushalt"], ["ab 1. 1. 2027", "CHF 312 pro Jahr und Privathaushalt"]]
            }
          ],
          tasks: [
            { id: "se-1", text: "Rechnung von Serafe abwarten und prüfen" }
          ],
          sources: [
            { label: "Serafe", url: "https://www.serafe.ch" }
          ]
        }
      ]
    },

    /* ======================================================= */
    {
      id: "integration",
      title: "Finanzen & Ankommen",
      short: "Ankommen",
      time: "Erstes Jahr",
      lead: "Vorsorge nutzen, Fahrzeug umschreiben, Kontakte knüpfen.",
      items: [
        {
          id: "saeule3a",
          title: "Säule 3a: Steuern sparen",
          timing: "Bis 31. Dezember",
          due: "yearEnd",
          intro: "Einzahlungen in die Säule 3a kannst du vom steuerbaren Einkommen abziehen. Der Betrag muss **bis 31. Dezember** auf dem 3a-Konto verbucht sein.",
          facts: [
            {
              title: "Maximalbeträge 2026",
              rows: [["Angestellt mit Pensionskasse", "CHF 7'258 pro Jahr"], ["Selbstständig ohne Pensionskasse", "20 % des Einkommens, max. CHF 36'288"]]
            }
          ],
          tasks: [
            { id: "3a-1", text: "Anbieter vergleichen (Bank oder Versicherung, Gebühren, Anlagestrategie)" },
            { id: "3a-2", text: "Einzahlung rechtzeitig vor Jahresende auslösen" },
            { id: "3a-3", text: "Als quellenbesteuerte Person: NOV bis 31. März beantragen, damit der Abzug zählt" }
          ],
          sources: [
            { label: "BSV: Beitrag an die 3. Säule", url: "https://www.bsv.admin.ch/de/beitrag-3-sauele" }
          ]
        },
        {
          id: "fuehrerschein",
          title: "Führerausweis umtauschen",
          timing: "Innert 12 Monaten",
          due: 365,
          legal: true,
          intro: "Mit Wohnsitz in der Schweiz darfst du nur **zwölf Monate** mit dem ausländischen Führerausweis fahren. EU/EWR-Ausweise werden ohne zusätzliche Fahrprüfung umgetauscht.",
          tasks: [
            { id: "fs-1", text: "Sehtest bei einem anerkannten Optiker oder Arzt machen" },
            { id: "fs-2", text: "Antrag beim Strassenverkehrsamt deines Kantons mit Original-Führerausweis einreichen" }
          ],
          sources: [
            { label: "ch.ch: Führerausweis umtauschen", url: "https://www.ch.ch/de/fahrzeuge-und-verkehr/fuhrerausweis/fuhrerausweis-umtauschen/" }
          ]
        },
        {
          id: "auto-zulassung",
          title: "Auto auf Schweizer Schilder umschreiben",
          timing: "Spätestens nach 1 Jahr",
          due: 365,
          when: "auto",
          legal: true,
          intro: "Nach der Zollbehandlung ist die Schweizer Zulassung **grundsätzlich spätestens ein Jahr nach der Wohnsitzverlegung** vorzunehmen. Zuständig ist das Strassenverkehrsamt deines Wohnkantons.",
          tasks: [
            { id: "aul-1", text: "Beim Strassenverkehrsamt nach Ablauf und Prüfung fragen" },
            { id: "aul-2", text: "Schweizer Fahrzeugversicherung abschliessen" },
            { id: "aul-3", text: "Nach Schilderwechsel: E-Vignette auf das neue Kontrollschild ändern" }
          ],
          sources: [
            { label: "BAZG: FAQ Umzugsgut (Frage 16)", url: "https://www.bazg.admin.ch/de/faq-umzugsgut" }
          ]
        },
        {
          id: "community",
          title: "Ankommen & Kontakte knüpfen",
          timing: "Laufend",
          due: null,
          intro: "Ein neues Land fühlt sich erst dann wie Zuhause an, wenn du Menschen kennst. Plane das so bewusst wie den Umzug.",
          tasks: [
            { id: "co-1", text: "Zu einem LebenPlus-Treffen kommen und Gleichgesinnte kennenlernen" },
            { id: "co-2", text: "Hausarzt in der Nähe suchen, bevor du ihn brauchst" },
            { id: "co-3", text: "Vereine, Sport oder Sprachkurs in der Gemeinde ausprobieren" }
          ]
        }
      ]
    }
  ]
};
