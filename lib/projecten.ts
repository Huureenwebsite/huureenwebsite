export type Project = {
  slug: string;
  naam: string;
  type: string;
  plaats: string;
  sector: string;
  kleur: string; // primaire huisstijlkleur van de klant
  accent: string; // accentkleur
  liveUrl?: string; // live website (leeg = nog geen publieke link)
  kort: string; // één zin voor de overzichtskaart
  echt: boolean; // true = echte case met detailpagina, false = placeholder
  // Detailpagina-velden (alleen voor echte cases):
  intro?: string;
  uitdaging?: string;
  aanpak?: string;
  resultaat?: string;
  diensten?: string[];
};

export const projecten: Project[] = [
  {
    slug: "jvb-bouw",
    naam: "JvB Bouw",
    type: "Bedrijfswebsite · Maatwerk",
    plaats: "Aalsmeer",
    sector: "Bouw, verbouwing & renovatie",
    kleur: "#3B5B7A", // staalblauw
    accent: "#C2A06B", // messing
    liveUrl: "https://www.jvbbouw.nl",
    kort: "Van een verouderde, oranje site naar een strakke, razendsnelle bouwwebsite met eigen CMS.",
    echt: true,
    intro:
      "JvB Bouw uit Aalsmeer is een aannemersbedrijf voor verbouwing, renovatie en onderhoud. De oude website deed het bedrijf tekort: gedateerd, niet mobielvriendelijk en traag. Wij bouwden een compleet nieuwe site die net zo verzorgd is als hun vakwerk.",
    uitdaging:
      "De bestaande website was oranje, niet responsive en oogde verouderd. Potentiële klanten haakten af nog voordat ze het vakmanschap zagen. Er was geen manier om zelf teksten of projecten bij te werken, en de site was nauwelijks vindbaar in de regio.",
    aanpak:
      "We ontwierpen een eigen, rustige huisstijl (staalblauw en messing, geïnspireerd op bouwtekeningen) en bouwden de site met moderne, razendsnelle techniek. Inclusief een eenvoudig CMS zodat JvB zelf teksten, projecten en reviews kan beheren, een contactformulier dat direct in de mailbox binnenkomt, en lokale SEO voor de hele werkregio.",
    resultaat:
      "Een professionele, mobielvriendelijke website die in seconden laadt en JvB Bouw serieus neerzet. Vindbaar op lokale zoektermen in Aalsmeer, Uithoorn, Amstelveen en Mijdrecht, met alle content in eigen beheer.",
    diensten: [
      "Maatwerk ontwerp & huisstijl",
      "Development (razendsnel)",
      "Eenvoudig CMS",
      "Contactformulier",
      "Lokale SEO",
      "Hosting & onderhoud",
    ],
  },
  {
    slug: "ninos-barber",
    naam: "Nino's Barber",
    type: "Bedrijfswebsite · Maatwerk",
    plaats: "Amstelveen",
    sector: "Barbershop & herenkapper",
    kleur: "#1B1A18", // diep charcoal
    accent: "#C99A3F", // warm goud
    liveUrl: "https://www.ninosbarber.nl",
    kort: "Een stoere, razendsnelle barbershop-site met fotogalerij en afspraken maken via WhatsApp.",
    echt: true,
    intro:
      "Nino's Barber is een barbershop en herenkapper in Amstelveen, gespecialiseerd in strak knippen, fades en baardwerk. Nino wilde een website die net zo verzorgd oogt als zijn werk in de stoel, en waarmee klanten in een paar tikken een afspraak maken.",
    uitdaging:
      "Nino had nog geen eigen website en werd vooral gevonden via social media. Nieuwe klanten konden zijn werk, prijzen en openingstijden nergens rustig bekijken, en het maken van een afspraak verliep versnipperd. Er was behoefte aan één professionele plek die de sfeer van de shop uitstraalt en het boeken simpel maakt.",
    aanpak:
      "We ontwierpen een stoere, moderne huisstijl in diep charcoal met een warm goud accent, passend bij een barbershop. De site is mobiel-first en razendsnel, met een duidelijk overzicht van diensten en prijzen, een fotogalerij met zijn werk, klantreviews en de openingstijden. Afspraken maken gaat direct via een opvallende WhatsApp-knop, precies zoals Nino werkt.",
    resultaat:
      "Een strakke, snelle website die Nino's Barber professioneel neerzet en nieuwe klanten meteen laat zien wat ze kunnen verwachten. Vindbaar op lokale zoektermen in Amstelveen, met afspraken die vlot binnenkomen via WhatsApp.",
    diensten: [
      "Maatwerk ontwerp & huisstijl",
      "Development (razendsnel)",
      "Afspraken via WhatsApp",
      "Fotogalerij",
      "Lokale SEO",
      "Hosting & onderhoud",
    ],
  },
  {
    slug: "chiropractie-ceintuurbaan",
    naam: "Chiropractie Ceintuurbaan",
    type: "Praktijkwebsite · Maatwerk",
    plaats: "Amsterdam",
    sector: "Chiropractie & gezondheidszorg",
    kleur: "#0E7C86", // rustig teal
    accent: "#16824F", // helend groen
    // Tijdelijke Vercel-URL van de nieuwe site; wordt chiropractieceintuurbaan.nl zodra het domein overgaat.
    liveUrl: "https://chiropractor-five.vercel.app",
    kort: "Een rustige, vertrouwenwekkende praktijksite met online afspraken en heldere info per klacht.",
    echt: true,
    intro:
      "Chiropractie Ceintuurbaan is een chiropractiepraktijk in hartje De Pijp in Amsterdam. De praktijk wilde een frisse, professionele website die het vakmanschap en de evidence-based aanpak laat zien, en waarmee patiënten eenvoudig online een afspraak maken.",
    uitdaging:
      "De bestaande website was verouderd: gedateerd design, dubbele content en al jaren niet meer bijgewerkt. Voor een zorgpraktijk waar vertrouwen alles is, deed dat afbreuk aan de professionele indruk. Bezoekers konden lastig terugvinden met welke klachten ze terecht kunnen, wat de behandeling inhoudt en wat de tarieven zijn.",
    aanpak:
      "We ontwierpen een rustige, klinische maar warme huisstijl die vertrouwen uitstraalt: veel witruimte, rustgevende kleuren en ruime, goed leesbare typografie voor een bredere doelgroep. De site is mobiel-first en snel, met heldere pagina's per klacht, uitleg over de behandelmethoden (waaronder de Cox-decompressietechniek), transparante tarieven en de kwaliteitswaarborg. Online afspraken maken gaat direct via het bestaande boekingssysteem.",
    resultaat:
      "Een verzorgde, snelle praktijkwebsite die Chiropractie Ceintuurbaan professioneel neerzet en patiënten vertrouwen geeft. Beter vindbaar op lokale zoektermen in Amsterdam, met een duidelijke route naar het maken van een afspraak.",
    diensten: [
      "Maatwerk ontwerp & huisstijl",
      "Development (razendsnel)",
      "Online afspraken maken",
      "Pagina's per klacht (SEO)",
      "Lokale SEO",
      "Hosting & onderhoud",
    ],
  },
  {
    slug: "",
    naam: "[Projectnaam 4]",
    type: "Website · Maatwerk",
    plaats: "",
    sector: "",
    kleur: "#8b5cf6",
    accent: "#7c3aed",
    kort: "Binnenkort: een nieuwe case.",
    echt: false,
  },
];

export const echteCases = projecten.filter((p) => p.echt);
