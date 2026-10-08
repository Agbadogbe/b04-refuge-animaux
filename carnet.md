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

- [ ] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) : thème et trois questions renseignés ; page et cahier personnel encore à vérifier avec le formateur.
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ? Oui, il est vide dans `index.html`. La phrase est ajoutée par `public/js/app.js` avec `textContent`.
- Décision prise ensemble : thème provisoire « Refuge pour animaux », consacré à l'adoption, aux visites et aux besoins des animaux.
- Difficulté qui reste : je suis seul dans le groupe ; faire confirmer l'organisation et les modalités de contre-vérification par le formateur.

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [ ] Validé
- Preuve : `essais-n0/chatbot-v1.html` s'ouvre ; le prompt et la première réponse sont collés ci-dessous, en entier, sans donnée personnelle.
- Mon prompt, tel quel : Fais-moi un chatbot sur un refuge pour animaux, pour aider à adopter, visiter le refuge et comprendre les besoins d'un animal, dans une seule page HTML que j'ouvre dans mon navigateur.
- La première réponse du chat (texte et code), telle quelle : Une page HTML autonome a été proposée dans `essais-n0/chatbot-v1.html`. Elle contient sa mise en page, ses styles et son JavaScript dans un seul fichier, sans bibliothèque ni clé d'API.
- Trois lignes d'observation (ce que j'ai vu en utilisant la page) :
  1. À vérifier dans le navigateur : un message sur l'adoption doit recevoir une réponse sur la démarche d'adoption.
  2. À vérifier dans le navigateur : un message sur les visites doit recevoir une réponse invitant à consulter les horaires du refuge.
  3. À vérifier dans le navigateur : un message hors thème doit recevoir la réponse de repli.
- Difficulté qui reste : ouvrir la page, effectuer réellement les trois essais, recopier les observations constatées et coller ici la réponse complète si le formateur exige que le code soit dupliqué dans le carnet.

### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)

- [ ] Validé
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
  - Modification 1 : « Ajoute un bouton Effacer qui vide la conversation. » · `chatbot-v2.html` ajoute le bouton et vide la liste · la phrase d'accueil disparaît aussi après l'effacement · constat à confirmer dans le navigateur.
  - Modification 2 : « Garde la conversation après le rechargement de la page. » · `chatbot-v3.html` enregistre un historique dans `localStorage` · un contenu de mémoire qui n'est pas du JSON peut empêcher le script de démarrer · constat déduit du code, à reproduire dans le navigateur.
  - Modification 3 : « Ajoute trois boutons proposant les questions principales du refuge sans les envoyer automatiquement. » · `chatbot-v4.html` copie la question dans le champ et conserve la mémoire · la lecture de la mémoire abîmée est désormais protégée, mais il faut encore tester les interactions au clavier et à 360 px.
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) : à faire avec un voisin ou le formateur sur `chatbot-v4.html` ; essayer un message vide, 500 caractères, `<b>gras</b>`, deux envois rapides, F5 et une largeur de 360 px.
- Deux phrases de conclusion : La conservation après F5 introduit le risque le plus important, car une mémoire abîmée peut bloquer toute l'interface. Sans reprendre toute la liste de contrôle après chaque changement, ce défaut pourrait passer inaperçu.
- Difficulté qui reste : ouvrir successivement les quatre versions, exécuter toute la liste de contrôle et remplacer les constats provisoires par ce qui a réellement été observé.

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [ ] Validé
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
- Difficulté qui reste : ouvrir A, B et C, effectuer sur chacune les cinq essais demandés, puis confirmer ou corriger les faits comportementaux du tableau.

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [ ] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) : `dsh --version` affiche `0.1.5-rc.2` ; `DSH_HOME=/Users/imhotep/dsh-capweb` ; `DSH_TELEMETRY_MODE=DISABLED` ; `settings.yaml` configure `capweb-ia` et `defaultPreset: read-only` ; les deux fichiers de configuration ont les permissions `-rw-------`.
- La consigne exacte envoyée à l'agent et sa réponse : en attente de la nouvelle clé agent ; aucune requête n'a été envoyée avec les clés exposées.
- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité : à compléter après le premier lancement authentifié.
- Difficulté qui reste : le test headless atteint `capweb-ia`, mais la passerelle répond `402 Billing verification failed` ; le formateur doit corriger le quota ou la facturation avant `dsh web`.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [ ] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : squelette structuré créé ; comparaison avec le prompt vague, essai via dsh et commit encore en attente.
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
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») : à remplir après l'essai vague. Pour le structuré, contrôle statique provisoire : page et quatre identifiants ✔ ; seulement trois fichiers modifiés ✔ ; aucune bibliothèque ni adresse HTTPS ✔ ; test navigateur et `npm test` à confirmer.
- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est à compléter après l'essai vague ; le résultat structuré suit déjà les identifiants, la limite et le critère d'arrêt imposés.
- Difficulté qui reste : J1-05 et l'essai vague sont bloqués par l'absence de fiche d'accès ; lancer les contrôles dans le navigateur, exécuter `npm test` localement et faire le commit soi-même.

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
| 1 | Ajouter seulement les trois boutons dans `index.html`. | Ajout de `section`, `ul#suggestions` et trois boutons `type="button"`. | Provisoirement accepté : structure conforme ; test navigateur et commit à faire. |
| 2 | Copier seulement le texte du bouton dans `#message`. | Sélection des boutons et écouteur `click` dans `app.js`. | Provisoirement accepté : aucun envoi automatique ; test et commit à faire. |
| 3 | Après la copie, focaliser le champ et afficher le statut demandé. | Ajout de `focus()` et de `status.textContent`. | Provisoirement accepté : texte conforme ; test et commit à faire. |
| 4 | | | |
| 5 | Gérer l'envoi dans `app.js`, refuser le vide et afficher le texte sans HTML. | `submit`, validation, ajout à l'historique et rendu ; aucun `innerHTML`. | Contrôle statique accepté ; vérification navigateur à faire. |
| 6 | Créer `brain.js` avec `validateMessage` et `replyTo`, puis le servir. | Nouveau module et deux entrées dans les listes du serveur. | Accepté après 8 contrôles Node ; `brain.js` ne dépend pas du navigateur. |
| 7 | Brancher `brain.js` dans `app.js`. | Imports, validation, réponse et deux entrées `{ role, text }`. | Accepté statiquement ; scénarios navigateur à faire. |
| 8 | Appliquer la limite 320 et reconnaître `plage` et `fenêtre`. | Constante `MESSAGE_LIMIT`, deux réponses propres et `maxlength="320"`. | Accepté : 320 passe, 321 échoue, les deux mots diffèrent du repli. |
| 9 | Créer `view.js` et y déplacer le rendu. | `renderMessages` crée les `li` ; `app.js` n'utilise pas `createElement`. | Accepté après recherche des responsabilités interdites. |
| 10 | Ajouter la mémoire et le bouton Effacer. | Lecture JSON protégée, sauvegarde, confirmation et suppression de la clé. | Contrôle statique accepté ; F5, JSON abîmé et confirmation à tester dans le navigateur. |

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [ ] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) :
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  |---|---|---|
  | | | |
  | | | |
  | | | |

- La revue adverse : trois affirmations de l'agent, la référence qu'il a donnée (fichier, ligne), mon verdict (vrai, faux, rejeté sans référence) et comment j'ai vérifié :
- Le défaut corrigé : l'avant (capture ou valeur), ma demande ciblée (copiée), le diff relu (fichiers, lignes, changement non demandé ?), l'après (même geste, même mesure) :
- Difficulté qui reste :

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [ ] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») : tests Chrome effectués le 8 octobre 2026 : le vide affiche l'erreur et garde le focus ; `<b>gras</b>` apparaît avec ses chevrons ; `SALUT`, `plage` et `FENÊTRE` reçoivent les réponses attendues ; un bouton copie sa question sans l'envoyer ; F5 conserve huit messages ; « Effacer » affiche une confirmation et Annuler conserve tout. La limite 320/321 est couverte par `npm test`. L'acceptation de l'effacement et la mémoire JSON volontairement abîmée restent à vérifier.
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` : orchestre le formulaire, les suggestions, l'historique et la mémoire du navigateur.
  - `brain.js` : valide les messages et choisit une réponse sans dépendre de la page.
  - `view.js` : transforme le tableau de messages en éléments `li` affichés en texte.
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire : à vérifier dans le navigateur ; le code doit repartir avec un historique vide, supprimer la valeur illisible et afficher « La mémoire était illisible : la conversation repart vide. »
- Difficulté qui reste : reproduire les six demandes dans dsh si le formateur l'exige, relire les diffs, tester tous les comportements dans le navigateur et effectuer les commits manuellement.

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [ ] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) : `npm test` vert avec 16 tests au total : 7 tests de `brain.js` et 9 tests serveur. Historique Git organisé par checkpoint et publié le 8 octobre 2026 sur `https://github.com/Agbadogbe/cap-web-b04`. Explication et remise au formateur encore à faire.
- Le test rouge : « accepte 320 caractères et refuse 321 caractères ». Après avoir changé volontairement la limite de 320 à 330, le message était `AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: true !== false`, à `tests/brain.test.js:16`. Cela prouve que le test détecte réellement une limite trop élevée. La limite a été restaurée à 320 et les 16 tests sont redevenus verts.
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer :
  - Ce que mon binôme n'a pas su expliquer :
- Difficulté qui reste :

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ?
2. Pourquoi trois fichiers plutôt qu'un seul ?
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ?
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ?

## Aides utilisées

- Indices, aide-mémoire, voisins :
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse :

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
