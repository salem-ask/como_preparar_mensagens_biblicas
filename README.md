# Tunnel de vente · Como Preparar Mensagens Bíblicas

Tunnel de vente en portugais (Portugal) pour le livre *Como Preparar Mensagens Bíblicas* de James Braga. C'est la traduction du tunnel anglais *How to Prepare Bible Messages* (https://biblemessages.bookline.digital), avec les couleurs de la couverture portugaise.

## Le parcours du client

1. **`index.html`** : la page de vente. Chaque bouton « Obter o livro » mène au paiement.
2. **Paiement** : Mobile Money ou carte, dans la monnaie du client. La boutique livre le PDF.
3. **`obrigado.html`** : la page de remerciement. Elle donne les étapes de téléchargement, l'aide WhatsApp, le groupe WhatsApp des livres gratuits, une recommandation (*Homilética: Como Pregar com Eficácia*) et un lien vers bookline.digital.

En bas de la page de vente, une section invite les visiteurs qui ne sont pas prêts à acheter à rejoindre le groupe WhatsApp des livres chrétiens gratuits.

## À faire avant la mise en ligne

- **Lien de paiement** : `checkoutUrl` est vide dans `assets/js/config.js`. Tant qu'il est vide, les boutons d'achat mènent à l'encadré de l'offre. Collez-y le lien de paiement du produit portugais.
- **Prix** : `7 USD` au lieu de `11 USD` (-40 %), comme l'édition anglaise. Ajustez `price`, `oldPrice` et `discount` si le prix du produit portugais est différent.
- **Groupe WhatsApp** : c'est le même groupe que pour les tunnels anglais et français. Si vous avez un groupe en portugais, mettez son lien dans `whatsappGroupUrl`.
- **Adresse du site** : une fois le site en ligne, remplacez `assets/img/og-image.jpg` dans la balise `og:image` de `index.html` par l'adresse complète de l'image, pour l'aperçu des liens sur Facebook et WhatsApp.
- **Page de remerciement** : dans la boutique, collez l'adresse de `obrigado.html` comme redirection après achat.

## Réglages

Tout se règle dans **`assets/js/config.js`** :

| Réglage | Valeur actuelle |
| --- | --- |
| `checkoutUrl` | vide (à remplir) |
| `price` / `oldPrice` / `discount` | `7 USD` / `11 USD` / `-40%` |
| `offerHours` / `offerStart` | `48` / `2026-10-11T00:00:00+01:00` (même cycle que le tunnel anglais) |
| `whatsappNumber` | `243823226790` (sert aux boutons, jamais écrit sur la page) |
| `whatsappGroupUrl` | groupe WhatsApp des livres chrétiens gratuits |
| `upsellUrl` | *Homilética: Como Pregar com Eficácia* |
| `englishEditionUrl` / `frenchEditionUrl` | éditions anglaise et française, citées dans la FAQ |
| `metaPixelId` / `sendPurchase` | `3681099995362477` / `false` |

## Pixel Facebook

Même pixel que le tunnel anglais. La page envoie `PageView` et `ViewContent`, puis `AddToCart` au clic sur un bouton d'achat. L'achat (`Purchase`) est compté par la boutique quand le même pixel y est réglé : la page de remerciement ne l'envoie que si `sendPurchase` vaut `true`.

## Langue

Portugais du Portugal (accord orthographique de 1990) : « telemóvel », « ficheiro », « descarregar », « e-mail », « connosco », guillemets « ». Les versets viennent de la traduction Almeida.

## Fichiers

```
index.html            page de vente
obrigado.html         page de remerciement
assets/js/config.js   réglages (lien, prix, contacts, pixel)
assets/js/main.js     fonctionnement (ne pas modifier)
assets/css/style.css  design (couleurs de la couverture portugaise)
assets/img/           affiches optimisées et image de partage
.htaccess             réglages serveur pour Hostinger
```
