# Preuve J1-05 · dsh

- Binôme : `b04`
- Version : `dsh 0.1.5-rc.2`
- Modèle configuré : `capweb-ia`
- Permission par défaut : `read-only`
- Télémétrie : `DISABLED`
- Dossier de configuration : hors du dépôt, dans `~/dsh-capweb`
- Commande essayée depuis `atelier` : `dsh --profile headless "Reponds uniquement OK"`
- Résultat : la requête atteint la passerelle et le groupe de modèle `capweb-ia`, puis la passerelle répond `402 Billing verification failed`.

Aucune clé, aucun jeton et aucun contenu de `.credentials.yaml` ne sont conservés dans cette preuve ou dans le dépôt. Le blocage `402` dépend du service de formation et doit être signalé au formateur.
