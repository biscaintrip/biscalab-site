# BiscaLab — Sito Web

Sito vetrina di **Carmine Bisogno** (alias Bisca), content creator e consulente su Thailandia, business e food.

**Online su:** [biscalab.com](https://biscalab.com)

---

## Cos'è questo repository

Contiene tutti i file HTML, le immagini e le API serverless del sito BiscaLab. Ogni commit su `main` fa trigger un redeploy automatico su Vercel → il sito è live in 1-2 minuti.

---

## Stack tecnico

| Componente | Dettaglio |
|------------|-----------|
| Dominio | `biscalab.com` (SiteGround DNS → Vercel) |
| Hosting | Vercel — Piano Hobby (gratuito) |
| Deploy | Automatico da GitHub (branch `main`) |
| Backend API | Vercel Serverless Functions (cartella `/api`) |
| Pagamenti | Stripe Payment Links (live mode) |
| Consegna PDF | Make.com + Gmail automatico |
| Prenotazioni consulenze | Calendly |
| Form contatti | Formspree → biscaintrip@gmail.com |

---

## Struttura file

### Pagine principali

| File | Descrizione |
|------|-------------|
| `index.html` | Homepage sito vetrina |
| `bangkok_assistant.html` | Web app Bangkok Assistant (nascosta dal menu) |

### Pagine prodotto

| File | Prodotto | Prezzo |
|------|----------|--------|
| `nuova-vita.html` | Kit Nuova Vita in Thailandia | 19,99€ |
| `kit-casa.html` | Kit Comprare Casa in Thailandia | 69,99€ |
| `kit-casa-sessione.html` | Kit Casa + Sessione Tecnica | 149,99€ |
| `bisca-nightlife-pack.html` | Bisca Nightlife Pack | 9,99€ (lancio) |

### Pagine consulenze

| File | Descrizione |
|------|-------------|
| `consulenza-food.html` | Consulenza Attività Food (form contatti integrato) |

### API backend

| File | Descrizione |
|------|-------------|
| `api/chat.js` | Chat AI con OpenAI GPT-4o-mini |
| `api/checkout.js` | Creazione sessioni Stripe |
| `api/transcribe.js` | Trascrizione audio con Whisper |

### Immagini (root del repo)

**Foto personali:** `IMG_5581.JPG`, `IMG_5583.JPG`, `IMG_5584.JPG`, `IMG_5587.JPG`, `IMG_5588.JPG`, `IMG_5591.JPG`, `IMG_5593.JPG`, `IMG_5551 2.JPG`, `IMG_5553.JPG`, `IMG_5580.JPG`

**Cover prodotti:**
- `Nuovavita.png` — Kit Nuova Vita
- `Sistema CompletI – Comprare Casa in Thailandia.png` — Kit Casa 69€
- `Sistema Completo – Comprare Casa in Thailandia.png` — Kit Casa + Sessione 149€
- `nightlife-cover.jpg` — Bisca Nightlife Pack

> ⚠️ I nomi file PNG hanno spazi e caratteri speciali (en-dash `–`). Rispettarli esattamente nel codice HTML.

---

## Design System

### Colori (CSS variables)

| Variabile | Valore | Uso |
|-----------|--------|-----|
| `--cream` | `#F7F3EC` | Testo principale (su sfondo scuro) |
| `--black` | `#0E0C0A` | Sfondo principale |
| `--gold` | `#C8973A` | Accent — CTA, titoli em, label |
| `--gold-light` | `#E8B85A` | Gold hover state |
| `--warm-grey` | `#B0A898` | Testo secondario, descrizioni |
| `--border` | `rgba(200,151,58,0.15)` | Bordi sottili elementi |

### Font (da Google Fonts)

- **Cormorant Garamond** (serif) — titoli, testi lunghi, corpo
- **DM Mono** (monospace) — label, tag, bottoni, prezzi small
- **Unbounded** (sans-serif) — logo BISCALAB, numeri grandi, prezzi

> 🔒 I font e la palette colori sono l'identità visiva del sito. **Non cambiare senza istruzione esplicita.**

### Layout

- Max-width sezioni: 1200px centrato
- Padding desktop: 80-120px verticale, 48px orizzontale
- Padding mobile: 60-72px verticale, 24px orizzontale
- Gap griglie: 80px desktop, 40px mobile
- Reveal animation: opacity 0→1 + translateY 24px→0 su scroll

---

## Sezioni della homepage (`index.html`)

In ordine dall'alto:

1. **NAV** — logo BISCALAB + menu (Chi sono / Servizi / Consulenze / Guide / Pack / Contatti) + CTA Contattami
2. **HERO** — foto skyline Bangkok (`IMG_5591.JPG`), titolo, subtitle, stats
3. **STRIP** — ticker testuale animato con keyword
4. **CHI SONO** (`#about`) — foto Bisca, bio, credenziali
5. **SERVIZI** (`#servizi`) — 3 card con foto (viaggi, trasferimento, food)
6. **CONSULENZE** (`#consulenze`) — 4 card con modal di selezione
7. **GUIDE** (`#guide`) — 3 prodotti digitali con "Scopri di più" + "Acquista ora"
8. **PACK** (`#pack`) — Bisca Nightlife Pack + futuri prodotti lifestyle
9. **TESTIMONIANZE** — 3 recensioni clienti
10. **CONTATTI** (`#contatti`) — form Formspree + info
11. **FOOTER** — logo, link, social, copyright

> 🗑️ **Sezioni rimosse definitivamente:** Blog, Widget chat AI, Web app Bangkok Assistant (accessibile diretta via URL ma nascosta dal menu). **Non reinserire senza istruzione esplicita.**

---

## Prodotti e pagamenti

### Prodotti digitali — Stripe Payment Links (live mode)

| Prodotto | Prezzo | Payment Link | Metadata `plan` |
|----------|--------|--------------|-----------------|
| Nuova Vita | 19,99€ | `buy.stripe.com/8x27sL96D8QMcgt1KQ3sI0a` | `nuova-vita` |
| Kit Casa | 69,99€ | `buy.stripe.com/00w5kD0A79UQeoB3SY3sI0b` | `kit-casa` |
| Kit Casa + Sessione | 149,99€ | `buy.stripe.com/6oU5kDbeL9UQ1BP75a3sI0c` | `kit-casa-sessione` |
| Nightlife Pack | 9,99€ | `buy.stripe.com/eVq5kD96D6IE80dfBG3sI0d` | `nightlife-pack` |

> ⚠️ **Il metadata `plan` è critico** — senza di esso, lo scenario Make non riesce a smistare l'acquisto alla route giusta e il cliente non riceve l'email di consegna. Vedi `BiscaLab_Scenario_Make.md` per dettagli.

### Consulenze (Calendly + pagamento integrato)

| Consulenza | Prezzo | Link Calendly |
|------------|--------|---------------|
| Analisi Situazione | 59€ / 30min | `calendly.com/bisca/analisisituazionepersonale` |
| Consulenza Trasferimento | 119€ / 60min | `calendly.com/bisca/consulenza-trasferimento` |
| Consulenza Business | 179€ / 60min | `calendly.com/bisca/consulenza-business` |
| Consulenza Food | variabile | Form contatti → biscaintrip@gmail.com |

---

## Come modificare il sito

1. Claude modifica il file HTML
2. Claude fornisce il file aggiornato
3. Vai su `github.com/biscaintrip/biscalab-site`
4. Clicca il file → matita ✏️ → `cmd+A` → incolla il nuovo codice → Commit changes
5. Vercel fa il redeploy automatico in 1-2 minuti
6. Il sito è aggiornato su `biscalab.com`

### Per aggiungere nuove immagini

1. Vai su GitHub → `Add file` → `Upload files`
2. Carica l'immagine
3. **Nome file consigliato**: tutto minuscolo, trattini normali (`-`), estensione minuscola (`.jpg`, `.png`)
4. Usa il nome file **esatto** nel codice HTML (case sensitive!)
5. Dopo il commit, testa l'URL diretto: `biscalab.com/NOMEFILE.jpg` — se vedi l'immagine, è ok

> ⚠️ **Trap noto:** macOS a volte sostituisce i trattini normali (`-`) con en-dash (`–`) nei nomi file. Se l'immagine non si carica, verifica che i trattini siano quelli giusti. In caso di dubbio, rinomina il file con un nome corto e senza trattini.

---

## Variabili ambiente Vercel (progetto `biscalab-site`)

- `OPENAI_API_KEY` — chiave OpenAI per chat web app
- `ANTHROPIC_API_KEY` — chiave Anthropic (da ricaricare crediti)
- `STRIPE_SECRET_KEY` — chiave segreta Stripe live mode

Per modificare: Vercel → `biscalab-site` → Settings → Environment Variables → dopo ogni modifica fare Redeploy.

---

## Cosa NON fare

- ❌ **NON creare un file `vercel.json`** — causa errori di build
- ❌ **NON usare percorsi** `/mnt/user-data/` nelle immagini (funzionano solo in locale)
- ❌ **NON reinserire** widget chat AI o sezione Bangkok Assistant senza istruzione esplicita
- ❌ **NON cambiare** font, palette colori o design system (identità visiva)
- ❌ **NON modificare** i Payment Links Stripe senza conferma esplicita
- ❌ **NON usare** nomi file con spazi o caratteri speciali per i nuovi upload (usa trattini semplici, tutto minuscolo)

---

## Link utili

- Sito live: [biscalab.com](https://biscalab.com)
- Repository: [github.com/biscaintrip/biscalab-site](https://github.com/biscaintrip/biscalab-site)
- Dashboard Vercel: [vercel.com](https://vercel.com)
- Dashboard Stripe: [dashboard.stripe.com](https://dashboard.stripe.com)
- Scenario Make: `hook.eu1.make.com/v6gt377ymgurqpt2dd0l7fto8v4mse2m`

---

**Ultimo aggiornamento**: vedi [CHANGELOG.md](./CHANGELOG.md)
