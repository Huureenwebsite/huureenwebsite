"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import type { ShowcaseFilm as Film } from "@/lib/showcase-films";

// Speler die de keyframe-sequentie van één scroll-film afspeelt.
//
// Interactiemodel (bewust gelijk voor mobiel en desktop, met per platform een
// passende laag eroverheen):
//  · IN BEELD → speelt de film één keer automatisch af (0→laatste frame), zodat
//    iedereen — vooral mobiel, zonder hover — de transformatie zíet gebeuren
//    zonder iets te doen. Daarna blijft het eindbeeld staan.
//  · SCRUBBEN → sleep de tijdbalk (touch + muis) of, op desktop, beweeg de muis
//    over het beeld: de cursor wordt de tijdlijn. Snapt naar het dichtstbijzijnde
//    frame — net als de echte scrub-engine (nearest-frame, geen blending).
//  · HERHALEN → knop op het beeld; op touch is tikken op het beeld ook herhalen.
//  · We kapen NOOIT de pagina-scroll (cruciaal op mobiel).
//  · reduced-motion → geen autoplay; toont het eindbeeld, handmatig scrubben mag.

const PLAY_MS = 2800; // duur van één automatische doorloop

type Props = { film: Film; index: number };

export default function ShowcaseFilm({ film, index }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const progressRef = useRef<number>(0); // altijd de actuele voortgang (0..1)
  const playingRef = useRef<boolean>(false);
  const playedRef = useRef<boolean>(false);
  const prevFrameRef = useRef<number>(0);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const last = film.frameCount - 1;

  const frameFloat = progress * last;
  const activeChapter = film.chapters.reduce(
    (acc, c) => (frameFloat + 0.001 >= c.at ? c : acc),
    film.chapters[0],
  );

  // --- Tekenen ---------------------------------------------------------------
  const draw = useCallback(
    (frac: number, blend = false) => {
      const cv = canvasRef.current;
      const ctx = cv?.getContext("2d");
      if (!cv || !ctx) return;
      const imgs = imgsRef.current;
      const exact = frac * last;
      const i = Math.round(exact);
      const cur = imgs[i];
      if (!cur) return;
      const cover = (img: HTMLImageElement) => {
        const s = Math.max(cv.width / img.width, cv.height / img.height);
        const w = img.width * s;
        const h = img.height * s;
        ctx.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h);
      };
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (blend) {
        const from = imgs[prevFrameRef.current];
        const frac2 = exact - Math.floor(exact);
        if (from && Math.floor(exact) !== i) {
          ctx.globalAlpha = 1;
          cover(from);
          ctx.globalAlpha = frac2;
          cover(cur);
          ctx.globalAlpha = 1;
        } else {
          cover(cur);
        }
      } else {
        cover(cur); // scrub/rust: snap naar dichtstbijzijnde frame
      }
      prevFrameRef.current = i;
    },
    [last],
  );

  const sizeCanvas = useCallback(() => {
    const cv = canvasRef.current;
    const stage = stageRef.current;
    if (!cv || !stage) return;
    const r = stage.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(r.width * dpr);
    cv.height = Math.round(r.height * dpr);
    draw(progressRef.current); // altijd de actuele voortgang, nooit hard 0
  }, [draw]);

  const setProg = useCallback((p: number) => {
    progressRef.current = p;
    setProgress(p);
  }, []);

  // --- Afspelen (één rAF-loop, hard afgeschermd tegen dubbel starten) --------
  const runPlay = useCallback(() => {
    if (!loaded) return;
    cancelAnimationFrame(rafRef.current);
    playingRef.current = true;
    setPlaying(true);
    let start = 0;
    const step = (t: number) => {
      if (!playingRef.current) return; // afgebroken door scrub
      if (!start) start = t;
      const p = Math.min((t - start) / PLAY_MS, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProg(eased);
      draw(eased, true);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        playingRef.current = false;
        playedRef.current = true;
        setProg(1);
        draw(1); // eindbeeld hard vastzetten
        setPlaying(false);
        setHasPlayed(true);
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [loaded, draw, setProg]);

  const maybeAutoplay = useCallback(() => {
    if (playedRef.current || playingRef.current) return;
    runPlay();
  }, [runPlay]);

  const replay = useCallback(() => {
    if (!loaded) return;
    playedRef.current = false;
    setProg(0);
    draw(0);
    runPlay();
  }, [loaded, draw, setProg, runPlay]);

  // --- Frames lazy laden zodra de kaart in de buurt komt ---------------------
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        const arr: (HTMLImageElement | null)[] = new Array(film.frameCount).fill(
          null,
        );
        imgsRef.current = arr;
        let done = 0;
        for (let i = 0; i < film.frameCount; i++) {
          const img = new Image();
          const nn = String(i + 1).padStart(2, "0");
          img.src = `${film.frameDir}/f${nn}.webp`;
          img.onload = img.onerror = () => {
            arr[i] = img;
            done++;
            if (done === 1) {
              sizeCanvas();
              draw(progressRef.current);
            }
            if (done === film.frameCount) setLoaded(true);
          };
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [film.frameCount, film.frameDir, draw, sizeCanvas]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduceMotion(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, [sizeCanvas]);

  // --- Autoplay één keer wanneer de film ruim in beeld staat -----------------
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !loaded) return;
    if (reduceMotion) {
      playedRef.current = true;
      setProg(1);
      draw(1);
      setHasPlayed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            io.disconnect(); // maar één trigger — geen dubbele loops
            maybeAutoplay();
          }
        });
      },
      { threshold: [0.55] },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [loaded, reduceMotion, maybeAutoplay, draw, setProg]);

  // --- Scrubben --------------------------------------------------------------
  const scrubToClientX = useCallback(
    (clientX: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      playingRef.current = false; // breekt een lopende autoplay netjes af
      cancelAnimationFrame(rafRef.current);
      setPlaying(false);
      setProg(p);
      draw(p);
    },
    [draw, setProg],
  );

  const hoverCapable = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  return (
    <article className="film" style={{ ["--film-accent" as string]: film.accent }}>
      <div className="film-media">
        <div
          ref={stageRef}
          className="film-stage"
          onMouseMove={(e) => {
            if (hoverCapable() && loaded && hasPlayed) scrubToClientX(e.clientX);
          }}
          onClick={() => {
            if (!hoverCapable()) replay();
          }}
        >
          <canvas ref={canvasRef} className="film-canvas" />
          {!loaded && <div className="film-skeleton" aria-hidden="true" />}

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
          className={`film-track${scrubbing ? " is-scrubbing" : ""}`}
          role="slider"
          aria-label={`Scrub door de transformatie van ${film.merk}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setScrubbing(true);
            scrubToClientX(e.clientX);
          }}
          onPointerMove={(e) => scrubbing && scrubToClientX(e.clientX)}
          onPointerUp={() => setScrubbing(false)}
          onPointerCancel={() => setScrubbing(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              const stepFrac = 1 / last;
              const next =
                e.key === "ArrowRight"
                  ? Math.min(1, progress + stepFrac)
                  : Math.max(0, progress - stepFrac);
              playingRef.current = false;
              cancelAnimationFrame(rafRef.current);
              setPlaying(false);
              setProg(next);
              draw(next);
            }
          }}
        >
          <span className="film-track-fill" style={{ width: `${progress * 100}%` }} />
          <span className="film-track-knob" style={{ left: `${progress * 100}%` }} />
          {film.chapters.map((c) => (
            <span
              key={c.at}
              className="film-track-tick"
              style={{ left: `${(c.at / last) * 100}%` }}
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
          Speel de volledige scroll-film af <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}
