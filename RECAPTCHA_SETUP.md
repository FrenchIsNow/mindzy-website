# Configuration Google reCAPTCHA v3

Ce guide explique comment configurer Google reCAPTCHA v3 pour protéger les formulaires de contact contre les bots. La v3 est invisible — aucune interaction utilisateur requise.

## 1. Créer des clés reCAPTCHA

1. Rendez-vous sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Cliquez sur **"Créer"** ou **"+"** pour ajouter un nouveau site
3. Remplissez le formulaire :
   - **Libellé** : Mindzy (ou le nom de votre choix)
   - **Type de reCAPTCHA** : Sélectionnez **reCAPTCHA v3** (score-based)
   - **Domaines** : Ajoutez vos domaines (sans http://)
     - `mindzy.me`
     - `www.mindzy.me`
     - `localhost` (pour le développement)
   - **Propriétaires** : Ajoutez les adresses email des administrateurs
   - Acceptez les conditions d'utilisation
4. Cliquez sur **"Envoyer"**

## 2. Récupérer les clés

Après la création, vous obtiendrez deux clés :
- **Clé du site** (Site Key) : Clé publique utilisée côté client
- **Clé secrète** (Secret Key) : Clé privée utilisée côté serveur

## 3. Configurer les variables d'environnement

Ajoutez les clés dans votre fichier `.env.local` :

```bash
# Google reCAPTCHA v3 keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=votre_cle_publique_ici
RECAPTCHA_SECRET_KEY=votre_cle_secrete_ici
```

⚠️ **Important** :
- La `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` commence par `NEXT_PUBLIC_` car elle est utilisée côté client
- La `RECAPTCHA_SECRET_KEY` ne doit **JAMAIS** être exposée côté client
- Ne commitez **JAMAIS** le fichier `.env.local` dans Git

## 4. Redémarrer le serveur

Après avoir ajouté les variables d'environnement, redémarrez votre serveur de développement :

```bash
npm run dev
```

## 5. Fonctionnement

reCAPTCHA v3 fonctionne de manière invisible :
- Le script Google est chargé automatiquement au chargement de la page
- Lors de la soumission d'un formulaire, un token est généré en arrière-plan
- Le serveur vérifie le token et reçoit un score de 0.0 (bot) à 1.0 (humain)
- Les soumissions avec un score < 0.5 sont rejetées

## Dépannage

### Erreur "Invalid key type"
- Vous utilisez probablement des clés v2. Créez de nouvelles clés v3 dans la console reCAPTCHA.

### Le formulaire est rejeté pour des utilisateurs légitimes
- Ajustez le seuil de score dans `src/app/api/leads/route.ts` (par défaut : 0.5)

### Erreur en développement local
- Ajoutez `localhost` dans la liste des domaines autorisés

## Documentation officielle

- [Documentation Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3)
- [FAQ reCAPTCHA](https://developers.google.com/recaptcha/docs/faq)
