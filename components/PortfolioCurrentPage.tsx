import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import SitePreview from "@/components/SitePreview";
import { ArrowRight, Check } from "@/components/icons";
import { echteCases, projecten } from "@/lib/projecten";

export default function PortfolioCurrentPage() {
  const placeholders = projecten.filter((project) => !project.echt);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1>Ons werk</h1>
          <p className="lead">
            Elke website die we bouwen is maatwerk: snel, strak en gemaakt om
            klanten op te leveren. Bekijk hieronder echte live previews van
            ons werk.
          </p>
        </div>
      </div>

      <section className="white">
        <div className="container">
          <div className="case-featured-list">
            {echteCases.map((clientCase) => (
              <Link
                key={clientCase.slug}
                href={`/portfolio/${clientCase.slug}`}
                className="case-featured"
                aria-label={`Bekijk de case van ${clientCase.naam}`}
              >
                <div className="case-featured-preview">
                  <SitePreview
                    url={clientCase.liveUrl}
                    naam={clientCase.naam}
                    kleur={clientCase.kleur}
                    accent={clientCase.accent}
                  />
                </div>
                <div
                  className="case-featured-info"
                  style={{
                    background: `linear-gradient(150deg, ${clientCase.kleur}, ${clientCase.accent})`,
                  }}
                >
                  <span className="case-featured-tag">
                    <Check size={15} /> Uitgelichte case
                  </span>
                  <h2>{clientCase.naam}</h2>
                  <p className="case-featured-sector">
                    {clientCase.type}
                    {clientCase.plaats ? ` · ${clientCase.plaats}` : ""}
                  </p>
                  <p className="case-featured-kort">{clientCase.kort}</p>
                  <span className="case-featured-cta">
                    Bekijk de volledige case <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {placeholders.length > 0 ? (
            <>
              <div className="portfolio-more">
                <h2>Meer projecten</h2>
                <p className="sub">
                  We werken continu aan nieuwe websites. Deze cases komen er
                  binnenkort bij.
                </p>
              </div>
              <div className="soon-grid">
                {placeholders.map((project, index) => (
                  <div
                    key={`${project.type}-${index}`}
                    className="soon-card"
                    style={{
                      background: `linear-gradient(150deg, ${project.kleur}, ${project.accent})`,
                    }}
                  >
                    <span className="soon-badge">Binnenkort</span>
                    <div className="soon-browser" aria-hidden="true">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </div>
                    <div className="soon-meta">
                      <h3>{project.type}</h3>
                      <p>Een nieuwe case is in de maak.</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      <CtaBand
        titel="Wil jij hier ook tussen staan?"
        tekst="Plan een gratis adviesgesprek en ontdek wat een professionele website voor jouw bedrijf doet."
      />
    </>
  );
}
