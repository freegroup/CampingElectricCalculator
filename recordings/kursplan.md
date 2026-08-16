# Themenplan — Inhalte rund um camper-elektrik-planer.de

Arbeitsdokument. Stand 16.08.2026.

Ziel: eine Reihe von Landingpages und Videos, bei der **jedes Kapitel in einer Funktion
des Tools endet** — statt in einem Fließtext wie bei der Konkurrenz.

---

## 1. Recherche: der Kurs von jaybe.tv

Kostenloser Online-Kurs „Camper Elektrik & Solar 1x1", Text + Diagramme + eingebettetes
YouTube-Video. https://www.jaybe.tv/camper-elektrik-grundlagen

Gliederung:

```
 1  Sicherheit, TÜV, Haftung
 2  Warum überhaupt eine Zweitbatterie
 3  Batterie dimensionieren — AGM gegen LiFePO4, mit Formeln
 4  Verbraucher anschließen, Sicherungskasten mit Masseverteilung
 5  Ladekopplung und Ladebooster — Trennrelais, Lastmanagement
 6  Solaranlage — Panelwahl, Dimensionierung, Montage
 7  230 V Landstrom — CEE, FI/LS, Schutzmaßnahmen
 8  Wechselrichter — Sinus, Anschluss, Netzvorrangschaltung
 9  Kombigeräte — ECTIVE CSI/SSI gegen CTEK D250SE
10  Powerstations als Alternative
11  Kabelwahl und Verlegung, Trennung von Leitungen
12  Kabelquerschnitt — Formeln mit eingebettetem Online-Rechner
13  Crimpverbindungen
14  Komplettbeispiel 12-V-Verteilung mit Materialliste
15  Support über YouTube-Kommentare
```

**Zwei Beobachtungen:**

- Kapitel 12 hat bereits einen eingebetteten Rechner — dort sitzt jemand anderes im Slot.
- Kapitel 14 ist im Grunde die Software: „Komplettbeispiel mit Materialliste" ist genau
  das, was der Anlagenplaner ausgibt — nur interaktiv und für den eigenen Aufbau.

**Was übernommen werden darf und was nicht:** Die Themenreihenfolge gehört niemandem,
die ergibt sich aus der Sache — planmycamper nutzt dieselbe. Texte, Diagramme,
Gerätevergleiche und Materiallisten sind fremde Arbeit. Abgesehen davon funktioniert
Kopieren nicht: doppelter Inhalt rankt nicht, deshalb haben die Landingpages eigenen
Text bekommen.

---

## 2. Der eigene Plan

Andere Achse als jaybe: **der Kurs erklärt, das Tool rechnet.** Jedes Thema endet
deshalb in einer Funktion.

| # | Thema | Endet in | Status |
|---|---|---|---|
| 1 | Kabelquerschnitt berechnen | Kabelrechner | ✅ Landingpage + Video 1 online |
| 2 | Verbrauch ermitteln — die Reihenfolge | Energiebilanz der Karte | offen |
| 3 | Batterie dimensionieren | Laufzeit, Batterietyp-Prüfung | offen |
| 4 | Solar auslegen | Ertrag gegen Verbrauch, Reglerprüfung | offen |
| 5 | Ladebooster und Lichtmaschine | Spannungs- und Typprüfungen | offen |
| 6 | Sicherungen richtig wählen | Kette Schalter → Sicherung → Kabel | offen |
| 7 | Vom Plan zum Einkauf | Stückliste, Preisschätzung | offen |

**Reihenfolge nach Wirkung, nicht nach Lehrplan.** Nummer 6 vor Nummer 3, weil die
Sicherungskette das ist, was das Tool kann und ein Ratgebertext nicht.

### Nächste konkrete Kandidaten

**A — „Ich habe meinen eigenen Ausbau durchgerechnet"**
Kann niemand sonst drehen. Echter Einsatz, weil man dabei blöd dastehen kann. Zeigt den
Anlagenplaner statt nur den Kabelrechner. Bindet an die vorhandenen Ausbauvideos an.
Vorher einmal selbst eintippen — findet das Tool nichts, gibt es kein Video.

**B — „Kühlschrank läuft nicht an: die Prüfreihenfolge, bevor du Kabel tauschst"**
Beantwortet die Frage, die in Foren tatsächlich gestellt wird. Positioniert dich als
jemand, der auch sagt, wann das eigene Tool nicht die Antwort ist. Aus den Foren:
erst direkt am Gerät mit Min/Max messen, dann Übergangswiderstände an Sicherungshaltern
und Klemmen, dann Batterie unter Last — **erst dann** der Querschnitt.

**C — „Welche Sicherung für welches Kabel"**
Hohe Suchnachfrage, schließt an Video 1 an. Kernaussage: die Sicherung schützt die
Leitung, nicht das Gerät.

---

## 3. Reichweite

**Wichtiger als weitere Videos**, solange das erste noch kein Publikum hat.

### Shorts aus Video 1 (Material existiert bereits)

| Schnitt | Inhalt |
|---|---|
| 4:31 – 5:36 | Die 10,71 Volt und das „Zucken" — der stärkste Moment |
| 1:59 – 2:46 | Anlaufstrom: 3 A werden kurz zu 12 A |
| 5:42 – 6:23 | Halb volle Batterie als Auslöser |

### Foren

| Forum | Warum |
|---|---|
| forum.camper-bauen.de | **Erste Wahl.** Dort laufen ständig „Schaltplan + passt das so?"-Threads. Genau die Frage, die das Tool beantwortet |
| wohnmobilforum.de | größte Reichweite, allgemeiner |
| elektrikforum.de | Fachpublikum, härter, zählt dafür doppelt |
| campen.de | breite Camper-Community |

**Vorgehen:** Nicht das Video posten. Den Aufbau des Fragestellers durchrechnen und mit
dem Ergebnis antworten. Der Link ist der Beleg, nicht die Botschaft. Drei bis vier Mal,
danach verlinken andere von selbst.

### Der Einwand, der kommen wird

In Elektrikforen steht mehrfach: *„Der kurzzeitige Anlaufstrom ist für die
Querschnittsauslegung kaum relevant, 2,5 mm² reichen für 3–4 A Dauerstrom."*

Antwort: Für die **thermische** Auslegung stimmt das — ein Peak von Millisekunden
erwärmt kein Kabel. Für das **Anlaufen** ist er entscheidend, weil der
Unterspannungsschutz auf den Momentanwert reagiert. Zwei verschiedene
Auslegungskriterien, Video 1 behandelt das zweite.

### Kooperation statt Konkurrenz

**jaybe.tv** — ein Kurs, der Planung lehrt, und ein Werkzeug, das Planung durchrechnet,
sind keine Konkurrenten. Aufhänger: „dein Kapitel 14 ist ein statisches Beispiel, meins
rechnet das für den Aufbau des Lesers durch, inklusive Stückliste." Kurze ehrliche Mail,
kein Marketing-Text.

Dasselbe gilt für Ausbau-Kanäle, die das Thema erklären — die brauchen Werkzeuge, auf
die sie verweisen können.

---

## 4. Zu prüfen

**camper-autark.de / PowerPlan** wird beschrieben als Konfigurator, der Kabelquerschnitte
und Sicherungen als zusammenhängende Kette dimensioniert, bei Engpässen warnt und
Schaltplan plus Stückliste als PDF ausgibt — herstellerneutral, ohne Anmeldung.

Das ist beinahe die eigene Produktbeschreibung. **Vor der nächsten
Alleinstellungs-Behauptung ansehen.** Wo der echte Unterschied liegt, lässt sich erst
sagen, wenn man beides nebeneinander gesehen hat.

---

## Quellen

- jaybe.tv — https://www.jaybe.tv/camper-elektrik-grundlagen
- camper-autark.de PowerPlan — https://camper-autark.de/camper-elektrik
- planmycamper Guide 2026 — https://planmycamper.de/ratgeber/camper-elektrik-planen-der-komplette-guide-2026/
- forum.camper-bauen.de — https://forum.camper-bauen.de/viewtopic.php?t=3208
- wohnmobilforum.de — https://www.wohnmobilforum.de/
- elektrikforum.de — https://www.elektrikforum.de/
