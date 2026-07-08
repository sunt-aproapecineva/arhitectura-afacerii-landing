# Variante de conținut

Fiecare fișier `<slug>.json` de aici e un **override parțial** peste `src/content/default.json` — pui doar cheile pe care vrei să le schimbi (obiectele se combină recursiv, listele și textele se înlocuiesc integral, cheile `_*` sunt ignorate).
Landingul îl încarcă cu `?v=<slug>` (ex. `/?v=exemplu-test`); slug: doar `a-z`, `0-9`, `-`.
Înainte de publicare, validează: `node scripts/check-variant.mjs <slug>`.
