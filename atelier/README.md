# Cap Web · Refuge pour animaux

## À quoi sert Cap Web

Cap Web est un assistant de discussion à règles consacré à un refuge pour animaux.
Il aide à comprendre les besoins d'un animal avant une visite ou une adoption.
Il reconnaît des commandes simples, applique une limite de message et conserve la conversation dans le navigateur.

## Installer, lancer et vérifier

Prérequis : Node.js 24.20.0 ou une version plus récente.

Depuis le dossier `atelier`, installez exactement les dépendances verrouillées :

```sh
npm ci
```

Le fichier `cahier-personnel.json` doit contenir les réglages privés du binôme. Ne le modifiez plus après le commit de départ.

Lancez ensuite l'application :

```sh
npm start
```

Ouvrez <http://127.0.0.1:3000>. Arrêtez le serveur avec `Ctrl+C`.

Pour exécuter tous les tests automatisés :

```sh
npm test
```

Les tests du contrat se lancent seuls avec :

```sh
node --test tests/contrat/brain.contrat.test.js
```

## Organisation des modules JavaScript

- `public/js/brain.js` contient les règles pures : validation du message et choix de la réponse. Il ne touche jamais au DOM.
- `public/js/view.js` construit l'affichage de la conversation avec du texte sûr. Il ne choisit aucune réponse.
- `public/js/app.js` relie le formulaire, le cerveau, l'affichage et le stockage local. Il orchestre les événements sans fabriquer le HTML des messages.

## Arborescence du projet

```text
atelier/
├── public/               # Page, styles et JavaScript exécutés dans le navigateur
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js        # Événements, stockage et appels au serveur
│       ├── brain.js      # Validation et réponses à règles
│       └── view.js       # Affichage sûr de la conversation
├── server/               # Serveur HTTP local et routes JSON
├── tests/                # Tests Node, contrat protégé et tests unitaires
├── browser/              # Tests de l’interface avec Playwright
└── scripts/              # Contrôles de construction et de dépendances
```
