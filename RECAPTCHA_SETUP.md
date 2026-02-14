# Configuration Google reCAPTCHA v2

Ce guide explique comment configurer Google reCAPTCHA v2 pour protéger les formulaires de contact contre les bots.

## 1. Créer des clés reCAPTCHA

1. Rendez-vous sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Cliquez sur **"Créer"** ou **"+"** pour ajouter un nouveau site
3. Remplissez le formulaire :
   - **Libellé** : Mindzy (ou le nom de votre choix)
   - **Type de reCAPTCHA** : Sélectionnez **reCAPTCHA v2** > **Case à cocher "Je ne suis pas un robot"**
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
# Google reCAPTCHA v2 keys
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

## 5. Tester le captcha

1. Accédez à un formulaire de contact (Diagnostic Quiz ou Profile Quiz)
2. Remplissez le formulaire
3. Cochez la case "Je ne suis pas un robot"
4. Soumettez le formulaire

Si tout est configuré correctement :
- Le captcha s'affiche
- La validation fonctionne
- Les soumissions sont enregistrées

## Dépannage

### Le captcha ne s'affiche pas
- Vérifiez que `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` est correctement définie
- Vérifiez que le domaine est autorisé dans la console reCAPTCHA
- Regardez la console du navigateur pour les erreurs

### Erreur "reCAPTCHA verification failed"
- Vérifiez que `RECAPTCHA_SECRET_KEY` est correctement définie
- Assurez-vous que la clé secrète correspond à la clé du site
- Vérifiez les logs du serveur pour plus de détails

### Erreur en développement local
- Ajoutez `localhost` dans la liste des domaines autorisés
- Utilisez `http://localhost:3000` dans votre navigateur

## Documentation officielle

Pour plus d'informations :
- [Documentation Google reCAPTCHA](https://developers.google.com/recaptcha/docs/display)
- [FAQ reCAPTCHA](https://developers.google.com/recaptcha/docs/faq)
