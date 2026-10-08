# Spécification de Cap Web

1. Quand un message est vide ou ne contient que des espaces, Cap Web le refuse avec un message d'erreur. Vérifié par : test `refuse le vide et les espaces seuls` dans `tests/contrat/brain.contrat.test.js`.

2. Quand un message contient 320 caractères, Cap Web l'accepte ; à 321 caractères, il le refuse et l'erreur cite la limite 320. Vérifié par : test `accepte 320 caractères et refuse 321` dans `tests/contrat/brain.contrat.test.js`.

3. Quand le message contient des espaces autour, Cap Web les retire avant de mesurer sa longueur et avant de répondre. Vérifié par : tests `mesure la longueur après avoir retiré les espaces` et `ignore la casse et les espaces autour` dans `tests/contrat/brain.contrat.test.js`.

4. Quand l'utilisateur écrit `plage` ou `fenêtre`, quelle que soit la casse et avec des espaces autour, Cap Web fournit une réponse propre et différente pour chaque mot. Vérifié par : test `reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour` dans `tests/contrat/brain.contrat.test.js`.

5. Quand l'utilisateur envoie `<b>gras</b>`, Cap Web affiche exactement ce texte, chevrons compris, sans l'interpréter comme du HTML. Vérifié par : test `view.js affiche du texte et ne décide pas des réponses` dans `tests/contrat/brain.contrat.test.js`, puis essai manuel de 30 secondes dans le navigateur.
