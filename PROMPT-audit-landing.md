# PROMPT — Ad Landing „Audit" (super atractiv, interactiv, conversie maximă)

> Copiază tot ce e mai jos și dă-l într-un chat nou (Lovable / Claude / v0). E self-contained.

---

Construiește o pagină de landing (rută `/audit`) pentru RECLAMĂ (trafic rece), în ROMÂNĂ, 
pentru antreprenorii copleșiți de haosul operațional din firma lor (audiența programului 
„Arhitectura Afacerii Business" al lui Victor Morar). Obiectiv UNIC: să înceapă un TEST 
de 2 minute (quiz-diagnostic). Pagina trebuie să fie **super atractivă, interactivă și 
optimizată pentru conversie**, rapidă (fără video/WebGL greu), complet responsivă.

## Resurse (accesibile)
- Design system de PĂSTRAT IDENTIC (viridian dark, Archivo Narrow + Arimo) — quiz-ul + un
  exemplu viu al aceluiași sistem:
  https://github.com/sunt-aproapecineva/arhitectura-afacerii-quiz
  https://github.com/sunt-aproapecineva/victor-morar-landing
- Quiz-ul către care duce CTA (produsul final): 
  https://github.com/sunt-aproapecineva/arhitectura-afacerii-quiz
- Craft de animație (aplică principiile): https://github.com/emilkowalski/skills
- LINK CTA (unde duce testul): https://live.morarvictor.com/quiz-nou/quiz

## Stack & design tokens (păstrează EXACT — design system-ul `victor-morar-landing`)
React + Vite + TypeScript + Tailwind. Temă **dark viridian**. Fonturi: **Archivo Narrow**
(titluri/display) + **Arimo** (body). Copiază 1:1 din `victor-morar-landing/src/index.css`.

Culori (exact):
```
--viridian #0ba56f · --viridian-dark #07734d · --viridian-light #1fd08f · --viridian-ultra #e8f7f0
--midnight #0c1a2b · --midnight-deep #081320 (BG body) · --midnight-soft #11243a · --midnight-line #1d3450
--carbon #1b1c1e · --carbon-soft #2a2c2f
--cream #f4f3ef (TEXT body, off-white cald) · --cream-deep #eae8e1
--mn-line rgba(255,255,255,.08) · --ease-out-expo cubic-bezier(.16,1,.3,1)
::selection → background rgba(11,165,111,.3), color #d8fcec
```
Tipografie:
```
.display → Archivo Narrow 700, letter-spacing -.02em, line-height .96, UPPERCASE
.eyebrow → Arimo 600, .72rem, letter-spacing .22em, UPPERCASE
```
Butoane (PILL, nu dreptunghi):
```
.btn → border-radius 999px, Arimo 600, padding .85rem 1.6rem, transition transform .25s ease-out-expo
.btn-primary → background #0ba56f, color #04130c, box-shadow 0 8px 30px -8px rgba(11,165,111,.55)
.btn-primary:hover → background #1fd08f, translateY(-2px)
CTA premium: bordură conic rotativă viridian (`.shiny`) — ia-o din victor-morar-landing.
```
Fundal: **grid-mesh viridian** (linii `rgba(11,165,111,.05)` la 64px) + mască radială — NU grain/atmo.
Reveal: `opacity` + `translateY(28px)` + `blur(6px)` → clar, `--ease-out-expo`, stagger 80ms.
Accent = VIRIDIAN. **ZERO gold.** Text body = cream (`#f4f3ef`), nu alb pur.

## Reguli de animație (din skill-urile Emil Kowalski — respectă-le)
- Doar `transform` și `opacity`. Niciodată `scale(0)` (pornește din `scale(.95)` + `opacity:0`). Niciodată `transition: all`.
- Entrance/exit → `ease-out` puternic (`--ease-out`). Niciodată `ease-in` pe UI. Durate UI < 300ms; marketing poate mai lung.
- Butoane: press feedback instant `:active { transform: scale(.97) }`, hover doar pe `@media (hover:hover) and (pointer:fine)`.
- Reveal la scroll cu stagger 40–80ms. Entry-on-mount cu `@starting-style` (stare de repaus VIZIBILĂ → degradează grațios, niciodată gol).
- Respectă `prefers-reduced-motion` (păstrează opacity/culoare, scoate mișcarea).

## STRUCTURA PAGINII (în ordine)

### 0) Nav minimal (sticky, glass)
Logo „ARHITECTURA AFACERII" (Archivo Narrow, uppercase) centrat. Fără alte linkuri (o singură decizie).

### 1) HERO (regula celor 5 secunde — aici pui 80% din efort)
- **Vizual interactiv „haos → ordine":** ~24 de puncte care la încărcare pornesc împrăștiate 
  (poziții/rotații aleatoare) și se **asamblează** într-o grilă ordonată 6×4, cu stagger; 
  un singur punct e VIRIDIAN-luminos (tu / miezul sistemului) și pulsează discret, cu glow verde. `@starting-style` + 
  `--ease-out`, ~0.9s.
- Eyebrow pill: „Test gratuit · 2 minute”.
- H1 (Archivo Narrow, mare, uppercase): **„Cât de mult depinde afacerea ta de tine?”**
- Sub: „Răspunde la câteva întrebări și primești pe loc o hartă a haosului din firma ta: 
  unde se blochează, cât ține de tine și care e primul pas ca să scapi.”
- **[NIVEL 1] Micro-angajament — prima întrebare CHIAR în hero:** un card cu 
  „Firma ta poate merge 2 săptămâni fără tine?” și 3 butoane mari: **Da · Nu · Nu știu**. 
  La orice click → redirect la quiz (`/quiz-nou/quiz`), eventual cu răspunsul ca query param 
  (`?q1=nu`). Foot-in-the-door: omul a „început" deja testul.
- **[NIVEL 1] CTA principal garantat above-the-fold:** buton viridian „Începe testul gratuit →" 
  (press feedback, săgeata alunecă la hover) → link quiz.
- Microtrust sub CTA: „2 minute · fără card · rezultat instant · anonim”.
- **[NIVEL 1] Dovadă socială reală lângă CTA:** „Alătură-te celor **77 de antreprenori** care 
  și-au aflat deja scorul." Numărul **77** e real (din baza de quiz). Animație count-up de la 
  0 la 77 la intrarea în viewport. (Dacă poți, trage numărul DINAMIC din backend/DB și 
  actualizează-l; altfel lasă-l 77 fix, ușor de editat într-o constantă.)
- **[NIVEL 1] Bară CTA sticky pe mobil:** jos, fixă, „Începe testul →" — mereu vizibilă la scroll.

### 2) [NIVEL 2] Bară de autoritate (credibilitate în 5 secunde)
O linie discretă: „Metoda prin care Victor Morar conduce astăzi **5 companii** cu **250+ oameni** 
— fără să fie indispensabil în niciuna.”

### 3) Agitație — „Recunoști haosul?” (stagger reveal)
Titlu: „Dacă te regăsești aici, nu ești singur.” Grilă de 4 carduri (mobil: 1 col), fiecare cu 
punct viridian + text:
- „Telefonul sună și în vacanță”
- „Fiecare decizie trece prin tine”
- „Stingi incendii toată ziua”
- „Firma nu merge o săptămână fără tine”
Sub: „Nu e o problemă de muncă. E o problemă de sistem. Iar sistemul se poate vedea, măsura 
și repara.”
- **[NIVEL 2] Reframe / curiozitate:** „Majoritatea cred că problema e că muncesc prea puțin. 
  Testul arată, de obicei, altceva.”

### 4) [NIVEL 1] „Ce primești" — arată PREMIUL (mockup de rezultat)
Un card „de rezultat" (așa cum arată ce primești după test), ca să crească pofta de a-l termina:
- Un **scor de dependență** mare (ex. „Scor: 74/100 — afacerea depinde puternic de tine”) cu 
  o bară care se umple animat.
- 3 blocaje detectate (mini-listă cu bife/puncte): „Deciziile trec prin tine”, „Procese 
  nescrise”, „Fără tablou de bord”.
- O linie „Primul pas recomandat: …”.
Titlu secțiune: „În 2 minute, primești asta:”.

### 5) [NIVEL 1] Cele 3 lucruri pe care le afli (păstrează, sub result-preview)
01 „Cât de dependentă e afacerea de tine” · 02 „Unde se blochează, exact” · 03 „Primul pas ca 
să scapi de haos”. Carduri cu număr viridian, reveal cu stagger.

### 6) [NIVEL 2] Un testimonial real (dovadă, nu laudă)
Card cu citat: „Tema despre organigramă și matricea decizională a fost o revelație. Nu-mi vine 
să cred că am condus afacerea atâția ani fără aceste instrumente.” — **Daniela**, antreprenor 
în practicum. (Legat de CLARITATE, nu de vânzare.)

### 7) [NIVEL 2] Mini-FAQ (3 rânduri, dizolvă frica)
- „Chiar e gratuit?” → „Da. Fără card, fără costuri. Testul e gratuit, integral.”
- „Cât durează?” → „2 minute. Câteva întrebări simple despre firma ta.”
- „Ce primesc la final?” → „Un scor + harta blocajelor + primul pas concret.”

### 8) [NIVEL 2] Miza (loss aversion) + CTA final
O linie: „Fiecare lună în care rămâi coșul de gunoi al firmei tale costă — ore, decizii amânate, 
creștere oprită. Testul e gratuit. Haosul, nu.”
Titlu: „În 2 minute știi exact de unde începi.” + buton mare „Începe testul gratuit →” → quiz.

### 9) Footer minimal
„Arhitectura Afacerii · Victor Morar”.

## Interactivitate cerută (ca să fie „viu”)
- Vizual haos→ordine la mount (hero).
- Count-up pentru numărul de completări (77) la intrare în viewport.
- Bara de scor din result-preview se umple animat la intrare în viewport.
- Butoanele Da/Nu/Nu-știu și CTA: press feedback + hover subtil (gated).
- Reveal la scroll cu stagger pe secțiuni.
- Bară CTA sticky pe mobil.
- Totul respectă reduced-motion.

## Tehnic
- TOATE CTA-urile (hero, sticky, final, cele 3 butoane de micro-angajament) duc la 
  `https://live.morarvictor.com/quiz-nou/quiz` (o singură constantă `QUIZ_URL`, un loc de editat).
- Numărul de completări într-o constantă (`COMPLETIONS = 77`) sau, ideal, dinamic din backend.
- O singură decizie pe pagină (testul). Nu adăuga alte oferte, prețuri sau meniuri.
- Rapid: fără video, fără librării grele. Build fără erori. Responsive impecabil (mobil întâi).
- Nu modifica alte pagini existente — asta e o pagină nouă, `/audit`.
```

Verificare finală: pe mobil, CTA-ul principal e vizibil fără scroll, bara sticky apare, 
count-up-ul rulează, vizualul haos→ordine se asamblează, iar fiecare buton duce la quiz.
