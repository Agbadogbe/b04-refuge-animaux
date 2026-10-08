# Conventions de contribution

## Nommage

- Une fonction porte un verbe qui décrit son action, par exemple `validateMessage` ou `renderMessages`.
- Une constante porte un nom explicite ; une constante de configuration partagée est en majuscules, par exemple `LIMITE`.
- Un fichier JavaScript porte un nom court qui correspond à un seul rôle, par exemple `brain.js`, `view.js` ou `app.js`.
- Un test décrit le comportement observé et non l'implémentation interne.
- Un message de commit commence par `fix:`, `docs:`, `test:`, `feat:` ou `refactor:` et indique précisément un seul changement.

## Interdits

- Ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`. Si un test semble faux, arrête-toi et explique pourquoi.
- Ne modifie jamais un test existant uniquement pour le rendre vert.
- N'ajoute ni clé, ni mot de passe, ni donnée personnelle dans le dépôt, le code, un fichier `.env` ou une conversation avec une IA.
- N'utilise jamais `innerHTML`, `outerHTML` ou `insertAdjacentHTML` pour afficher un message ; utilise `textContent` ou un nœud texte.
- N'ajoute et ne mets à jour aucune dépendance sans accord explicite et sans vérifier `dependances-autorisees.json`.
- Ne mélange pas plusieurs corrections indépendantes dans un même commit.
- N'accepte aucun changement sans lire `git diff` et pouvoir expliquer chaque ligne.
- Ne considère pas le travail terminé tant que `npm test` n'affiche pas `fail 0`.
