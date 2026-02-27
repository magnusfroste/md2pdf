import { FileText, BookOpen, Mail, Code } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: typeof FileText;
  content: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "cv",
    name: "CV / Resumé",
    description: "Professionellt CV med sektioner för erfarenhet, utbildning och kompetenser",
    icon: FileText,
    content: `# Anna Andersson

**Fullstack-utvecklare** · Stockholm, Sverige
anna@example.com · 070-123 45 67 · [linkedin.com/in/anna](https://linkedin.com)

---

## Sammanfattning

Erfaren fullstack-utvecklare med 5+ års erfarenhet av moderna webbteknologier. Passionerad för att bygga skalbara, användarvänliga applikationer med fokus på prestanda och kodkvalitet.

---

## Erfarenhet

### Senior Frontend-utvecklare — Techbolaget AB
*Jan 2022 – Nu*

- Ledde migrering från legacy Angular-app till React/TypeScript
- Implementerade designsystem med Storybook och Tailwind CSS
- Förbättrade laddningstider med 40% genom code splitting och lazy loading

### Fullstack-utvecklare — Digitalbyrån
*Aug 2019 – Dec 2021*

- Utvecklade REST-API:er med Node.js och PostgreSQL
- Byggde realtidsfunktioner med WebSockets
- Mentorerade 3 juniora utvecklare

---

## Utbildning

### Civilingenjör Datateknik — KTH
*2015 – 2019*

---

## Kompetenser

| Område | Teknologier |
|--------|------------|
| Frontend | React, TypeScript, Next.js, Tailwind CSS |
| Backend | Node.js, Python, PostgreSQL, Redis |
| Verktyg | Git, Docker, CI/CD, AWS |
| Metodik | Agile/Scrum, TDD, Code Review |

---

## Språk

- **Svenska** — Modersmål
- **Engelska** — Flytande
- **Tyska** — Grundläggande
`,
  },
  {
    id: "letter",
    name: "Formellt brev",
    description: "Brevmall med avsändare, mottagare, datum och hälsningsfras",
    icon: Mail,
    content: `# Erik Svensson

Storgatan 12, 111 23 Stockholm
erik.svensson@example.com · 08-123 456

---

**Datum:** ${new Date().toLocaleDateString("sv-SE")}

**Till:**
Företaget AB
Att: Rekryteringsavdelningen
Box 456
123 45 Göteborg

---

## Ansökan till tjänsten som Projektledare

Bästa rekryterare,

Jag skriver med anledning av er utlysta tjänst som Projektledare som jag fann på er hemsida. Med min bakgrund inom projektledning och teknisk utveckling tror jag att jag kan bidra starkt till ert team.

Under mina fem år som projektledare har jag:

- Framgångsrikt levererat 15+ projekt inom budget och tidsram
- Lett tvärfunktionella team med upp till 12 personer
- Implementerat agila metoder som ökade leveranshastigheten med 30%

Jag är särskilt intresserad av er satsning på digital transformation och ser stora möjligheter att bidra med min erfarenhet av att driva förändringsprojekt.

Jag bifogar mitt CV och ser fram emot att diskutera hur jag kan bidra till Företaget AB.

Med vänliga hälsningar,

**Erik Svensson**
`,
  },
  {
    id: "report",
    name: "Rapport",
    description: "Akademisk/professionell rapport med innehållsförteckning och struktur",
    icon: BookOpen,
    content: `# Kvartalsrapport Q4 2025

**Avdelning:** Produktutveckling
**Författare:** Maria Johansson
**Datum:** ${new Date().toLocaleDateString("sv-SE")}
**Version:** 1.0

---

## Innehåll

1. Sammanfattning
2. Nyckeltal
3. Genomförda projekt
4. Utmaningar
5. Plan för nästa kvartal

---

## 1. Sammanfattning

Fjärde kvartalet 2025 har präglats av stark tillväxt och framgångsrika produktlanseringar. Teamet har levererat tre större funktioner och förbättrat systemets stabilitet avsevärt.

> **Nyckelresultat:** 98.5% uptime, 23% snabbare svarstider, 2 nya produktlanseringar

---

## 2. Nyckeltal

| Mätpunkt | Q3 2025 | Q4 2025 | Förändring |
|----------|---------|---------|------------|
| Aktiva användare | 12 400 | 15 800 | +27% |
| Svarstid (median) | 320ms | 245ms | -23% |
| Uptime | 97.2% | 98.5% | +1.3pp |
| NPS | 42 | 51 | +9 |
| Buggar rapporterade | 89 | 54 | -39% |

---

## 3. Genomförda projekt

### 3.1 Ny sökmotor

Implementerade Elasticsearch-baserad sökning som förbättrade sökresultatens relevans med 45%.

### 3.2 Mobilapp v2.0

Lanserade omdesignad mobilapp med:

- Ny navigationsstruktur
- Offline-stöd
- Push-notifikationer
- Dark mode

### 3.3 API v3

Migrerade till GraphQL vilket möjliggjorde:

\`\`\`graphql
query GetUserDashboard($userId: ID!) {
  user(id: $userId) {
    name
    stats { activeProjects, completedTasks }
    recentActivity(limit: 10) { type, timestamp }
  }
}
\`\`\`

---

## 4. Utmaningar

1. **Rekrytering** — Svårt att hitta seniora backend-utvecklare
2. **Teknisk skuld** — Äldre moduler kräver refaktorering
3. **Skalbarhet** — Databasoptimering behövs för ökad last

---

## 5. Plan för nästa kvartal

- [ ] Migrera till Kubernetes
- [ ] Lansera AI-assisterad kundtjänst
- [ ] Genomföra säkerhetsaudit
- [ ] Anställa 2 senior-utvecklare

---

*Rapporten är konfidentiell och avsedd för internt bruk.*
`,
  },
  {
    id: "readme",
    name: "README",
    description: "GitHub-stil README med installation, användning och bidragsguide",
    icon: Code,
    content: `# 🚀 ProjectName

> En kort, slagkraftig beskrivning av vad projektet gör.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()

---

## ✨ Funktioner

- 🔥 **Snabb** — Optimerad för prestanda
- 🎨 **Anpassningsbar** — Enkelt att konfigurera
- 📱 **Responsiv** — Fungerar på alla enheter
- 🔒 **Säker** — Följer OWASP-riktlinjer

---

## 📦 Installation

\`\`\`bash
# Klona repot
git clone https://github.com/username/project.git
cd project

# Installera beroenden
npm install

# Starta utvecklingsservern
npm run dev
\`\`\`

---

## 🛠️ Användning

\`\`\`javascript
import { ProjectName } from 'project-name';

const app = new ProjectName({
  theme: 'dark',
  language: 'sv',
});

app.start();
\`\`\`

### Konfiguration

| Parameter | Typ | Standard | Beskrivning |
|-----------|-----|----------|-------------|
| \`theme\` | string | \`'light'\` | Färgtema |
| \`language\` | string | \`'en'\` | Språk |
| \`debug\` | boolean | \`false\` | Debug-läge |

---

## 📁 Projektstruktur

\`\`\`
src/
├── components/    # UI-komponenter
├── hooks/         # Custom React hooks
├── lib/           # Hjälpfunktioner
├── pages/         # Sidkomponenter
└── types/         # TypeScript-typer
\`\`\`

---

## 🤝 Bidra

1. Forka repot
2. Skapa en feature-branch (\`git checkout -b feature/ny-funktion\`)
3. Committa ändringar (\`git commit -m 'Lägg till ny funktion'\`)
4. Pusha till branchen (\`git push origin feature/ny-funktion\`)
5. Öppna en Pull Request

---

## 📄 Licens

Distribueras under MIT-licensen. Se \`LICENSE\` för mer information.

---

Byggt med ❤️ av [Ditt Namn](https://github.com/username)
`,
  },
];
