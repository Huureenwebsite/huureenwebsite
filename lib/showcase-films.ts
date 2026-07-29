// Data voor de "film-first" portfolio: elk concept toont de échte, vloeiende
// scroll-filmvideo (de aan elkaar gezette Seedance-bouwsegmenten). De speler
// (components/ShowcaseFilm.tsx) speelt de video af — in beeld automatisch één
// keer, daarna zelf te scrubben. Zo zie je de transformatie vloeiend gebeuren.
//
// Video's + posters staan in /public/films/<id>.mp4 en <id>-poster.webp.
// Chapters hebben een fractie (0..1) van de looptijd, zodat het label met de
// video meeloopt ongeacht de duur.

export type FilmChapter = { at: number; label: string }; // at = fractie 0..1

export type ShowcaseFilm = {
  id: string;
  merk: string;
  niche: string;
  tagline: string;
  verhaal: string;
  techniekLabel: string;
  doorlooptijd: string;
  liveUrl: string; // de volledige scroll-film, live
  video: string;
  poster: string;
  chapters: FilmChapter[]; // oplopend op `at`
  accent: string;
};

export const heroPoster = "/showcases/hero-zwembad-nacht.webp";

export const showcaseFilms: ShowcaseFilm[] = [
  {
    id: "zwembaden",
    merk: "De Zwembadenmaker",
    niche: "Zwembadbouw",
    tagline: "Van leeg gazon tot avondzwembad.",
    verhaal:
      "Eén vast camerastandpunt, de tuin die zich laag voor laag opbouwt tot een compleet zwembad — en in de finale gaat de verlichting aan.",
    techniekLabel: "AI-bouwfilm · locked camera",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://zwembadenmaker.huureenwebsite.nl",
    video: "/films/zwembaden.mp4",
    poster: "/films/zwembaden-poster.webp",
    chapters: [
      { at: 0, label: "De lege tuin" },
      { at: 0.16, label: "De aanleg" },
      { at: 0.55, label: "Oplevering" },
      { at: 0.72, label: "Avondlicht" },
    ],
    accent: "#22c1c8",
  },
  {
    id: "veranda",
    merk: "De Verandameester",
    niche: "Veranda & overkapping",
    tagline: "Van kale gevel tot buitenkamer.",
    verhaal:
      "Een leeg terras krijgt fundering, aluminium constructie, glas en afwerking — en verandert in de finale bij avondlicht in een warme leefruimte.",
    techniekLabel: "AI-bouwfilm · dag-naar-nacht",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://verandameester.huureenwebsite.nl",
    video: "/films/veranda.mp4",
    poster: "/films/veranda-poster.webp",
    chapters: [
      { at: 0, label: "Kale gevel" },
      { at: 0.16, label: "De constructie" },
      { at: 0.62, label: "Oplevering" },
      { at: 0.8, label: "Avondlicht" },
    ],
    accent: "#e0a04a",
  },
  {
    id: "carwrap",
    merk: "Studio Folie",
    niche: "Carwrap & detailing",
    tagline: "Van moe naar magnetisch.",
    verhaal:
      "Een doffe coupé wordt gepolijst, gewrapt en gedetaild. In de laatste beelden draait het licht weg en neemt de satijnglans het beeld over.",
    techniekLabel: "AI-studiofilm · orbit",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://studiofolie.huureenwebsite.nl",
    video: "/films/carwrap.mp4",
    poster: "/films/carwrap-poster.webp",
    chapters: [
      { at: 0, label: "Doffe coupé" },
      { at: 0.16, label: "Prep & wrap" },
      { at: 0.5, label: "Detailing" },
      { at: 0.7, label: "Showtime" },
    ],
    accent: "#c9a227",
  },
  {
    id: "houvenier",
    merk: "Arbor & Stone",
    niche: "Hovenier & bestrating",
    tagline: "Van verwilderd tot verblijfstuin.",
    verhaal:
      "Dezelfde achtertuin in vier fases: verwilderd, gestript, uitgevlakt op een zandbed en opnieuw bestraat tot een strak terras.",
    techniekLabel: "Fase-transformatie · vaste camera",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://houvenier.huureenwebsite.nl",
    video: "/films/houvenier.mp4",
    poster: "/films/houvenier-poster.webp",
    chapters: [
      { at: 0, label: "Verwilderd" },
      { at: 0.26, label: "Gestript" },
      { at: 0.48, label: "Zandbed" },
      { at: 0.7, label: "Nieuw terras" },
    ],
    accent: "#6ea63a",
  },
];
