// Data voor de "film-first" portfolio: elk concept toont niet twee losse
// eindbeelden maar de échte keyframe-sequentie van de scroll-film. De speler
// (components/ShowcaseFilm.tsx) speelt die frames af — in beeld automatisch één
// keer, daarna zelf te scrubben. Zo zie je de transformatie gebeuren i.p.v. een
// slider tussen begin en eind.
//
// Frames staan in /public/showcases/<id>/f01.webp … fNN.webp (anker → af → orbit
// naar avond). De chapters zijn hoog-over hoofdstukken met een startframe-index,
// zodat de speler een label kan tonen dat met de film meeloopt.

export type FilmChapter = { at: number; label: string };

export type ShowcaseFilm = {
  id: string;
  merk: string;
  niche: string;
  tagline: string;
  verhaal: string;
  techniekLabel: string; // korte technische duiding op de kaart
  doorlooptijd: string;
  liveUrl: string;
  frameDir: string; // pad zonder trailing slash
  frameCount: number;
  chapters: FilmChapter[]; // oplopend op `at`
  accent: string; // niche-accentkleur voor de voortgangsbalk
};

export const heroPoster = "/showcases/hero-zwembad-nacht.webp";

export const showcaseFilms: ShowcaseFilm[] = [
  {
    id: "zwembaden",
    merk: "De Zwembadenmaker",
    niche: "Zwembadbouw",
    tagline: "Van leeg gazon tot avondzwembad.",
    verhaal:
      "Eén vast camerastandpunt, de tuin die zich laag voor laag opbouwt tot een compleet zwembad — en in de laatste beelden gaat de verlichting aan.",
    techniekLabel: "11 keyframes · locked-camera AI-timelapse",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://riverflowsbv.com/zwembaden",
    frameDir: "/showcases/zwembaden",
    frameCount: 11,
    chapters: [
      { at: 0, label: "De lege tuin" },
      { at: 2, label: "De aanleg" },
      { at: 6, label: "Oplevering" },
      { at: 8, label: "Avondlicht" },
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
    techniekLabel: "11 keyframes · dag-naar-nacht-orbit",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://riverflowsbv.com/veranda",
    frameDir: "/showcases/veranda",
    frameCount: 11,
    chapters: [
      { at: 0, label: "Kale gevel" },
      { at: 2, label: "De constructie" },
      { at: 6, label: "Oplevering" },
      { at: 8, label: "Avondlicht" },
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
    techniekLabel: "11 keyframes · studio-orbit",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://riverflowsbv.com/carwrap",
    frameDir: "/showcases/carwrap",
    frameCount: 11,
    chapters: [
      { at: 0, label: "Doffe coupé" },
      { at: 2, label: "Prep & wrap" },
      { at: 6, label: "Detailing" },
      { at: 8, label: "Showtime" },
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
    techniekLabel: "4 fases · vaste-camera transformatie",
    doorlooptijd: "±2 weken van intake tot live",
    liveUrl: "https://riverflowsbv.com/houvenier",
    frameDir: "/showcases/houvenier",
    frameCount: 4,
    chapters: [
      { at: 0, label: "Verwilderd" },
      { at: 1, label: "Gestript" },
      { at: 2, label: "Zandbed" },
      { at: 3, label: "Nieuw terras" },
    ],
    accent: "#6ea63a",
  },
];
