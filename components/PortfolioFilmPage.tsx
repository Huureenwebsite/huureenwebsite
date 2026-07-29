import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SitePreview from "@/components/SitePreview";
import ShowcaseFilm from "@/components/ShowcaseFilm";
import { showcaseFilms, heroPoster } from "@/lib/showcase-films";
import { echteCases } from "@/lib/projecten";
import { ArrowRight, Check, Info } from "@/components/icons";

const proces = [
  {
    n: "01",
    titel: "Intake & kans",
    tekst:
      "Niet de techniek staat voorop, maar wat jouw beste klant wil kopen. Doelgroep, kernbezwaar en gewenste aanvraag eerst.",
  },
  {
    n: "02",
    titel: "Ontwerp & regie",
    tekst:
      "We ontwerpen een eigen huisstijl en, waar het past, een scroll-film: één vast camerastandpunt en jouw echte werkvolgorde als sleutelbeelden.",
  },
  {
    n: "03",
    titel: "Bouw",
    tekst:
      "Razendsnelle, mobielvriendelijke code. Diensten, werkwijze, reviews, FAQ en een werkend formulier — desktop en mobiel op de juiste beeldtier.",
  },
  {
    n: "04",
    titel: "Live & onderhoud",
    tekst:
      "Binnen twee weken online en vindbaar in Google. Daarna houden wij alles in topconditie, voor één vast bedrag per maand.",
  },
];

export default function PortfolioFilmPage() {
  return (
    <div className="filmpage">
      <section className="filmpage-hero">
        <div className="filmpage-hero-media" aria-hidden="true">
          <img src={heroPoster} alt="" fetchPriority="high" />
        </div>
        <div className="container filmpage-hero-inner">
          <p className="filmpage-kicker">Portfolio</p>
          <h1>
            Live voor klanten.
            <br />
            En wat we verder kunnen.
          </h1>
          <p className="filmpage-lead">
            Echte websites die elke dag draaien voor ondernemers door heel
            Nederland — plus onze signature scroll-film, waarmee we laten zien hoe
            ver we voor een branche durven te gaan.
          </p>
          <div className="hero-cta">
            <Link href="#klanten" className="btn btn-primary">
              Bekijk klantcases <ArrowRight size={17} />
            </Link>
            <Link href="#films" className="btn filmpage-hero-ghost">
              Signature scroll-film
            </Link>
          </div>
          <ul className="filmpage-hero-stats">
            <li>
              <strong>Live</strong> klantcases online
            </li>
            <li>
              <strong>{showcaseFilms.length}</strong> signature concepten
            </li>
            <li>
              <strong>±2 wk</strong> van intake tot live
            </li>
          </ul>
        </div>
      </section>

      {/* ECHTE KLANTEN — meteen na de hero, prominent */}
      <section className="filmpage-clients" id="klanten">
        <div className="container">
          <div className="filmpage-head">
            <div>
              <p className="filmpage-kicker is-green">
                <Check size={15} /> Klantcases
              </p>
              <h2>Een greep uit ons werk.</h2>
            </div>
            <p>
              Een selectie van websites die we voor ondernemers bouwden. Geen
              mockups: elke site hieronder staat live — bekijk de preview of open
              de volledige case.
            </p>
          </div>

          <div className="clients-grid">
            {echteCases.map((c) => (
              <article className="client-card" key={c.slug}>
                <Link
                  href={`/portfolio/${c.slug}`}
                  className="client-card-preview"
                  aria-label={`Bekijk de case van ${c.naam}`}
                >
                  <SitePreview
                    url={c.liveUrl}
                    naam={c.naam}
                    kleur={c.kleur}
                    accent={c.accent}
                    ratio={0.62}
                  />
                  <span className="client-card-live">
                    <span className="client-card-live-dot" /> Live
                  </span>
                </Link>
                <div className="client-card-body">
                  <p className="client-card-sector">
                    {c.sector}
                    {c.plaats ? ` · ${c.plaats}` : ""}
                  </p>
                  <h3>{c.naam}</h3>
                  <p className="client-card-kort">{c.kort}</p>
                  <div className="client-card-links">
                    <Link href={`/portfolio/${c.slug}`} className="client-card-case">
                      Bekijk de case <ArrowRight size={15} />
                    </Link>
                    {c.liveUrl && (
                      <a
                        href={c.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="client-card-live-link"
                      >
                        Live site
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE CONCEPT-SHOWCASES */}
      <section className="filmpage-films" id="films">
        <div className="container">
          <div className="filmpage-head">
            <div>
              <p className="filmpage-kicker is-dark">Signature scroll-film</p>
              <h2>Wat we verder kunnen: concept-showcases.</h2>
            </div>
            <p>
              Vier eigen conceptwebsites met onze scroll-filmtechniek. Klik een
              film om hem te laden en af te spelen — zo blijft de pagina licht.
              Daarna scrub je er zelf doorheen.
            </p>
          </div>

          <div className="filmpage-disclaimer">
            <Info size={19} />
            <p>
              <strong>Eerlijk over dit deel.</strong> Dit zijn conceptwebsites die
              we zelf ontwikkelden om onze techniek te tonen. De merknamen zijn
              fictief; deze voorbeelden vertegenwoordigen geen echte klanten of
              klantresultaten — anders dan de klantcases hierboven.
            </p>
          </div>

          <div className="film-list">
            {showcaseFilms.map((film, i) => (
              <ShowcaseFilm key={film.id} film={film} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section className="filmpage-proces">
        <div className="container filmpage-proces-grid">
          <div className="filmpage-proces-intro">
            <p className="filmpage-kicker is-dark">Zo werken we</p>
            <h2>Van eerste gesprek tot live.</h2>
            <p>
              Dezelfde aanpak voor een strakke huurwebsite én voor een Signature
              scroll-film. Jij vertelt over je bedrijf, wij maken het compleet af.
            </p>
            <Link href="/contact" className="filmpage-proces-link">
              Plan een gratis adviesgesprek <ArrowRight size={17} />
            </Link>
          </div>
          <ol className="filmpage-proces-list">
            {proces.map((s) => (
              <li key={s.n} data-reveal>
                <span className="filmpage-proces-num">{s.n}</span>
                <div>
                  <h3>{s.titel}</h3>
                  <p>{s.tekst}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        titel="Wil je zulk werk voor jouw bedrijf?"
        tekst="Vertel ons over je beste dienst. In een vrijblijvend adviesgesprek bepalen we of een strakke huurwebsite of een Signature scroll-film het sterkste verhaal vertelt."
        knop="Plan een gratis adviesgesprek"
      />
    </div>
  );
}
