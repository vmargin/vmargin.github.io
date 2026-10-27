import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Play, RotateCcw, X } from "lucide-react";
import type portfolio from "../data/portfolio.json";
import "./ProjectShowcase.css";

type Project = (typeof portfolio.projects)[number];

export function showcaseDuration(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export function ProjectShowcase({
  project,
  startPlaying = false,
}: {
  project: Project;
  startPlaying?: boolean;
}) {
  const { showcase } = project;
  const [active, setActive] = useState(startPlaying);
  const [failed, setFailed] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (element && !element.getAttribute("src")) element.src = showcase.src;
    if (active && !startPlaying) element?.focus({ preventScroll: true });
    return () => {
      element?.pause();
      element?.removeAttribute("src");
      element?.load();
    };
  }, [active, failed, startPlaying, showcase.src]);

  return (
    <figure className="showcase">
      <div className="showcase-screen">
        {failed ? (
          <div className="showcase-error" role="status">
            <p>
              The video could not load. Try again or open the video directly.
            </p>
            <div className="showcase-error-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setFailed(false)}
              >
                <RotateCcw size={16} aria-hidden="true" /> Try again
              </button>
              <a
                className="text-link"
                href={showcase.src}
                target="_blank"
                rel="noreferrer"
              >
                Open video <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : active ? (
          <>
            <video
              ref={video}
              src={showcase.src}
              poster={showcase.poster}
              width={showcase.width}
              height={showcase.height}
              controls
              playsInline
              autoPlay
              preload="none"
              tabIndex={0}
              aria-label={`${project.title} project showcase`}
              aria-describedby={`showcase-description-${project.id}`}
              onWaiting={() => setBuffering(true)}
              onPlaying={() => setBuffering(false)}
              onCanPlay={() => setBuffering(false)}
              onError={() => {
                setBuffering(false);
                setFailed(true);
              }}
            >
              <a href={showcase.src}>Open the {project.title} showcase video</a>
            </video>
            {buffering && (
              <span className="showcase-buffering" role="status">
                Loading video...
              </span>
            )}
          </>
        ) : (
          <button
            className="showcase-poster"
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${project.title} showcase`}
          >
            <img
              src={showcase.poster}
              alt=""
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            />
            <span className="showcase-poster-action">
              <span className="showcase-play-icon">
                <Play size={24} aria-hidden="true" fill="currentColor" />
              </span>
              <span>
                Watch showcase{" "}
                <span className="showcase-duration">
                  {showcaseDuration(showcase.durationSeconds)}
                </span>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption id={`showcase-description-${project.id}`}>
        <span className="showcase-caption-label">
          Project film <span aria-hidden="true">/</span>{" "}
          {showcaseDuration(showcase.durationSeconds)}
        </span>
        <span>{showcase.description}</span>
      </figcaption>
    </figure>
  );
}

export function ShowcaseDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    element.querySelector<HTMLButtonElement>(".showcase-close")?.focus();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="project-dialog showcase-dialog"
      aria-labelledby="showcase-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-top">
        <div>
          <p className="eyebrow">Project showcase</p>
          <h2 id="showcase-dialog-title">{project.title}</h2>
        </div>
        <button
          className="icon-button showcase-close"
          type="button"
          aria-label="Close showcase"
          onClick={onClose}
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <ProjectShowcase project={project} startPlaying />
      <div className="showcase-dialog-footer">
        <a className="text-link" href={project.href}>
          Read the case study <ArrowRight size={16} aria-hidden="true" />
        </a>
        <span>Real application footage</span>
      </div>
    </dialog>
  );
}
