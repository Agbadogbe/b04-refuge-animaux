# Carnet de bord · J2

Binôme : b04 · Membre : Imhotep KAKPO (travail individuel) · Nos réglages sont dans `atelier/cahier-personnel.json` : ne pas les recopier ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Imhotep KAKPO | Second membre |
|---|---|---|
| Structure HTML | à l'aise | Sans objet : travail individuel |
| CSS et responsive | à renforcer | Sans objet : travail individuel |
| JavaScript | à renforcer | Sans objet : travail individuel |
| DOM et événements | à renforcer | Sans objet : travail individuel |
| Git | à l'aise | Sans objet : travail individuel |
| Tests | à renforcer | Sans objet : travail individuel |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Membre 1 : Savoir lire un test rouge, trouver sa cause et vérifier ma correction sans modifier le contrat.

Membre 2 : Sans objet : je travaille seul dans le groupe b04.

## R1 · Les tests automatisés

Les tests rouges du départ, et ce que vous en avez fait :

| Test rouge | Cause trouvée (une phrase) | Fichier | Message du commit `fix:` |
|---|---|---|---|
| refuse le vide et les espaces seuls | Le code vérifiait le vide avant de retirer les espaces. | `public/js/brain.js` | `fix: refuser les messages composés uniquement d'espaces` |
| accepte 320 caractères et refuse 321 | La limite était codée en dur à 280 au lieu d'utiliser `LIMITE`. | `public/js/brain.js` | `fix: appliquer la limite personnelle de 320 caractères` |
| mesure la longueur après avoir retiré les espaces | La comparaison avec 280 refusait encore un message valide de 320 caractères après nettoyage. | `public/js/brain.js` | `fix: appliquer la limite personnelle de 320 caractères` |
| ignore la casse et les espaces autour | `replyTo` convertissait en minuscules mais ne retirait pas les espaces. | `public/js/brain.js` | `fix: ignorer la casse et les espaces dans les réponses` |
| reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour | Les mots personnels entourés d'espaces ne correspondaient à aucune clé de `MOTS`. | `public/js/brain.js` | `fix: ignorer la casse et les espaces dans les réponses` |
| répond à une phrase inconnue par un repli distinct | Le repli réutilisait exactement la réponse de `aide`. | `public/js/brain.js` | `fix: distinguer la réponse aux messages inconnus` |
| view.js affiche du texte et ne décide pas des réponses | L'affichage utilisait `innerHTML`, qui interprétait le message comme du HTML. | `public/js/view.js` | `fix: afficher les messages sans injecter de HTML` |

Avec l'agent : je n'ai pas utilisé dsh pour ce round ; j'ai lu les messages des tests, corrigé le code à la main et relu chaque diff.

Pour aller plus loin : `liste` a été renommé en `listeMotsReconnus`, car le nouveau nom indique précisément ce que contient la variable.

Contrôle final : le contrat affiche `pass 15`, la suite complète affiche `pass 49` et les 8 tests navigateur Playwright passent. Dans Chrome, `<b>gras</b>` reste affiché avec ses chevrons ; `PLAGE` et `FENÊTRE` reçoivent chacun leur réponse propre.

## R2 · Documenter le projet

Vos trois documents sont dans `atelier` : `README.md`, `SPEC.md` et `AGENTS.md`. Rien à recopier ici.

Pour aller plus loin, avec l'agent, les demandes du formateur :

| Demande | Ce qu'a fait l'agent | Votre décision | Règle d'`AGENTS.md` concernée (ou ajoutée) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## R3 · Premiers tests unitaires

| À remplir | Votre réponse |
|---|---|
| Fonction tirée | F1 `synonyme(message)` |
| Le rouge vu (message exact) | `SyntaxError: The requested module '../public/js/brain.js' does not provide an export named 'synonyme'` |
| Identifiant du commit `test:` | `1d9297a` |
| Identifiant du commit `feat:` | `63bc78e` |
| Casse volontaire : la ligne changée | Dans `synonyme`, `return texte;` a été remplacé temporairement par `return '';`. |
| Casse volontaire : le test devenu rouge | `C4 : normalise un autre message` avec `'' !== 'météo'` |
| Pour aller plus loin : la deuxième fonction | Non réalisée. |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :

- C1 : `'coucou'`, `'hello'` et `'bonsoir'` donnent `'salut'`.
- C2 : `'help'` et `'sos'` donnent `'aide'`.
- C3 : la casse et les espaces autour ne comptent pas, `'  HELLO '` donne `'salut'`.
- C4 : un autre message revient en minuscules, sans les espaces autour, `'  Météo '` donne `'météo'`.
- C5 : ce qui n'est pas du texte (`undefined`, `null`, `42`) donne `''`, sans erreur.

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | Accepté | `public/js/brain.js`, lignes 18 et 47 à 48 | La description correspond au diff : `merci` reçoit une réponse distincte, la normalisation existante garde la casse et les espaces sans effet, et le nouveau test couvre ces règles. Les 45 tests passent. |
| 2 | Refusé | `tests/contrat/brain.contrat.test.js`, lignes 69, 71 et 86 ; `public/js/brain.js`, ligne 38 | Le patch modifie et affaiblit un contrat protégé en supprimant les espaces des cas testés. `normaliser` ne fait plus `trim()`. Les tests restent verts précisément parce que le contrat a été diminué. |
| 3 | Refusé | `public/js/view.js`, ligne 13 | `createContextualFragment` interprète tout le message utilisateur comme du HTML. Dans Chrome, `<b>gras</b>` perd ses chevrons et devient du gras malgré des tests verts. |

Pour aller plus loin : j'ai corrigé le patch 3 dans `abordage/mon-patch.patch`. `segmenterGras` découpe uniquement la syntaxe `**texte**`, puis `renderMessages` crée des nœuds dont le contenu passe par `textContent` ou `createTextNode`. Les 46 tests passent ; dans Chrome, `**mot**` est en gras mais `<b>gras</b>` reste du texte littéral.

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?

Imhotep : je sais maintenant lire un test rouge, corriger sa cause sans toucher au contrat, écrire un test avant le code et refuser un patch dangereux même lorsque tous ses tests sont verts. La notion « Tests » est passée de « à renforcer » à « à l'aise ».

# Carnet de bord · J3

## Étape 1 · Le troisième mot

Prédiction avant modification : si j'ajoute seulement `adoption` dans `MOTS`, la commande `aide` citera bien le nouveau mot dans la liste, mais annoncera encore « deux mots », car ce nombre est écrit en dur dans la réponse.
