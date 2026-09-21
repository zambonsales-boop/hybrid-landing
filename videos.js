// ============================================================
//  VIDEO DELLA LANDING: un solo punto dove collegarli tutti.
//  Incolla il link di ogni video tra le virgolette e salva.
//  Lasciando vuoto "", nella pagina compare il segnaposto.
//
//  Link accettati:
//    Wistia    https://fast.wistia.net/embed/iframe/CODICE   (link "embed", vedi nota sotto)
//    YouTube   https://www.youtube.com/watch?v=XXXX   (anche youtu.be e shorts)
//    Vimeo     https://vimeo.com/123456789
//    File .mp4 diretto (per video leggeri, sotto i ~25 MB)
//
//  NOTA WISTIA: i link "condividi" (…wistia.com/s/xxxx) NON si possono incorporare.
//  Serve il codice del video: da Wistia > video > Embed > il codice dopo "embed/iframe/".
//  Le copertine ("poster") sono le anteprime dei video su Wistia; se vuoi cambiarle,
//  sostituisci il link dell'immagine oppure lascia "" per usare lo sfondo blu.
//
//  ATTENZIONE: i file video pesanti NON vanno caricati su GitHub (limite 100 MB per file).
// ============================================================
window.HYBRID_VIDEOS = {
  // VSL in cima alla pagina (formato orizzontale 16:9)
  vsl: "https://fast.wistia.net/embed/iframe/5cjrzi7lf6",
  vslPoster: "https://embed-ssl.wistia.com/deliveries/5ddb9d437ed2849a841045acb510bc3f.jpg?image_crop_resized=1280x720",

  // Testimonianze, nell'ordine in cui compaiono:
  // 1 Nick Parodi, 2 Angelo Puglisi, 3 Elia, 4 Diffly
  testimonianze: [
    "https://fast.wistia.net/embed/iframe/w1qb5k6n7n", // 1 Nick Parodi
    "https://fast.wistia.net/embed/iframe/eg0ppjed5o", // 2 Angelo Puglisi
    "https://fast.wistia.net/embed/iframe/8fu2cf0oim", // 3 Elia
    "https://fast.wistia.net/embed/iframe/vxa16otywu"  // 4 Diffly
  ],
  testimonianzePoster: [
    "https://embed-ssl.wistia.com/deliveries/9a95bc5d1ed6501c0e2bea5654668ab3.jpg?image_crop_resized=960x624",
    "https://embed-ssl.wistia.com/deliveries/142e4ee00ce272e2d35f8306a96c1492.jpg?image_crop_resized=960x624",
    "https://embed-ssl.wistia.com/deliveries/316b6a96b6299572279baf3a782b13cd.jpg?image_crop_resized=960x624",
    "https://embed-ssl.wistia.com/deliveries/579c23f433292c900fdc3edaf35ad9d0.jpg?image_crop_resized=960x624"
  ],

  // Formato dei riquadri delle testimonianze (larghezza/altezza dei video Wistia)
  formatoTestimonianze: "2940/1912"
};
