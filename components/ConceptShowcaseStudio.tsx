"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { conceptShowcases } from "@/lib/concept-showcases";

const DEFAULT_REVEAL = 52;

export default function ConceptShowcaseStudio() {
  const [activeId, setActiveId] = useState(conceptShowcases[0].id);
  const [reveal, setReveal] = useState(DEFAULT_REVEAL);
  const active =
    conceptShowcases.find((showcase) => showcase.id === activeId) ??
    conceptShowcases[0];

  function selectShowcase(id: string) {
    setActiveId(id);
    setReveal(DEFAULT_REVEAL);
  }

  return (
    <div className="showcase-studio">
      <div className="showcase-tabs" role="tablist" aria-label="Concept-showcases">
        {conceptShowcases.map((showcase, index) => {
          const selected = showcase.id === active.id;
          return (
            <button
              key={showcase.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="showcase-stage"
              className={selected ? "is-active" : undefined}
              onClick={() => selectShowcase(showcase.id)}
            >
              <span className="showcase-tab-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{showcase.naam}</strong>
                <small>{showcase.niche}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="showcase-stage"
        id="showcase-stage"
        role="tabpanel"
        aria-live="polite"
      >
        <div className="showcase-comparison" key={active.id}>
          {/* Het eindbeeld ligt onderop; het beginbeeld wordt er links overheen
              geklemd. Naar rechts slepen = de transformatie onthullen. */}
          <img
            src={active.afterImage}
            alt={`Eindbeeld van conceptwebsite ${active.naam}`}
            className="showcase-image"
            draggable={false}
          />
          <img
            src={active.beforeImage}
            alt={`Beginbeeld van conceptwebsite ${active.naam}`}
            className="showcase-image showcase-image-after"
            style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
            draggable={false}
          />
          <span className="showcase-image-label is-before">Voor</span>
          <span className="showcase-image-label is-after">Na</span>
          <span
            className="showcase-reveal-line"
            style={{ left: `${reveal}%` }}
            aria-hidden="true"
          >
            <span>↔</span>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={reveal}
            onChange={(event) => setReveal(Number(event.target.value))}
            className="showcase-range"
            aria-label={`Vergelijk het begin- en eindbeeld van ${active.naam}`}
          />
        </div>

        <div className="showcase-details">
          <div>
            <p className="showcase-concept-label">
              Conceptwebsite · fictieve merknaam
            </p>
            <h3>{active.naam}</h3>
            <p className="showcase-tagline">{active.tagline}</p>
            <p className="showcase-story">{active.verhaal}</p>
          </div>
          <div className="showcase-meta">
            <dl>
              <div>
                <dt>Niche</dt>
                <dd>{active.niche}</dd>
              </div>
              <div>
                <dt>Techniek</dt>
                <dd>{active.techniek}</dd>
              </div>
              <div>
                <dt>Productie</dt>
                <dd>{active.doorlooptijd}</dd>
              </div>
            </dl>
            <p>{active.detail}</p>
            <a
              href={active.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="showcase-live-link"
            >
              Speel de scroll-film af <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
