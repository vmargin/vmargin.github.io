import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import portfolio from "./data/portfolio.json";
import "./case-study.css";
import "./case-study-updates.css";
import { ProjectGallery } from "./components/ProjectGallery";
import { DotField } from "./components/DotField";
import { ProjectShowcase } from "./components/ProjectShowcase";
import {
  MotionControl,
  ThemeToggle,
  useSitePreferences,
} from "./components/SitePreferences";

type Project = (typeof portfolio.projects)[number];
const { site, projects } = portfolio;

function GalleryReference({
  decision,
}: {
  decision: Project["decisions"][number];
}) {
  if (!("galleryHref" in decision) || !("galleryLabel" in decision))
    return null;
  if (
    typeof decision.galleryHref !== "string" ||
    typeof decision.galleryLabel !== "string"
  )
    return null;
  return (
    <a className="decision-source" href={decision.galleryHref}>
      {decision.galleryLabel} <ArrowRight size={14} aria-hidden="true" />
    </a>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const preferences = useSitePreferences();
  const { theme, setTheme, motionEnabled } = preferences;
  const nextProject = projects.find(
    (candidate) => candidate.id === project.nextProjectId,
  );
  return (
    <div className="case-study-page">
      <DotField enabled={motionEnabled} theme={theme} />
      <a className="case-skip-link" href="#case-content">
        Skip to case study
      </a>
      <header className="case-header">
        <div className="wrap case-header-inner">
          <a
            className="monogram"
            href="/"
            aria-label="VM Valkenburgh Margin, home"
          >
            V<span>M</span>
          </a>
          <nav aria-label="Case study navigation">
            <a href="/#projects">All projects</a>
            <a href="/#experience">Experience</a>
            <a href={site.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
          <ThemeToggle theme={theme} onChange={setTheme} />
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
              <p className="case-opening-decision">
                <strong>{project.decisions[0]?.title}.</strong>{" "}
                {project.decisions[0]?.body}{" "}
                {project.decisions[0]?.evidenceUrl && (
                  <a
                    className="decision-source"
                    href={project.decisions[0].evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Related source <ArrowUpRight size={14} />
                  </a>
                )}
                {project.decisions[0] && (
                  <GalleryReference decision={project.decisions[0]} />
                )}
              </p>
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
              {project.applicationNote && (
                <p className="case-access-note">{project.applicationNote}</p>
              )}
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

          <section
            className="case-showcase"
            aria-labelledby="showcase-title"
            id="showcase"
          >
            <div className="case-section-heading">
              <div>
                <p className="eyebrow">See it in action</p>
                <h2 id="showcase-title">Watch the showcase.</h2>
              </div>
              <p>
                A short film of {project.title}, captured from the working
                application.
              </p>
            </div>
            <ProjectShowcase project={project} />
          </section>

          <section className="case-gallery" aria-labelledby="gallery-title">
            <div className="case-section-heading">
              <div>
                <p className="eyebrow">Inside the application</p>
                <h2 id="gallery-title">Inside {project.title}.</h2>
              </div>
              <p>
                Captions identify the workflow and the screenshot's source or
                demo context.
              </p>
            </div>
            <ProjectGallery images={project.gallery} />
          </section>

          {project.versions.length > 0 && (
            <section className="case-versions" aria-labelledby="versions-title">
              <div className="case-section-heading">
                <div>
                  <p className="eyebrow">Version history</p>
                  <h2 id="versions-title">
                    {project.id === "cash-g"
                      ? "Desktop original. Web adaptation."
                      : "How the project evolved."}
                  </h2>
                </div>
                <p>Contribution and assistance by version.</p>
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
              <h2 id="decisions-title">Further decisions</h2>
              {project.decisions.slice(1).map((decision) => (
                <article className="case-decision" key={decision.title}>
                  <h3>{decision.title}</h3>
                  <p>{decision.body}</p>
                  <GalleryReference decision={decision} />
                  {"evidenceUrl" in decision &&
                    typeof decision.evidenceUrl === "string" && (
                      <a
                        className="decision-source"
                        href={decision.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Related source <ArrowUpRight size={14} />
                      </a>
                    )}
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
                Next: {nextProject.title}
                <ArrowRight size={16} />
              </a>
            )}
          </nav>
        </div>
      </main>

      <footer className="case-footer">
        <div className="wrap case-footer-inner">
          <a href={"mailto:" + site.email}>{site.email}</a>
          <MotionControl preferences={preferences} />
          <a href="/#experience">Experience &amp; Education</a>
          <a href={site.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
          <a href="/">Portfolio home</a>
        </div>
      </footer>
    </div>
  );
}
