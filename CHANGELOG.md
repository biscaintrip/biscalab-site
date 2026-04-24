# Changelog

Tutte le modifiche significative al sito BiscaLab vengono documentate qui.

**Convenzioni:**
- Le modifiche più recenti stanno **in cima**
- Ogni entry ha: data, tipo di modifica, dettagli, file toccati
- Tag: `[ADD]` nuova feature · `[FIX]` bugfix · `[CHG]` modifica · `[DEL]` rimozione · `[DOC]` documentazione

---

## 2026-04-24 — Lancio Bisca Nightlife Pack + grande pulizia

### `[ADD]` Nuovo prodotto: Bisca Nightlife Pack (9,99€ lancio)
- Creata landing page dedicata: **`bisca-nightlife-pack.html`**
- Struttura coerente con le altre landing (hero + statement + kit + itinerari + per chi + storia + CTA)
- Payment Link Stripe: `buy.stripe.com/eVq5kD96D6IE80dfBG3sI0d`
- Metadata Stripe: `plan = nightlife-pack`
- Cartella Drive dedicata "Pack Night": `drive.google.com/drive/folders/1giKR96F5AqJqqbSc82AVGcCsxAypFoQL`
  - Permessi: "Chiunque abbia il link" come Visualizzatore
  - Contenuto: 2 PDF (Bangkok Nightlife 93pp + Bangkok Luci Rosse 36pp) + 1 PDF istruzioni con link a mappa Google My Maps

### `[ADD]` Nuova sezione homepage `#pack`
- Aggiunta sezione **Pack** tra `#guide` e Testimonianze
- Layout orizzontale (immagine sx + contenuto dx), badge "Lancio −50%"
- Due CTA: "Acquista ora" (→ Stripe) + "Scopri di più" (→ landing)
- Aggiunta voce **"Pack"** nel menu nav tra Guide e Contatti
- Pensata come categoria scalabile per futuri prodotti lifestyle

### `[ADD]` Immagine cover Nightlife Pack
- Nome file: **`nightlife-cover.jpg`** (nome corto dopo problemi con nome lungo originale)
- Upload root del repo

### `[ADD]` Route 4 su scenario Make "Integration Webhooks"
- Route 4: filtro `metadata.plan = nightlife-pack`
- Modulo Gmail 6: invio email HTML al cliente con link cartella Drive
- Mittente: `biscaintrip@gmail.com`
- Template email con: grassetto, link cliccabile, lista file contenuti, CTA

### `[FIX]` Metadata Stripe aggiunti ai 3 Payment Link esistenti
**Problema scoperto durante test:** i 3 Payment Link pre-esistenti (Nuova Vita, Kit Casa, Kit Casa+Sessione) non avevano il campo metadata `plan`. Senza metadata il Router di Make non poteva smistare gli acquisti → clienti passati potrebbero non aver mai ricevuto l'email di consegna automatica.

Aggiunti i metadata mancanti:
- Nuova Vita → `plan = nuova-vita`
- Kit Casa → `plan = kit-casa`
- Kit Casa + Sessione → `plan = kit-casa-sessione`

> ⚠️ **Da verificare manualmente:** eventuali clienti passati che non hanno ricevuto il PDF. Controllare Stripe → Payments → storico acquisti e contattare individualmente.

### `[FIX]` Spazio invisibile nel metadata Stripe del Nightlife Pack
**Problema:** durante il primo test, il webhook arrivava ma il Router non smistava. Causa: copia-incolla aveva introdotto uno spazio finale (`"nightlife-pack "` invece di `"nightlife-pack"`) nel campo metadata Stripe.

**Soluzione:** riscritto il valore a mano (no copia-incolla) direttamente nel Payment Link.

**Lezione:** tutti i metadata vanno scritti a mano, lettera per lettera. Dopo aver salvato, rientrare e verificare che non ci siano spazi.

### `[DEL]` Rimozione definitiva widget chat AI da `index.html`
- Rimosse ~120 righe di codice morto (CSS + JavaScript del widget)
- Il DOM del widget era già stato rimosso in passato, ma CSS e JS erano rimasti orfani
- Funzione `detectCtx()` generava errori silenziosi in console ad ogni scroll — ora pulito
- Dimensione file: 68K → 56K (−18%)

### `[FIX]` Bug upload immagine con nome file lungo
**Problema:** l'immagine originale `bisca-nightlife-pack-cover.jpg` non veniva servita da Vercel (404) nonostante GitHub la mostrasse correttamente. Diagnosi: probabile carattere invisibile o estensione doppia nascosta da macOS nel nome file originale.

**Soluzione:** rinominato a `nightlife-cover.jpg` (nome corto, digitato a mano, niente copia-incolla). Funzionante al primo tentativo.

### `[DOC]` Creazione documentazione strutturata
- Creato **`README.md`** — panoramica tecnica del progetto
- Creato **`CHANGELOG.md`** — questo file
- Creato documento separato **`BiscaLab_Scenario_Make.md`** (nel progetto Claude) per lo scenario Make

---

## File toccati in questa sessione

- `index.html` — aggiunta sezione `#pack`, aggiunta voce nav, rimosso widget chat morto
- `bisca-nightlife-pack.html` — **nuovo file**
- `nightlife-cover.jpg` — **nuova immagine**
- `README.md` — **nuovo file**
- `CHANGELOG.md` — **nuovo file**

**Modifiche esterne al repo:**
- 4 Payment Link Stripe aggiornati con metadata `plan`
- Scenario Make: aggiunta Route 4 (Nightlife Pack) + modulo Gmail 6
- Google Drive: creata cartella "Pack Night" con permessi pubblici

---

## Prossimi step identificati

### 🔴 Urgenti
- [ ] Verificare nella cronologia Stripe se ci sono clienti che hanno acquistato i 3 vecchi prodotti **prima** che fossero aggiunti i metadata. Se sì, contattarli e verificare ricezione PDF
- [ ] Rimborsare il pagamento test Nightlife Pack da 9,99€

### 🟡 A breve
- [ ] Testare i 3 vecchi prodotti (Nuova Vita, Kit Casa, Kit Casa+Sessione) con un acquisto reale dopo l'aggiunta metadata — verificare che il flusso Make funzioni anche per loro
- [ ] Sistemare menu mobile (attualmente le `nav-links` sono nascoste su mobile, manca hamburger menu)
- [ ] Aggiornare copyright footer da `© 2025` a `© 2026` (tutte le pagine)
- [ ] Aggiornare count follower IG se cambiato dal 13.5k dichiarato

### 🟢 Non urgenti
- [ ] Attivare email dominio `bisca@biscalab.com` e aggiornare Formspree + Make
- [ ] Analytics (Vercel o Google)
- [ ] Ottimizzazione SEO (meta tags, Open Graph, sitemap)
- [ ] Futuri "Bisca Pack" (lifestyle): Food Deep Dive, Rooftop Culture, Isole del Sud...

---

## Lezioni imparate oggi (per non ripeterle)

1. **Mai fare copia-incolla per valori critici** (metadata Stripe, nomi file). Sempre digitare a mano e verificare visivamente dopo il salvataggio.
2. **macOS introduce caratteri invisibili nei nomi file** — preferire sempre nomi brevi, tutto minuscolo, senza caratteri speciali.
3. **Il widget chat era codice morto** da sessioni precedenti. Serve pulizia periodica del codice non usato.
4. **Documentare immediatamente le configurazioni critiche** (metadata Stripe, struttura Make) così da non dover "ricordare a mente" dopo mesi.
5. **Ogni Payment Link Stripe nuovo deve avere il metadata `plan`** — è la prima cosa da fare dopo aver creato il link.
