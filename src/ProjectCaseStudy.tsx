import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Moon,
  Sun,
} from "lucide-react";
import portfolio from "./data/portfolio.json";

type Project = (typeof portfolio.projects)[number];
type Theme = "dark" | "light";
const { site, projects } = portfolio;

function ThemeControl({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        className="theme-toggle-option"
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        onClick={() => onChange("light")}
      >
        <Sun size={16} aria-hidden="true" />
      </button>
      <button
        className="theme-toggle-option"
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => onChange("dark")}
      >
        <Moon size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  const nextProject = projects.find(
    (candidate) => candidate.id === project.nextProjectId,
  );
  const pageTitle = project.title + " | Valkenburgh Margin";
  const pageDescription = project.summary;
  const pageUrl = site.canonicalOrigin + project.href;
  const imageUrl = site.canonicalOrigin + project.cover;

  useEffect(() => {
    document.title = pageTitle;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f5f3ef" : "#10161c");
    try {
      localStorage.setItem("v6-theme", theme);
    } catch {
      // The selected theme remains active for this visit.
    }

    const metadata = [
      ['meta[name="description"]', "content", pageDescription],
      ['meta[property="og:title"]', "content", pageTitle],
      ['meta[property="og:description"]', "content", pageDescription],
      ['meta[property="og:url"]', "content", pageUrl],
      ['meta[property="og:image"]', "content", imageUrl],
      ['meta[name="twitter:title"]', "content", pageTitle],
      ['meta[name="twitter:description"]', "content", pageDescription],
    ] as const;
    for (const [selector, attribute, value] of metadata) {
      document.querySelector(selector)?.setAttribute(attribute, value);
    }
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", pageUrl);
    document
      .querySelector('meta[property="og:image:alt"]')
      ?.setAttribute("content", project.gallery[0].alt);
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      description: pageDescription,
      url: pageUrl,
      image: imageUrl,
      about: {
        "@type": "CreativeWork",
        name: project.title,
        description: pageDescription,
      },
    };
    const structuredDataScript = document.querySelector<HTMLScriptElement>(
      "#portfolio-structured-data",
    );
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }
  }, [imageUrl, pageDescription, pageTitle, pageUrl, project.gallery, theme]);

  return (
    <div className="case-study-page">
      <a className="case-skip-link" href="#case-content">
        Skip to case study
      </a>
      <header className="case-header">
        <div className="wrap case-header-inner">
          <a
            className="monogram"
            href="/"
            aria-label="Valkenburgh Margin, home"
          >
            V<span>M</span>
          </a>
          <nav aria-label="Case study navigation">
            <a href="/#projects">All projects</a>
            <a href="/#contact">Contact</a>
          </nav>
          <ThemeControl theme={theme} onChange={setTheme} />
        </div>
      </header>

      <main id="case-content" className="case-main">
        <div className="wrap">
          <nav className="case-breadcrumb" aria-label="Breadcrumb">
            <a href="/#projects">Projects</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <section className="case-intro" aria-labelledby="case-title">
            <div className="case-intro-copy">
              <p className="eyebrow">
                {project.type} <span aria-hidden="true" /> {project.period}
              </p>
              <h1 id="case-title">{project.title}</h1>
              <p className="case-summary">{project.overview}</p>
              <div className="tags case-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="button-row case-actions">
                <a
                  className="button button-primary"
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} />
                  View public source
                  <ArrowUpRight size={16} />
                </a>
                {project.applicationUrl && (
                  <a
                    className="button button-outline"
                    href={project.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open hosted application
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
            <aside className="case-at-a-glance" aria-label="Project summary">
              <p className="eyebrow">At a glance</p>
              <div>
                <span>Current scope</span>
                <strong>{project.statusText}</strong>
              </div>
              <div>
                <span>My contribution</span>
                <p>{project.role}</p>
              </div>
              <a
                href={project.verificationUrl}
                target="_blank"
                rel="noreferrer"
              >
                Read the verification record
                <ArrowUpRight size={15} />
              </a>
            </aside>
          </section>

          {project.versions.length > 0 && (
            <section className="case-versions" aria-labelledby="versions-title">
              <div className="case-section-heading">
                <div>
                  <p className="eyebrow">Version history</p>
                  <h2 id="versions-title">Two distinct CASH-G applications.</h2>
                </div>
                <p>
                  Keep the desktop learning project separate from its web
                  evolution.
                </p>
              </div>
              <div className="case-version-grid">
                {project.versions.map((version) => (
                  <article className="case-version" key={version.title}>
                    <h3>{version.title}</h3>
                    <p>{version.summary}</p>
                    <a
                      href={version.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View this version <ArrowUpRight size={15} />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="case-gallery" aria-labelledby="gallery-title">
            <div className="case-section-heading">
              <div>
                <p className="eyebrow">Inside the application</p>
                <h2 id="gallery-title">Real screens. Specific workflows.</h2>
              </div>
              <p>
                Captions identify the workflow and the screenshot's source or
                demo context.
              </p>
            </div>
            <div className="case-gallery-grid">
              {project.gallery.map((image, index) => (
                <figure
                  className={
                    "case-gallery-item" + (index === 0 ? " is-featured" : "")
                  }
                  key={image.src}
                >
                  <a
                    href={image.src}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={"Open full-size screenshot: " + image.caption}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </a>
                  <figcaption>
                    <span className="gallery-index">0{index + 1}</span>
                    <span>{image.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section
            className="case-architecture"
            aria-labelledby="architecture-title"
          >
            <div className="case-section-heading">
              <div>
                <p className="eyebrow">System shape</p>
                <h2 id="architecture-title">How the pieces connect.</h2>
              </div>
              <p>{project.architecture.summary}</p>
            </div>
            <div className="case-architecture-groups">
              {project.architecture.groups.map((group) => (
                <div className="case-architecture-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ol className="case-architecture-flow">
                    {group.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          {project.accessModel && (
            <section
              className="case-access-model"
              aria-labelledby="access-model-title"
            >
              <div className="case-section-heading">
                <div>
                  <p className="eyebrow">Roles and scope</p>
                  <h2 id="access-model-title">Who can do what.</h2>
                </div>
                <p>{project.accessModel.summary}</p>
              </div>
              <dl className="case-access-roles">
                {project.accessModel.roles.map((role) => (
                  <div className="case-access-role" key={role.name}>
                    <dt>{role.name}</dt>
                    <dd>{role.scope}</dd>
                  </div>
                ))}
              </dl>
              <div className="case-access-evidence">
                {project.accessModel.evidence.map((item) => (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    key={item.href}
                  >
                    {item.label}
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="case-content-grid">
            <section className="case-workflow" aria-labelledby="workflow-title">
              <p className="eyebrow">Product flow</p>
              <h2 id="workflow-title">What it supports</h2>
              <ol>
                {project.workflow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
            <section
              className="case-decisions"
              aria-labelledby="decisions-title"
            >
              <p className="eyebrow">Engineering choices</p>
              <h2 id="decisions-title">Decisions that matter</h2>
              {project.decisions.map((decision) => (
                <article className="case-decision" key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.body}</p>
                </article>
              ))}
            </section>
          </div>

          <section
            className="case-source-evidence"
            aria-labelledby="source-evidence-title"
          >
            <div className="case-section-heading">
              <div>
                <p className="eyebrow">Selected source</p>
                <h2 id="source-evidence-title">Follow the claims into code.</h2>
              </div>
              <p>Focused implementation and test links for technical review.</p>
            </div>
            <div className="case-source-evidence-grid">
              {project.sourceEvidence.map((item) => (
                <article className="case-source-evidence-item" key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                    <ArrowUpRight size={15} />
                  </a>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="case-verification"
            aria-labelledby="verification-title"
          >
            <div>
              <p className="eyebrow">{project.verificationTitle}</p>
              <h2 id="verification-title">Verification and limits</h2>
              <p>{project.verificationSummary}</p>
              <p>{project.portfolioCheck}</p>
              {project.applicationNote && <p>{project.applicationNote}</p>}
              <ul>
                {project.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </div>
            <a
              className="button button-outline"
              href={project.verificationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open verification record
              <ArrowUpRight size={16} />
            </a>
          </section>

          <nav className="case-end-nav" aria-label="More projects">
            <a className="text-link" href="/#projects">
              <ArrowLeft size={16} />
              Back to all projects
            </a>
            {nextProject && (
              <a className="text-link" href={nextProject.href}>
                Next case study: {nextProject.title}
                <ArrowRight size={16} />
              </a>
            )}
          </nav>
        </div>
      </main>

      <footer className="case-footer">
        <div className="wrap case-footer-inner">
          <a href={"mailto:" + site.email}>{site.email}</a>
          <span>© {new Date().getFullYear()} Valkenburgh Margin</span>
          <a href="/">Portfolio home</a>
        </div>
      </footer>
    </div>
  );
}
