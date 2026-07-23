import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SitePreview from "@/components/SitePreview";
import ShowcaseFilm from "@/components/ShowcaseFilm";
import { showcaseFilms, heroPoster } from "@/lib/showcase-films";
import { echteCases } from "@/lib/projecten";
import { ArrowRight, Check, Info } from "@/components/icons";

export const metadata: Metadata = {
  title: "Concept-showcases: de transformatie zelf",
  description:
    "Vier conceptwebsites waarin je de scroll-filmtransformatie zelf ziet afspelen — geen slider, maar de echte beeldsequentie. Plus ons proces en echte klantcases.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/portfolio-film" },
};

const proces = [
  {
    n: "01",
    titel: "Intake & kans",
    tekst:
      "Niet de animatie staat voorop, maar de verandering die jouw beste klant wil kopen. Doelgroep, kernbezwaar en gewenste aanvraag eerst.",
  },
  {
    n: "02",
    titel: "AI-regie & storyboard",
    tekst:
      "We kiezen één vast camerastandpunt en zetten jouw echte werkvolgorde om in 6–11 sleutelbeelden. Jij keurt die goed vóór de filmproductie.",
  },
  {
    n: "03",
    titel: "Bouw & scroll-film",
    tekst:
      "De beelden worden geanimeerd, opgeschaald en frame voor frame in een snelle website gebouwd. Desktop en mobiel krijgen elk de juiste beeldtier.",
  },
  {
    n: "04",
    titel: "Live & leren",
    tekst:
      "Na performance-, toegankelijkheids- en mobiele tests gaat de site live. Daarna meten we echte aandacht en aanvragen — geen verzonnen succesclaims.",
  },
];

export default function PortfolioFilm() {
  return (
    <div className="filmpage">
      <section className="filmpage-hero">
        <div className="filmpage-hero-media" aria-hidden="true">
          <img src={heroPoster} alt="" fetchPriority="high" />
        </div>
        <div className="container filmpage-hero-inner">
          <p className="filmpage-kicker">Concept-showcases · Signature scroll-film</p>
          <h1>
            Zie de transformatie
            <br />
            gebeuren.
          </h1>
          <p className="filmpage-lead">
            Geen slider tussen begin en eind. Klik een voorbeeld aan en de échte,
            vloeiende transformatiefilm speelt af — daarna scrub je er zelf
            doorheen. Precies de techniek die we voor jouw vak inzetten.
          </p>
          <div className="hero-cta">
            <Link href="#films" className="btn btn-primary">
              Bekijk de 4 films <ArrowRight size={17} />
            </Link>
            <Link href="/contact" className="btn filmpage-hero-ghost">
              Bespreek jouw verhaal
            </Link>
          </div>
          <p className="filmpage-disclosure">
            <Info size={17} /> Eigen conceptwerk met fictieve merknamen — geen
            klantcases.
          </p>
        </div>
      </section>

      <section className="filmpage-films" id="films">
        <div className="container">
          <div className="filmpage-head">
            <div>
              <p className="filmpage-kicker is-dark">Vier niches. Eén regieprincipe.</p>
              <h2>De film ís het portfolio.</h2>
            </div>
            <p>
              Klik op een film om hem te laden en af te spelen — zo blijft de
              pagina licht. Daarna bepaal jij het tempo: sleep de tijdbalk, of
              beweeg op desktop gewoon over het beeld.
            </p>
          </div>

          <div className="filmpage-disclaimer">
            <Info size={19} />
            <p>
              <strong>Eerlijk over het werk.</strong> Dit zijn conceptwebsites die
              we zelf ontwikkelden om onze aanpak en techniek te tonen. De
              merknamen zijn fictief; de voorbeelden vertegenwoordigen geen echte
              klanten of klantresultaten.
            </p>
          </div>

          <div className="film-list">
            {showcaseFilms.map((film, i) => (
              <ShowcaseFilm key={film.id} film={film} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="filmpage-proces">
        <div className="container filmpage-proces-grid">
          <div className="filmpage-proces-intro">
            <p className="filmpage-kicker is-dark">Zo maken we jouw site</p>
            <h2>Voor de film komt de regie.</h2>
            <p>
              AI versnelt de productie. Het overtuigende deel blijft mensenwerk: de
              juiste belofte kiezen, jouw werkwijze begrijpen en elk beeld
              doelgericht laten bijdragen aan de aanvraag.
            </p>
            <Link href="/contact" className="filmpage-proces-link">
              Leg jouw transformatie aan ons voor <ArrowRight size={17} />
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

      <section className="filmpage-clients">
        <div className="container">
          <div className="filmpage-head is-light">
            <div>
              <p className="filmpage-kicker is-dark">Daarnaast: echt klantwerk</p>
              <h2>Gebouwd voor ondernemers.</h2>
            </div>
            <p>
              Hier staan wél echte klanten. Bewust apart van de concepten, zodat
              altijd duidelijk blijft welk bewijs je bekijkt.
            </p>
          </div>
          <div className="filmpage-clients-grid">
            {echteCases.map((c) => (
              <article className="filmpage-client" key={c.slug} data-reveal>
                <div className="filmpage-client-preview">
                  <SitePreview
                    url={c.liveUrl}
                    naam={c.naam}
                    kleur={c.kleur}
                    accent={c.accent}
                    ratio={0.56}
                  />
                </div>
                <p className="filmpage-client-label">
                  <Check size={14} /> Echte klantcase
                </p>
                <h3>{c.naam}</h3>
                <p>{c.kort}</p>
                <Link href={`/portfolio/${c.slug}`}>
                  Bekijk de case <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        titel="Welke transformatie moet jouw klant voor zich zien?"
        tekst="Vertel ons over je beste dienst. In een vrijblijvend adviesgesprek bepalen we of een gewone huurwebsite of een Signature scroll-film het sterkste verhaal vertelt."
        knop="Plan een gratis adviesgesprek"
      />
    </div>
  );
}
