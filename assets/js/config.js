/* =====================================================================
   RÉGLAGES DU TUNNEL
   C'est le seul fichier à modifier. Les boutons, les prix et les liens
   de contact des deux pages (index.html et obrigado.html) viennent d'ici.
   Gardez les guillemets "..." autour de chaque valeur.
   ===================================================================== */

window.FUNNEL_CONFIG = {
  /* Lien de paiement de tous les boutons « Obter o livro ».
     Vide = les boutons mènent à l'encadré de l'offre. */
  checkoutUrl: "https://xzjdbavw.mychariow.co/prd_fytf63qy/checkout",

  /* Prix affichés, en dollars. Le visiteur peut payer dans sa monnaie. */
  price: "7 USD",
  oldPrice: "11 USD",
  discount: "-40%",

  /* Compte à rebours : repart tout seul toutes les `offerHours` heures,
     à partir de `offerStart`. Tous les visiteurs voient le même temps. */
  offerHours: 48,
  offerStart: "2026-10-11T00:00:00+01:00",

  /* Service client. Les boutons WhatsApp ouvrent une discussion avec ce numéro,
     qui n'est jamais écrit sur la page. */
  whatsappNumber: "243823226790",           // format international, chiffres seulement
  email: "libraryonline65@gmail.com",

  /* Autres liens */
  booklineUrl: "https://bookline.digital",
  englishEditionUrl: "https://biblemessages.bookline.digital",
  frenchEditionUrl: "https://livresenligne.mychariow.shop/prd_b77u61",
  upsellUrl: "https://livresenligne.mychariow.shop/prd_ieom7w6g",

  /* Pixel Meta (Facebook). La page de vente envoie PageView et ViewContent,
     puis AddToCart au clic sur un bouton d'achat. Le paiement et l'achat sont
     comptés par la boutique quand le même pixel y est réglé : la page de
     remerciement n'envoie l'achat que si sendPurchase vaut true. */
  productName: "Como Preparar Mensagens Bíblicas",
  metaPixelId: "3681099995362477",
  sendPurchase: false,
  purchaseValue: 6.7,
  purchaseCurrency: "USD"
};
