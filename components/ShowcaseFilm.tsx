"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import type { ShowcaseFilm as Film } from "@/lib/showcase-films";

// Speler die de échte, vloeiende scroll-filmvideo van één concept toont.
//
// Interactiemodel (bewust gelijk voor mobiel en desktop, met per platform een
// passende laag eroverheen):
//  · IN BEELD → de video speelt één keer automatisch af (muted, playsinline),
//    zodat iedereen — vooral mobiel, zonder hover — de transformatie vloeiend
//    ziet gebeuren zonder iets te doen. Daarna blijft het eindbeeld staan.
//  · SCRUBBEN → sleep de tijdbalk (touch + muis) of, op desktop, beweeg de muis
//    over het beeld: de cursor wordt de tijdlijn (video.currentTime).
//  · HERHALEN → knop op het beeld; op touch tikt het beeld ook opnieuw af.
//  · We kapen NOOIT de pagina-scroll (cruciaal op mobiel).
//  · reduced-motion → geen autoplay; toont de poster/het eindbeeld, scrubben mag.

type Props = { film: Film; index: number };

export default function ShowcaseFilm({ film, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const scrubbingRef = useRef(false);

  const [progress, setProgress] = useState(0); // 0..1
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const frac = progress;
  const activeChapter = film.chapters.reduce(
    (acc, c) => (frac + 0.0001 >= c.at ? c : acc),
    film.chapters[0],
  );

  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  // --- Autoplay één keer wanneer de film ruim in beeld staat -----------------
  const playOnce = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.currentTime = 0;
    const pr = v.play();
    if (pr && typeof pr.then === "function") pr.catch(() => {});
    setPlaying(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduceMotion(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (
            e.isIntersecting &&
            e.intersectionRatio > 0.55 &&
            !playedRef.current &&
            !reduceMotion
          ) {
            playedRef.current = true;
            io.disconnect();
            playOnce();
          }
        });
      },
      { threshold: [0.55] },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [playOnce, reduceMotion]);

  // --- Video-events → voortgang ---------------------------------------------
  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (!scrubbingRef.current) setProgress(v.currentTime / v.duration);
  };
  const onEnded = () => {
    setPlaying(false);
    setHasPlayed(true);
  };

  // --- Scrubben --------------------------------------------------------------
  const scrubToClientX = useCallback((clientX: number) => {
    const stage = stageRef.current;
    const v = videoRef.current;
    if (!stage || !v || !v.duration) return;
    const r = stage.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.pause();
    v.currentTime = p * v.duration;
    setPlaying(false);
    setProgress(p);
  }, []);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.currentTime = 0;
    const pr = v.play();
    if (pr && typeof pr.then === "function") pr.catch(() => {});
    setPlaying(true);
  }, []);

  return (
    <article className="film" style={{ ["--film-accent" as string]: film.accent }}>
      <div className="film-media">
        <div
          ref={stageRef}
          className="film-stage"
          onMouseMove={(e) => {
            if (hoverCapable() && hasPlayed) scrubToClientX(e.clientX);
          }}
          onClick={() => {
            if (!hoverCapable()) replay();
          }}
        >
          <video
            ref={videoRef}
            className="film-video"
            src={film.video}
            poster={film.poster}
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setReady(true)}
            onTimeUpdate={onTime}
            onEnded={onEnded}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!ready && <div className="film-skeleton" aria-hidden="true" />}

          <span className="film-badge">Conceptwebsite · fictief merk</span>

          <div className="film-chapter" aria-hidden="true">
            <span className="film-chapter-dot" />
            {activeChapter.label}
          </div>

          {(hasPlayed || reduceMotion) && !playing && (
            <button
              type="button"
              className="film-replay"
              onClick={(e) => {
                e.stopPropagation();
                replay();
              }}
              aria-label={`Speel de transformatie van ${film.merk} opnieuw af`}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Opnieuw
            </button>
          )}
        </div>

        {/* Tijdbalk: slepen om zelf door de film te scrubben (touch + muis). */}
        <div
          className={`film-track${scrubbingRef.current ? " is-scrubbing" : ""}`}
          role="slider"
          aria-label={`Scrub door de transformatie van ${film.merk}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            scrubbingRef.current = true;
            scrubToClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (scrubbingRef.current) scrubToClientX(e.clientX);
          }}
          onPointerUp={() => {
            scrubbingRef.current = false;
          }}
          onPointerCancel={() => {
            scrubbingRef.current = false;
          }}
          onKeyDown={(e) => {
            const v = videoRef.current;
            if (!v || !v.duration) return;
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              v.pause();
              const stepS = v.duration / 20;
              v.currentTime = Math.min(
                v.duration,
                Math.max(0, v.currentTime + (e.key === "ArrowRight" ? stepS : -stepS)),
              );
              setProgress(v.currentTime / v.duration);
            }
          }}
        >
          <span className="film-track-fill" style={{ width: `${progress * 100}%` }} />
          <span className="film-track-knob" style={{ left: `${progress * 100}%` }} />
          {film.chapters.map((c) => (
            <span
              key={c.at}
              className="film-track-tick"
              style={{ left: `${c.at * 100}%` }}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="film-hint" aria-hidden="true">
          <span className="film-hint-desk">Beweeg over het beeld of sleep de balk om zelf te scrubben</span>
          <span className="film-hint-touch">Sleep de balk of tik het beeld om opnieuw af te spelen</span>
        </p>
      </div>

      <div className="film-info">
        <div className="film-info-top">
          <span className="film-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="film-niche">{film.niche}</span>
        </div>
        <h3>{film.merk}</h3>
        <p className="film-tagline">{film.tagline}</p>
        <p className="film-verhaal">{film.verhaal}</p>
        <div className="film-meta">
          <span className="film-chip">{film.techniekLabel}</span>
          <span className="film-chip">{film.doorlooptijd}</span>
        </div>
        <a
          href={film.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="film-live"
        >
          Bekijk de volledige website <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}
