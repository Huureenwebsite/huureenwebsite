"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import type { ShowcaseFilm as Film } from "@/lib/showcase-films";

// Speler die de échte, vloeiende scroll-filmvideo van één concept toont.
//
// Bewust klik-om-te-starten (geen autoplay): standaard laadt alleen de poster
// (preload="none"), zodat de pagina licht blijft en er geen data verbruikt wordt
// tot de bezoeker een film echt wil zien. Pas bij de eerste klik wordt de video
// geladen en afgespeeld.
//
//  · START → klik op het beeld of de afspeelknop → video laadt en speelt af.
//  · SCRUBBEN → sleep de tijdbalk (touch + muis) of, op desktop na het spelen,
//    beweeg over het beeld (cursor = tijdlijn, video.currentTime).
//  · PAUZE/HERVAT → klik tijdens het spelen; opnieuw vanaf het eindbeeld.
//  · Kaapt nooit de pagina-scroll.

type Props = { film: Film; index: number };

export default function ShowcaseFilm({ film, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubbingRef = useRef(false);

  const [started, setStarted] = useState(false); // is er ooit afgespeeld?
  const [progress, setProgress] = useState(0); // 0..1
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const activeChapter = film.chapters.reduce(
    (acc, c) => (progress + 0.0001 >= c.at ? c : acc),
    film.chapters[0],
  );

  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (v.ended || v.currentTime >= (v.duration || Infinity) - 0.05) {
      v.currentTime = 0;
    }
    const pr = v.play();
    if (pr && typeof pr.then === "function") pr.catch(() => {});
    setStarted(true);
  }, []);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  }, [play]);

  const scrubToClientX = useCallback((clientX: number) => {
    const stage = stageRef.current;
    const v = videoRef.current;
    if (!stage || !v || !v.duration) return;
    const r = stage.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.pause();
    v.currentTime = p * v.duration;
    setProgress(p);
  }, []);

  const onTime = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (!scrubbingRef.current) setProgress(v.currentTime / v.duration);
  };

  return (
    <article className="film" style={{ ["--film-accent" as string]: film.accent }}>
      <div className="film-media">
        <div
          ref={stageRef}
          className="film-stage"
          onMouseMove={(e) => {
            // Desktop: na het spelen scrubben door over het beeld te bewegen.
            if (hoverCapable() && started && !playing) scrubToClientX(e.clientX);
          }}
          onClick={() => {
            // Klik op het beeld start of pauzeert (touch en desktop).
            if (!started) play();
            else togglePlay();
          }}
        >
          <video
            ref={videoRef}
            className="film-video"
            src={film.video}
            poster={film.poster}
            muted
            playsInline
            preload="none"
            onLoadedData={() => setReady(true)}
            onTimeUpdate={onTime}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          <span className="film-badge">Conceptwebsite · fictief merk</span>

          {/* Grote afspeelknop: zichtbaar zolang er niet speelt. */}
          {!playing && (
            <button
              type="button"
              className={`film-play${started ? " is-replay" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                play();
              }}
              aria-label={
                started
                  ? `Speel de transformatie van ${film.merk} opnieuw af`
                  : `Speel de transformatie van ${film.merk} af`
              }
            >
              <span className="film-play-icon" aria-hidden="true">
                {started ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </span>
              <span className="film-play-label">
                {started ? "Opnieuw afspelen" : "Speel de transformatie af"}
              </span>
              {!started && (
                <span className="film-play-sub">±{film.chapters.length} fases · klik om te laden</span>
              )}
            </button>
          )}

          {(started || playing) && (
            <div className="film-chapter" aria-hidden="true">
              <span className="film-chapter-dot" />
              {activeChapter.label}
            </div>
          )}

          {started && !ready && <div className="film-loading" aria-hidden="true" />}
        </div>

        {/* Tijdbalk: pas actief nadat de film is gestart. */}
        <div
          className={`film-track${started ? "" : " is-idle"}`}
          role="slider"
          aria-label={`Scrub door de transformatie van ${film.merk}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-disabled={!started}
          tabIndex={started ? 0 : -1}
          onPointerDown={(e) => {
            if (!started) return;
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
            if (!started || !v || !v.duration) return;
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
          {started ? (
            <>
              <span className="film-hint-desk">Beweeg over het beeld of sleep de balk om zelf te scrubben</span>
              <span className="film-hint-touch">Sleep de balk of tik het beeld om te pauzeren</span>
            </>
          ) : (
            "Klik om de transformatiefilm te laden en af te spelen"
          )}
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
