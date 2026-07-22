import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ConceptShowcaseStudio from "@/components/ConceptShowcaseStudio";
import SitePreview from "@/components/SitePreview";
import { ArrowRight, Check, Info } from "@/components/icons";
import {
  conceptShowcases,
  portfolioHeroImage,
} from "@/lib/concept-showcases";
import { echteCases } from "@/lib/projecten";

const proces = [
  {
    nummer: "01",
    titel: "Intake & kans",
    tekst:
      "We zoeken niet naar een mooie animatie, maar naar de verandering die jouw beste klant wil kopen. Doelgroep, kernbezwaar en gewenste aanvraag komen eerst.",
    output: "Heldere verhaallijn",
  },
  {
    nummer: "02",
    titel: "AI-regie & storyboard",
    tekst:
      "We kiezen één vast camerastandpunt en zetten jouw echte werkproces om in 6 tot 10 sleutelmomenten. Jij keurt die beelden goed vóór de filmproductie.",
    output: "Goedgekeurde sleutelbeelden",
  },
  {
    nummer: "03",
    titel: "Bouw & scroll-film",
    tekst:
      "De fases worden geanimeerd, opgeschaald en frame voor frame in een snelle website gebouwd. Desktop en mobiel krijgen ieder de juiste beeldkwaliteit.",
    output: "Interactieve productie",
  },
  {
    nummer: "04",
    titel: "Live & leren",
    tekst:
      "Na performance-, toegankelijkheids- en mobiele tests gaat de site live. Vanaf dat moment meten we echte aandacht en aanvragen — geen verzonnen succesclaims.",
    output: "Meetbare website",
  },
];

export default function PortfolioConceptPage() {
  const conceptCount = conceptShowcases.length;

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-hero-media" aria-hidden="true">
          <img src={portfolioHeroImage} alt="" fetchPriority="high" />
        </div>
        <div className="container portfolio-hero-inner">
          <p className="portfolio-kicker">
            Concept-showcases · Signature scroll-film
          </p>
          <h1>Websites die je niet bekijkt, maar beleeft.</h1>
          <p className="portfolio-hero-lead">
            Wij vertalen jouw vakmanschap naar een interactieve transformatie.
            De bezoeker zet iedere fase zelf in beweging — gewoon door te
            scrollen.
          </p>
          <div className="hero-cta">
            <Link href="#concepten" className="btn btn-primary">
              Bekijk {conceptCount} concepten <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="btn portfolio-hero-ghost">
              Bespreek jouw verhaal
            </Link>
          </div>
          <p className="portfolio-hero-disclosure">
            <Info size={17} /> Eigen conceptwerk met fictieve merknamen — geen
            klantcases.
          </p>
        </div>
        <a className="portfolio-scroll-cue" href="#concepten">
          <span /> Scroll naar de regietafel
        </a>
      </section>

      <section className="concept-showcases-section" id="concepten">
        <div className="container">
          <div className="portfolio-section-head">
            <div>
              <p className="portfolio-kicker">
                {conceptCount} signature showcases
              </p>
              <h2>{conceptCount} niches. Eén regieprincipe.</h2>
            </div>
            <p>
              Sleep over het beeld voor de sprong van begin naar eind. Open
              daarna de live demo om de tussenliggende fases zelf af te spelen.
            </p>
          </div>

          <div className="concept-disclaimer">
            <Info size={19} />
            <p>
              <strong>Eerlijk over het werk.</strong> Dit zijn conceptwebsites
              die we zelf ontwikkelden om ons proces en onze techniek te tonen.
              De merknamen zijn fictief; de voorbeelden vertegenwoordigen geen
              echte klanten of klantresultaten.
            </p>
          </div>

          <ConceptShowcaseStudio />
        </div>
      </section>

      <section className="signature-process-section">
        <div className="container signature-process-layout">
          <div className="signature-process-intro">
            <p className="portfolio-kicker is-dark">Zo maken we jouw site</p>
            <h2>Voor de film komt de regie.</h2>
            <p>
              AI versnelt de productie. Het overtuigende deel blijft mensenwerk:
              de juiste belofte kiezen, jouw echte werkwijze begrijpen en ieder
              beeld doelgericht laten bijdragen aan de aanvraag.
            </p>
            <Link href="/contact" className="process-text-link">
              Leg jouw transformatie aan ons voor <ArrowRight size={17} />
            </Link>
          </div>

          <ol className="signature-process-list">
            {proces.map((stap) => (
              <li key={stap.nummer} data-reveal>
                <span className="signature-process-number">{stap.nummer}</span>
                <div>
                  <h3>{stap.titel}</h3>
                  <p>{stap.tekst}</p>
                  <span className="signature-process-output">
                    <Check size={15} /> {stap.output}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="signature-difference-section">
        <div className="container">
          <div className="difference-heading">
            <p className="portfolio-kicker is-dark">Premium waar het telt</p>
            <h2>Niet méér AI. Betere regie.</h2>
            <p>
              Een scroll-film is geen effect over een template. Het is een
              verkoopverhaal dat begint bij wat jouw klant voor zich wil zien.
            </p>
          </div>

          <div className="difference-comparison" data-reveal>
            <div className="difference-column is-template">
              <span>De meeste templates</span>
              <h3>Vertellen wat je doet.</h3>
              <ul>
                <li>Verwisselbare secties en stockbeelden</li>
                <li>Een bezoeker die alleen consumeert</li>
                <li>Techniek als onzichtbare onderlaag</li>
              </ul>
            </div>
            <div className="difference-divider" aria-hidden="true">
              <span>vs</span>
            </div>
            <div className="difference-column is-signature">
              <span>Signature scroll-film</span>
              <h3>Laat voelen wat je verandert.</h3>
              <ul>
                <li>Een storyboard rondom jouw beste dienst</li>
                <li>Een bezoeker die de onthulling bestuurt</li>
                <li>Snelle fallback voor mobiel en minder beweging</li>
              </ul>
            </div>
          </div>
          <p className="difference-note">
            Signature is een premium uitbreiding op Groei of Pro en vooral
            geschikt voor diensten met een sterke vóór/na en een hoge
            opdrachtwaarde.
          </p>
        </div>
      </section>

      <section className="client-work-section">
        <div className="container">
          <div className="portfolio-section-head is-light">
            <div>
              <p className="portfolio-kicker is-dark">
                Daarnaast: echt klantwerk
              </p>
              <h2>Gebouwd voor ondernemers.</h2>
            </div>
            <p>
              Hier staan wél echte klanten. Bewust apart van de concepten,
              zodat altijd duidelijk blijft welk bewijs je bekijkt.
            </p>
          </div>

          <div className="client-work-grid">
            {echteCases.map((clientCase) => (
              <article
                className="client-work-item"
                key={clientCase.slug}
                data-reveal
              >
                <div className="client-work-preview">
                  <SitePreview
                    url={clientCase.liveUrl}
                    naam={clientCase.naam}
                    kleur={clientCase.kleur}
                    accent={clientCase.accent}
                    ratio={0.56}
                  />
                </div>
                <p className="client-work-label">
                  <Check size={14} /> Echte klantcase
                </p>
                <h3>{clientCase.naam}</h3>
                <p>{clientCase.kort}</p>
                <Link href={`/portfolio/${clientCase.slug}`}>
                  Bekijk de case <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        titel="Welke verandering moet jouw klant voor zich zien?"
        tekst="Vertel ons over je beste dienst. In een vrijblijvend adviesgesprek bepalen we of een gewone huurwebsite of een Signature scroll-film het sterkste verhaal vertelt."
        knop="Plan een gratis adviesgesprek"
      />
    </div>
  );
}
