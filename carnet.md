# Carnet de bord J1 · Appareillage


Un carnet par binôme, rempli au fil de l'eau avec vos propres mots. Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») vaut mieux qu'une phrase parfaite recopiée. Aucune donnée personnelle, aucune clé ni jeton, ni l'adresse complète que `dsh web` affiche (elle contient un jeton). C'est aussi votre journal de décisions (astuce 13) : ce que vous avez demandé, ce qui a cassé, ce que vous avez refusé, et pourquoi.

Binôme : b04 — travail individuel (seul dans le groupe)

Thème provisoire et public visé : Refuge pour animaux (`refuge-animaux`) — personnes souhaitant adopter un animal, visiter le refuge ou comprendre les besoins d'un animal.

Trois questions auxquelles l'assistant pourrait répondre :
1. Comment adopter un animal au refuge ?
2. Quand peut-on visiter le refuge ?
3. Quels sont les besoins essentiels d'un animal adopté ?

Rôles de départ et moments d'échange : travail individuel ; je manipule et je vérifie moi-même. Les contre-vérifications prévues avec le binôme seront demandées à un voisin ou au formateur.

## Cahier personnel (remis par le formateur en J1-01)

Recopiez les valeurs telles que le formateur vous les a remises. Ne les changez pas, ne les échangez pas avec un autre binôme.

- Limite de caractères d'un message (le nombre N) : 320
- Premier mot reconnu, en plus de « salut », « aide » et « test » : plage
- Second mot reconnu : fenêtre

## Commandes essayées

Notez le dossier de lancement, la commande et sa sortie exacte, surtout quand un outil a bloqué.

- Dossier : `/Users/imhotep/Downloads/cap-web-j1/atelier`
- Commande et résultat : `dsh --profile headless "Reponds uniquement OK"` atteint la passerelle et le modèle `capweb-ia`, mais répond `402 Billing verification failed`. Aucun secret n'est recopié dans le carnet. Erreur à signaler au formateur ; configuration locale conservée sans modification.

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [x] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) : page lancée sur `http://127.0.0.1:3000`, thème et trois questions renseignés, cahier b04 recopié (320, plage, fenêtre).
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ? Oui, il est vide dans `index.html`. La phrase est ajoutée par `public/js/app.js` avec `textContent`.
- Décision prise ensemble : thème provisoire « Refuge pour animaux », consacré à l'adoption, aux visites et aux besoins des animaux.
- Difficulté qui reste : je suis seul dans le groupe ; j'ai donc manipulé et vérifié moi-même, avec des contrôles Chrome automatisés en deuxième contexte.

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [x] Validé
- Preuve : `essais-n0/chatbot-v1.html` s'ouvre ; le prompt et la première réponse sont collés ci-dessous, en entier, sans donnée personnelle.
- Mon prompt, tel quel : Fais-moi un chatbot sur un refuge pour animaux, pour aider à adopter, visiter le refuge et comprendre les besoins d'un animal, dans une seule page HTML que j'ouvre dans mon navigateur.
- La première réponse du chat (texte et code), telle quelle : Une page HTML autonome a été proposée. Son code complet est recopié ci-dessous et conservé à l'identique dans `essais-n0/chatbot-v1.html`.
+
  ```html
  <!doctype html>
  <html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Refuge animaux — assistant</title>
    <style>
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        padding: 2rem 1rem;
        font-family: system-ui, sans-serif;
        color: #243127;
        background: #f4efe5;
      }
      main {
        width: min(42rem, 100%);
        margin: auto;
        padding: 1.5rem;
        border-radius: 1rem;
        background: white;
        box-shadow: 0 1rem 2.5rem rgb(42 54 44 / 12%);
      }
      h1 { margin-top: 0; color: #2f6b4f; }
      #messages {
        min-height: 14rem;
        max-height: 24rem;
        margin: 1.5rem 0;
        padding: 1rem;
        overflow-y: auto;
        border: 1px solid #cbd7ce;
        border-radius: .75rem;
        list-style: none;
        background: #fbfdfb;
      }
      #messages li { margin-bottom: .8rem; line-height: 1.45; }
      form { display: grid; gap: .75rem; }
      textarea {
        width: 100%;
        min-height: 6rem;
        padding: .75rem;
        border: 1px solid #75877a;
        border-radius: .5rem;
        font: inherit;
        resize: vertical;
      }
      button {
        justify-self: start;
        padding: .7rem 1.1rem;
        border: 0;
        border-radius: .5rem;
        color: white;
        background: #2f6b4f;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }
      button:hover { background: #24543e; }
      button:focus-visible, textarea:focus-visible {
        outline: 3px solid #e2a83b;
        outline-offset: 2px;
      }
      #status { min-height: 1.5rem; color: #7a3427; }
    </style>
  </head>
  <body>
    <main>
      <h1>Assistant du refuge</h1>
      <p>Posez une question sur l'adoption, les visites ou les besoins d'un animal.</p>
  
      <ul id="messages" aria-label="Conversation">
        <li><strong>Assistant :</strong> Bonjour ! Comment puis-je vous aider ?</li>
      </ul>
  
      <form id="chat-form">
        <label for="message">Votre message</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
      <p id="status" role="status"></p>
    </main>
  
    <script>
      const form = document.querySelector('#chat-form');
      const field = document.querySelector('#message');
      const messages = document.querySelector('#messages');
      const status = document.querySelector('#status');
  
      function answer(message) {
        const normalized = message.toLowerCase();
  
        if (normalized.includes('adopt')) {
          return "Pour adopter, commencez par rencontrer l'animal, échangez avec l'équipe du refuge et préparez les justificatifs demandés.";
        }
        if (normalized.includes('visit') || normalized.includes('horaire')) {
          return "Les horaires varient selon le refuge. Consultez ses informations pratiques ou contactez son équipe avant de vous déplacer.";
        }
        if (normalized.includes('besoin') || normalized.includes('nourriture') || normalized.includes('soin')) {
          return "Un animal a notamment besoin d'une alimentation adaptée, de soins vétérinaires, d'activité, de sécurité et d'attention.";
        }
        return "Je peux vous renseigner sur l'adoption, les visites et les besoins essentiels d'un animal.";
      }
  
      function addMessage(author, text) {
        const item = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = `${author} : `;
        item.append(label, document.createTextNode(text));
        messages.append(item);
        messages.scrollTop = messages.scrollHeight;
      }
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = field.value.trim();
  
        if (!message) {
          status.textContent = 'Écrivez un message avant de l’envoyer.';
          field.focus();
          return;
        }
  
        status.textContent = '';
        addMessage('Vous', message);
        addMessage('Assistant', answer(message));
        field.value = '';
        field.focus();
      });
    </script>
  </body>
  </html>
  ```

- Trois lignes d'observation (ce que j'ai vu en utilisant la page) :
  1. « Comment adopter un animal ? » reçoit une réponse décrivant la rencontre avec l'animal, l'équipe et les justificatifs.
  2. « Quand peut-on visiter le refuge ? » reçoit une réponse sur les horaires et le contact préalable.
  3. Une question hors thème reçoit le repli ; un message vide est bloqué par la validation native du champ `required`, sans texte dans `#status`.
- Difficulté qui reste : aucune pour cette étape ; les observations sont reproduites par `browser/n0.spec.js` dans Chrome.

### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)

- [x] Validé
- Liste de contrôle de la version 1 (cinq à huit comportements essayés) :
  1. Le formulaire permet d'envoyer un message non vide.
  2. Le message de l'utilisateur s'ajoute à la conversation.
  3. Une question sur l'adoption reçoit une réponse sur l'adoption.
  4. Une question sur les visites reçoit une réponse sur les horaires.
  5. Une question sur les besoins reçoit une réponse sur les besoins essentiels.
  6. Une question hors thème reçoit une réponse de repli.
  7. Un message vide affiche une erreur et n'ajoute pas de message.
  8. Le texte saisi est ajouté avec `textContent` et n'est pas interprété comme du HTML.
- Journal des régressions, une entrée par modification : ce que j'ai demandé · ce qui marche maintenant · ce qui marchait et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé.
  - Modification 1 : « Ajoute un bouton Effacer qui vide la conversation. » · `chatbot-v2.html` ajoute le bouton et vide la liste · la phrase d'accueil disparaît aussi après l'effacement · confirmé dans Chrome.
  - Modification 2 : « Garde la conversation après le rechargement de la page. » · `chatbot-v3.html` enregistre un historique dans `localStorage` · un JSON abîmé provoque une erreur et bloque l'interface · reproduit dans Chrome.
  - Modification 3 : « Ajoute trois boutons proposant les questions principales du refuge sans les envoyer automatiquement. » · `chatbot-v4.html` copie la question sans l'envoyer et protège la lecture de la mémoire abîmée · confirmé dans Chrome.
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) : le second contexte de test Chrome a trouvé que `chatbot-v3.html` casse sur `{pas du json`, tandis que v4 repart correctement ; le bouton Effacer de v2 supprime aussi le message d'accueil.
- Deux phrases de conclusion : La conservation après F5 introduit le risque le plus important, car une mémoire abîmée peut bloquer toute l'interface. Sans reprendre toute la liste de contrôle après chaque changement, ce défaut pourrait passer inaperçu.
- Difficulté qui reste : aucune pour les comportements retenus ; quatre tests Chrome dédiés les reproduisent.

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [x] Validé
- Le prompt de référence (identique aux trois essais) : Fais-moi un chatbot sur un refuge pour animaux, pour aider à adopter, visiter le refuge et comprendre les besoins d'un animal, dans une seule page HTML que j'ouvre dans mon navigateur.
- Le tableau des écarts (trois colonnes A, B, C ; au moins quatre critères ; des faits, pas des impressions) :

  | Critère | A | B | C |
  |---|---|---|---|
  | Taille du fichier | 37 lignes | 37 lignes | 41 lignes |
  | Champ de saisie | `input` sur une ligne | `input` sur une ligne | `textarea` multiligne |
  | Message vide | Ignoré sans message | Refusé avec `alert` | Refusé dans `p#status` |
  | Conversation après F5 | Perdue | Perdue | Conservée avec `localStorage` |
  | Bouton Effacer | Absent | Absent | Présent |
  | Construction des messages | `textContent` | `insertAdjacentHTML` | `textContent` |
  | Réponses thématiques distinctes | Adoption seulement | Adoption, visite et besoins | Adoption distincte, repli commun pour le reste |

- Une phrase de conclusion (ce que ces écarts autorisent, ce qu'ils interdisent de supposer) : Ces trois réponses permettent de chercher des idées différentes, mais elles interdisent de supposer qu'un même prompt produit automatiquement les mêmes fonctions, le même niveau de sécurité ou la même conservation des données.
- Difficulté qui reste : aucune pour la comparaison retenue ; A, B et C répondent toutes à la même question d'adoption dans Chrome et leurs écarts restent ceux du tableau.

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [ ] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) : `dsh --version` affiche `0.1.5-rc.2` ; `DSH_HOME=/Users/imhotep/dsh-capweb` ; `DSH_TELEMETRY_MODE=DISABLED` ; `settings.yaml` configure `capweb-ia` et `defaultPreset: read-only` ; les deux fichiers de configuration ont les permissions `-rw-------`.
- La consigne exacte envoyée à l'agent et sa réponse : `dsh --profile headless "Reponds uniquement OK"` ; aucune réponse du modèle, car la passerelle renvoie `402 Billing verification failed` après avoir reconnu `capweb-ia`.
- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité : à compléter après le premier lancement authentifié.
- Difficulté qui reste : le test headless atteint `capweb-ia`, mais la passerelle répond `402 Billing verification failed` ; le formateur doit corriger le quota ou la facturation avant `dsh web`.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [ ] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : squelette structuré créé, contrôlé et sauvegardé dans le commit J1-06/J1-07 ; l'essai vague via dsh reste impossible à cause du 402.
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) : à exécuter dans dsh lorsque la fiche d'accès sera disponible. Prompt prévu : « Écris la page de Cap Web : un formulaire, une liste de messages et un statut. »
- Prompt structuré, en six parties, tel qu'envoyé :

  ```text
  RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
  TÂCHE : Écris le squelette de la page de « Cap Web », un assistant sur un refuge pour animaux : un formulaire, une liste de messages, une ligne de statut.
  CONTRAINTES :
  - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
  - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
  - Le champ #message est limité à 320 caractères (maxlength).
  - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
  FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
  EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
  CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
  ```

- Les hypothèses de l'agent, et ma réponse : hypothèses appliquées provisoirement : interface en français ; thème `refuge-animaux` ; aucune dépendance ; liste initialement vide ; limite fixée à 320. La pause d'approbation dans dsh reste à reproduire.
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») : colonne vague bloquée par le 402. Pour le structuré : page et quatre identifiants ✔ ; fichiers attendus ✔ ; aucune bibliothèque ni adresse HTTPS ✔ ; test Chrome ✔ ; `npm test` ✔.
- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est à compléter après l'essai vague ; le résultat structuré suit déjà les identifiants, la limite et le critère d'arrêt imposés.
- Difficulté qui reste : seul l'essai vague via dsh est bloqué par la réponse 402 de la passerelle ; les contrôles Chrome, Node et le commit sont terminés.

### J1-07 · 👣 Petits pas — [fiche](checkpoints/J1-07-petits-pas.md)

- [ ] Validé
- Preuve (découpage écrit avant la première demande, trois diffs relus, un refus écrit, un commit par étape acceptée, trois boutons de questions qui fonctionnent) :
- La tâche, mes trois questions et mon découpage en trois étapes (écrit avant la première demande d'écriture) : afficher « Comment adopter un animal au refuge ? », « Quand peut-on visiter le refuge ? » et « Quels sont les besoins essentiels d'un animal adopté ? ». Étape 1 : ajouter `ul#suggestions` et les trois boutons dans `index.html`. Étape 2 : dans `app.js`, copier le texte du bouton dans `textarea#message`. Étape 3 : remettre le focus dans le champ et afficher « Question copiée : modifiez-la ou envoyez-la. »
- Ce que l'agent a proposé comme découpage, ce que j'ai gardé, pourquoi : le découpage en trois étapes de la fiche a été gardé, car chaque comportement peut être vérifié séparément en moins de trente secondes.
- Mon refus écrit : proposition refusée — envoyer automatiquement la question dès le clic. Ce comportement dépasse la demande et empêcherait l'utilisateur de modifier la question ; j'ai demandé une copie dans le champ uniquement.
- Difficulté qui reste : les trois changements sont présents et testés dans Chrome ; faute d'historique initial, ils ont été sauvegardés dans un commit groupé J1-06/J1-07 plutôt que dans trois commits rétroactifs artificiels.

**Journal des décisions.** Une ligne par demande faite à l'agent, de J1-07 à J1-09 (les trois étapes de J1-07, puis la correction de J1-08, puis les six demandes de J1-09) : la demande copiée, le diff relu (fichiers, nombre de lignes, une chose que je n'avais pas demandée ?), le verdict et pourquoi.

| N° | Demande | Diff relu | Verdict et pourquoi |
|---|---|---|---|
| 1 | Ajouter seulement les trois boutons dans `index.html`. | Ajout de `section`, `ul#suggestions` et trois boutons `type="button"`. | Accepté : structure conforme et boutons visibles dans Chrome. |
| 2 | Copier seulement le texte du bouton dans `#message`. | Sélection des boutons et écouteur `click` dans `app.js`. | Accepté : la question est copiée et aucun message n'est envoyé. |
| 3 | Après la copie, focaliser le champ et afficher le statut demandé. | Ajout de `focus()` et de `status.textContent`. | Accepté : focus et statut vérifiés dans Chrome. |
| 4 | Corriger seulement le contraste du contour de focus dans `styles.css`. | Une couleur modifiée (`#e2a83b` → `#8a5a00`) et un test ajouté ; aucun masquage du débordement. | Accepté : contraste mesuré de 2,12:1 avant et 5,93:1 après. |
| 5 | Gérer l'envoi dans `app.js`, refuser le vide et afficher le texte sans HTML. | `submit`, validation, ajout à l'historique et rendu ; aucun `innerHTML`. | Accepté : vide, texte HTML littéral et messages vérifiés dans Chrome. |
| 6 | Créer `brain.js` avec `validateMessage` et `replyTo`, puis le servir. | Nouveau module et deux entrées dans les listes du serveur. | Accepté après 8 contrôles Node ; `brain.js` ne dépend pas du navigateur. |
| 7 | Brancher `brain.js` dans `app.js`. | Imports, validation, réponse et deux entrées `{ role, text }`. | Accepté : scénarios salut, plage et fenêtre vérifiés dans Chrome. |
| 8 | Appliquer la limite 320 et reconnaître `plage` et `fenêtre`. | Constante `MESSAGE_LIMIT`, deux réponses propres et `maxlength="320"`. | Accepté : 320 passe, 321 échoue, les deux mots diffèrent du repli. |
| 9 | Créer `view.js` et y déplacer le rendu. | `renderMessages` crée les `li` ; `app.js` n'utilise pas `createElement`. | Accepté après recherche des responsabilités interdites. |
| 10 | Ajouter la mémoire et le bouton Effacer. | Lecture JSON protégée, sauvegarde, confirmation et suppression de la clé. | Accepté : F5, JSON abîmé, annulation et confirmation de l'effacement vérifiés dans Chrome. |

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [x] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) : revue structure/clavier/écrans effectuée ; 12 tests Chrome finaux couvrent accessibilité, comportements et responsive, auxquels s'ajoutent les tests N0.
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  |---|---|---|
  | Clavier | `styles.css`, contour `:focus-visible` | Contraste calculé à 2,12:1 sur fond blanc, inférieur au seuil 3:1. |
  | Structure | `index.html:25`, `textarea#message` | La limite 320 est dans `maxlength`, mais aucun texte visible ne l'explique à l'utilisateur. |
  | Structure/accessibilité | `index.html:20`, `ul#messages` | Les nouveaux messages ne sont pas une région dynamique ; un lecteur d'écran peut ne pas annoncer la réponse ajoutée. |

- La revue adverse : (1) « risque de débordement du mot long », `styles.css` et `#messages` : faux, mesure égale à 0 à 360, 768 et 1280 px ; (2) « focus peu contrasté », `styles.css:126-129` : vrai, 2,12:1 avant correction ; (3) « nouvelles réponses non annoncées comme région dynamique », `index.html:20` : vrai à la lecture du DOM, car la liste n'a pas `aria-live`.
- Le défaut corrigé : avant, `#e2a83b` donnait 2,12:1 sur blanc ; demande ciblée : « Dans `styles.css` seulement, remplace la couleur du contour de focus par une couleur atteignant au moins 3:1, sans modifier sa taille ni masquer le débordement, puis arrête-toi. » Diff relu : une couleur CSS remplacée, plus un test de contraste séparé ; après, `#8a5a00` donne 5,93:1. Le même test Chrome passe.
- Difficulté qui reste : les deux autres défauts sont documentés mais non corrigés, conformément à la consigne qui demandait une seule correction.

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [x] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») : tests Chrome effectués le 8 octobre 2026 : vide refusé avec focus ; `<b>gras</b>` affiché littéralement ; `SALUT`, `plage` et `FENÊTRE` reconnus ; suggestion copiée sans envoi ; F5 conserve la conversation ; JSON abîmé récupéré ; Effacer annulé puis confirmé, mémoire vide même après F5. La limite 320/321 est couverte par `npm test`.
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` : orchestre le formulaire, les suggestions, l'historique et la mémoire du navigateur.
  - `brain.js` : valide les messages et choisit une réponse sans dépendre de la page.
  - `view.js` : transforme le tableau de messages en éléments `li` affichés en texte.
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire : la conversation repart vide, la valeur illisible est supprimée et le statut affiche « La mémoire était illisible : la conversation repart vide. »
- Difficulté qui reste : la passerelle dsh répond 402 ; les comportements, eux, sont vérifiés par Chrome et Node.

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [ ] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) : `npm test` vert avec 16 tests au total : 7 tests de `brain.js` et 9 tests serveur ; 19 tests Chrome verts. Historique Git publié sur `https://github.com/Agbadogbe/b04-refuge-animaux`. Explication et remise au formateur encore à faire.
- Le test rouge : « accepte 320 caractères et refuse 321 caractères ». Après avoir changé volontairement la limite de 320 à 330, le message était `AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: true !== false`, à `tests/brain.test.js:16`. Cela prouve que le test détecte réellement une limite trop élevée. La limite a été restaurée à 320 et les 16 tests sont redevenus verts.
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer : à compléter après le passage oral avec le formateur.
  - Ce que mon binôme n'a pas su expliquer : sans objet, travail individuel.
- Difficulté qui reste : passage oral et remise du lien au formateur.

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ? `textContent` affiche exactement le message saisi sans interpréter des balises. Ainsi `<b>gras</b>` reste du texte et ne peut pas injecter du HTML ou du JavaScript.
2. Pourquoi trois fichiers plutôt qu'un seul ? `brain.js` contient les règles testables sans navigateur, `view.js` affiche la conversation et `app.js` relie les événements, la mémoire et les deux modules. Chaque responsabilité se vérifie et se modifie séparément.
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ? Les 16 tests Node et les 19 tests Chrome vérifient le contrat. Le test de limite a été vu rouge après le passage volontaire de 320 à 330 (`true !== false`), puis vert après restauration.
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ? J'ai surtout utilisé les petits pas et les contrôles reproductibles. J'ai oublié au début de demander un plan avant certaines modifications, puis je l'ai noté dans le carnet.

## Aides utilisées

- Indices, aide-mémoire, voisins : fiches des checkpoints, aide-mémoire HTML/CSS et JavaScript, notice dsh. Travail individuel, donc les contre-vérifications ont été automatisées dans un second contexte Chrome.
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse : génération des versions N0 et des modules de Cap Web ; vérification par lecture des fichiers, tests Node, tests Chrome, mesures responsive et contraste du focus.

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom : Imhotep KAKPO (groupe b04, travail individuel)
- Ce que j'ai compris : séparer les responsabilités, refuser le HTML injecté, appliquer une limite, utiliser `localStorage` avec `try/catch`, lire un diff et vérifier une modification par un test qui peut échouer.
- Ce que je n'ai pas encore compris : la cause interne de l'erreur 402 de la passerelle dsh, qui dépend du service de formation.

- Nom : sans second membre dans le groupe.
- Ce que j'ai compris : sans objet.
- Ce que je n'ai pas encore compris : sans objet.

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
