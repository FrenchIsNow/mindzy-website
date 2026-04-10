# PDF des ebooks / guides

Déposez ici les fichiers PDF des guides. Le nom du fichier doit inclure le **slug** et le **code langue** (`fr` ou `en`).

Convention : `{slug}-{locale}.pdf`

Fichiers actuels :
- `lancer-presence-digitale-2026-fr.pdf`
- `seo-geo-expert-guide-fr.pdf`
- `launch-digital-presence-2026-en.pdf`
- `understanding-geo-2026-en.pdf`

La correspondance slug → fichier PDF par locale est définie dans `pdfByLocale` de chaque ebook dans `src/lib/ebooks.ts`.

Le téléchargement sert automatiquement le PDF dans la langue de l’utilisateur (fr/en ; es bascule sur fr).

Vérification rapide des PDFs manquants :
- `npm run validate:ebooks`
