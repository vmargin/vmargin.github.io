import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import type portfolio from "../data/portfolio.json";

type Image = (typeof portfolio.projects)[number]["gallery"][number];

function ImageViewer({
  image,
  onClose,
}: {
  image: Image;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [original, setOriginal] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    element.querySelector<HTMLButtonElement>(".viewer-close")?.focus();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement)
        previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="image-viewer"
      aria-labelledby="viewer-caption"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="viewer-toolbar">
        <button
          type="button"
          className="text-link"
          onClick={() => setOriginal(!original)}
        >
          {original ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          {original ? "Fit to screen" : "View original size"}
        </button>
        <button
          className="icon-button viewer-close"
          type="button"
          aria-label="Close screenshot"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <div
        className={`viewer-image ${original ? "is-original" : ""}`}
        tabIndex={original ? 0 : undefined}
        role={original ? "region" : undefined}
        aria-label={
          original ? "Full-size screenshot, scroll to explore" : undefined
        }
      >
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </div>
      <p id="viewer-caption">{image.caption}</p>
    </dialog>
  );
}

export function ProjectGallery({ images }: { images: Image[] }) {
  const [selected, setSelected] = useState<Image | null>(null);
  return (
    <>
      <div className="case-gallery-grid">
        {images.map((image, index) => (
          <figure
            id={`screen-${index + 1}`}
            className={`case-gallery-item${index === 0 ? " is-featured" : ""}`}
            key={image.src}
          >
            <button
              type="button"
              className="gallery-open"
              aria-label={`Enlarge screenshot: ${image.caption}`}
              onClick={() => setSelected(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="gallery-enlarge">
                <Maximize2 size={16} aria-hidden="true" /> Enlarge
              </span>
            </button>
            <figcaption>
              <span className="gallery-index">0{index + 1}</span>
              <span>{image.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {selected && (
        <ImageViewer image={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
