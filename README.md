# Tunnel de vente · Como Preparar Mensagens Bíblicas

Tunnel de vente en portugais (Portugal) pour le livre *Como Preparar Mensagens Bíblicas* de James Braga. C'est la traduction du tunnel anglais *How to Prepare Bible Messages* (https://biblemessages.bookline.digital), avec les couleurs de la couverture portugaise.

**Adresse du site : https://mensagensbiblicas.bookline.digital** (Hostinger). C'est le lien à mettre dans les publicités.

## Le parcours du client

1. **`index.html`** : la page de vente. Chaque bouton « Obter o livro » mène au paiement.
2. **Paiement** : Mobile Money ou carte, dans la monnaie du client. La boutique livre le PDF.
3. **`obrigado.html`** : la page de remerciement. Elle donne les étapes de téléchargement, l'aide WhatsApp, une recommandation (*Homilética: Como Pregar com Eficácia*) et un lien vers bookline.digital.

En bas de la page de vente, la section **« Como pagar? »** montre en vidéo (53 secondes) comment payer, étape par étape, avec un bouton d'achat, un bouton d'aide WhatsApp et les étapes par écrit pour ceux qui préfèrent lire. La section « Não sabe como pagar? » et la FAQ y renvoient.

## Lien de paiement et page de remerciement

- **Lien de paiement** (`checkoutUrl` dans `assets/js/config.js`) : `https://xzjdbavw.mychariow.co/prd_fytf63qy/checkout`. Tous les boutons « Obter o livro » y mènent.
- **Prix affichés** : `7 USD` au lieu de `11 USD` (-40 %). Gardez-les en accord avec le prix du produit dans la boutique (`price`, `oldPrice`, `discount`).
- **Page de remerciement** : dans la boutique, collez `https://mensagensbiblicas.bookline.digital/obrigado.html` comme redirection après achat.

## Réglages

Tout se règle dans **`assets/js/config.js`** :

| Réglage | Valeur actuelle |
| --- | --- |
| `checkoutUrl` | `https://xzjdbavw.mychariow.co/prd_fytf63qy/checkout` |
| `price` / `oldPrice` / `discount` | `7 USD` / `11 USD` / `-40%` |
| `offerHours` / `offerStart` | `48` / `2026-10-11T00:00:00+01:00` (même cycle que le tunnel anglais) |
| `whatsappNumber` | `243823226790` (sert aux boutons, jamais écrit sur la page) |
| `upsellUrl` | *Homilética: Como Pregar com Eficácia* |
| `englishEditionUrl` / `frenchEditionUrl` | éditions anglaise et française, citées dans la FAQ |
| `metaPixelId` / `sendPurchase` | `3681099995362477` / `false` |

## Mise en ligne (Hostinger)

Le site est fait de fichiers simples (HTML, CSS, JS, images, vidéo). Hostinger le reçoit sous forme d'archive : `deploy/site.zip`, créée par `python3 deploy/make_archive.py` à partir de `index.html`, `obrigado.html`, `.htaccess` et du dossier `assets`. Après chaque modification : refaire l'archive, l'envoyer sur GitHub, puis Hostinger récupère le dépôt et décompresse l'archive à la racine du site.

## Pixel Facebook

Même pixel que le tunnel anglais. La page envoie `PageView` et `ViewContent`, puis `AddToCart` au clic sur un bouton d'achat. L'achat (`Purchase`) est compté par la boutique quand le même pixel y est réglé : la page de remerciement ne l'envoie que si `sendPurchase` vaut `true`.

## Vidéo « Como pagar? »

- Fichier : `assets/video/como-pagar.mp4` (720 × 1280, 53 secondes, 2 Mo). C'est la vidéo envoyée, compressée pour les petits forfaits internet (5,8 Mo à l'origine), sans perte visible de netteté.
- L'interface de paiement filmée est traduite en portugais (boutons, formulaires, messages de l'opérateur, page de confirmation). Le titre, la description et les pages du livre d'exemple (*Christianisme pour les débutants*, un livre français) restent tels quels.
- Aucun numéro de téléphone n'y est lisible : le numéro WhatsApp de l'étape 11 et le numéro d'exemple tapé aux étapes 2 à 6 sont floutés, ainsi que deux notifications du téléphone (solde du compte, alerte de vente).
- Image d'aperçu : `assets/img/como-pagar-poster.jpg` (l'étape 5, le choix du moyen de paiement).
- La vidéo ne se télécharge que si le visiteur appuie sur lecture : la page reste rapide.
- Pour la changer, remplacez ces deux fichiers en gardant les mêmes noms (vidéo verticale MP4, de préférence moins de 5 Mo), mettez à jour la durée et le poids écrits sous la vidéo dans `index.html` (« Vídeo de 53 segundos · 2 MB ») et augmentez le numéro `?v=2` de leurs deux adresses, pour que les téléphones ne gardent pas l'ancienne version en mémoire.

## Langue

Portugais du Portugal (accord orthographique de 1990) : « telemóvel », « ficheiro », « descarregar », « e-mail », « connosco », guillemets « ». Les versets viennent de la traduction Almeida.

## Fichiers

```
index.html            page de vente
obrigado.html         page de remerciement
assets/js/config.js   réglages (lien, prix, contacts, pixel)
assets/js/main.js     fonctionnement (ne pas modifier)
assets/css/style.css  design (couleurs de la couverture portugaise)
assets/img/           affiches optimisées, image de partage, aperçu de la vidéo
assets/video/         vidéo « comment payer » (MP4, 2 Mo)
.htaccess             réglages serveur pour Hostinger
deploy/make_archive.py  crée deploy/site.zip
deploy/site.zip       archive du site envoyée à Hostinger
```
