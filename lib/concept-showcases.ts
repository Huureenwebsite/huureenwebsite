export type ConceptShowcase = {
  id: string;
  naam: string;
  niche: string;
  tagline: string;
  verhaal: string;
  techniek: string;
  detail: string;
  doorlooptijd: string;
  liveUrl: string;
  beforeImage: string;
  afterImage: string;
};

// Groot sfeerbeeld voor de pagina-hero (nachtfinale van de zwembaden-demo, 2K).
export const portfolioHeroImage = "/showcases/hero-zwembad-nacht.webp";

// De voor/na-beelden staan lokaal in /public/showcases: per concept twee frames
// met exact hetzelfde camerastandpunt (anker + "af"-fase), zodat de slider klopt.
export const conceptShowcases: ConceptShowcase[] = [
  {
    id: "zwembaden",
    naam: "De Zwembadenmaker",
    niche: "Zwembadbouw",
    tagline: "Van leeg gazon tot eerste duik.",
    verhaal:
      "Een onbenutte tuin krijgt laag voor laag een bouwkuip, techniek, terras en water. De beloning komt bij het laatste scrollmoment: het verlichte bad in de avond.",
    techniek: "Locked-camera AI-timelapse",
    detail: "Scroll-gescrubde framesequentie",
    doorlooptijd: "Indicatie 2–3 weken",
    liveUrl: "https://zwembadenmaker.huureenwebsite.nl",
    beforeImage: "/showcases/zwembaden-voor.webp",
    afterImage: "/showcases/zwembaden-na.webp",
  },
  {
    id: "veranda",
    naam: "De Verandameester",
    niche: "Veranda & overkapping",
    tagline: "Van kale gevel tot buitenkamer.",
    verhaal:
      "Een leeg terras wordt zichtbaar opgebouwd: fundering, aluminium constructie, glas en afwerking. In de finale verandert de veranda bij avondlicht in een warme leefruimte.",
    techniek: "AI-bouwfilm + dag-naar-nacht-orbit",
    detail: "145 geoptimaliseerde frames",
    doorlooptijd: "Indicatie 2–3 weken",
    liveUrl: "https://verandameester.huureenwebsite.nl",
    beforeImage: "/showcases/veranda-voor.webp",
    afterImage: "/showcases/veranda-na.webp",
  },
  {
    id: "carwrap",
    naam: "Studio Folie",
    niche: "Carwrap & detailing",
    tagline: "Van moe naar magnetisch.",
    verhaal:
      "Een doffe sportcoupé doorloopt prep, polijsten, wrap en detailing. Terwijl de bezoeker verder scrolt, draait het licht weg en neemt de nieuwe satijnglans het beeld over.",
    techniek: "Studio-orbit + scroll-film",
    detail: "241 geoptimaliseerde frames",
    doorlooptijd: "Indicatie 2–3 weken",
    liveUrl: "https://studiofolie.huureenwebsite.nl",
    beforeImage: "/showcases/carwrap-voor.webp",
    afterImage: "/showcases/carwrap-na.webp",
  },
  {
    id: "hovenier",
    naam: "Arbor & Stone",
    niche: "Hovenier & bestrating",
    tagline: "Van verwilderd naar ontworpen buitenruimte.",
    verhaal:
      "Een verwilderde achtertuin wordt gestript, uitgevlakt en opnieuw opgebouwd tot één samenhangende buitenruimte. Twee tuinscènes laten zien dat dezelfde regie verschillende projecten kan dragen.",
    techniek: "Dubbele tuinscène + scrollytelling",
    detail: "Desktop- en mobiele beeldtier",
    doorlooptijd: "Indicatie 2–3 weken",
    liveUrl: "https://houvenier.huureenwebsite.nl",
    beforeImage: "/showcases/houvenier-voor.webp",
    afterImage: "/showcases/houvenier-na.webp",
  },
];
