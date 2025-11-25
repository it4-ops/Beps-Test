import { Review } from '../types';

export const generateMockReviews = (brandName: string): string => {
  // Simulates a CSV or raw text dump of reviews from various Italian cities
  const rawReviews = [
    `[Milano] ${brandName} è fantastico, il personale è molto preparato. Ho comprato un laptop ed è stato tutto perfetto. 5/5`,
    `[Roma - Centro] Purtroppo l'attesa alle casse è interminabile. 20 minuti di fila per pagare un cavo. 2/5`,
    `[Napoli] Ottimi prezzi, ma il negozio è un po' disordinato. Personale gentile però. 4/5`,
    `[Torino] Non rispondono mai al telefono. Il servizio clienti è inesistente. Ho avuto un problema con la garanzia. 1/5`,
    `[Bologna] Negozio pulito e moderno. Mi piace la possibilità di ordinare online e ritirare in negozio. 5/5`,
    `[Firenze] I commessi sembrano stanchi e poco motivati. Peccato perché la posizione è ottima. 3/5`,
    `[Palermo] Finalmente un punto vendita fornito! Ho trovato tutto quello che cercavo. Parcheggio comodo. 5/5`,
    `[Bari] L'aria condizionata era rotta in pieno agosto. Impossibile stare dentro. 1/5`,
    `[Milano - Duomo] Troppa folla, ma i ragazzi fanno del loro meglio. Prezzi un po' alti rispetto all'online. 3/5`,
    `[Genova] Personale sgarbato al reparto telefonia. Non ci tornerò. 1/5`,
    `[Verona] Ottima esperienza di acquisto. Il manager ha risolto un mio problema in 5 minuti. Bravi! 5/5`,
    `[Roma - Eur] Parcheggio inesistente, è un incubo arrivarci. Ma il negozio è grande. 3/5`,
    `[Venezia] Prezzi troppo alti per i turisti? Sembrava tutto rincarato. 2/5`,
    `[Catania] Servizio post-vendita eccellente. Mi hanno cambiato il prodotto difettoso subito. 5/5`,
    `[Trieste] Negozio piccolo e con poca scelta rispetto ad altri della stessa catena. 3/5`
  ];

  return rawReviews.join('\n');
};