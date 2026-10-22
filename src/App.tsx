import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import portfolio from "./data/portfolio.json";
import { useNativeEntry, useNativeMotion } from "./useNativeMotion";
import { Toolkit } from "./components/Toolkit";
import { Button } from "./components/ui/button";
import { DotField } from "./components/DotField";
import { AboutPortrait } from "./components/AboutPortrait";
import {
  ThemeToggle,
  MotionControl,
  useSitePreferences,
} from "./components/SitePreferences";
type Project = (typeof portfolio.projects)[number];
const { site, about, projects, contact } = portfolio;
const navItems = site.navigation;
const resumeHref =
  site.resumeUrl ??
  `mailto:${site.email}?subject=${encodeURIComponent("Résumé request")}`;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      {children}
      <span aria-hidden="true" />
    </p>
  );
}
function Action({
  href,
  children,
  secondary = false,
  icon = <ArrowRight size={17} />,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant={secondary ? "outline" : "default"}
      className={`button ${secondary ? "button-outline" : "button-primary"} ${className}`}
    >
      <a
        href={href}
        target={href.endsWith(".pdf") ? "_blank" : undefined}
        rel={href.endsWith(".pdf") ? "noreferrer" : undefined}
      >
        <span>{children}</span>
        {icon}
      </a>
    </Button>
  );
}

function ProjectDetails({
  project,
  onClose,
  animate,
}: {
  project: Project;
  onClose: () => void;
  animate: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current!;
    el.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    dialog.current?.scrollTo({ top: 0 });
    dialog.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
  }, [project.id]);
  useNativeEntry(dialog, animate, "preview");
  return (
    <dialog
      ref={dialog}
      className="project-dialog quick-preview"
      aria-labelledby="project-dialog-title"
      onClose={() => {
        if (!dialog.current?.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="dialog-top">
        <span className="eyebrow">Quick preview / {project.period}</span>
        <button
          className="icon-button dialog-close"
          type="button"
          aria-label="Close project preview"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <div className="dialog-heading">
        <p className="eyebrow">{project.type}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.summary}</p>
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <figure className="quick-preview-image">
        <img
          src={project.cover}
          alt={project.gallery[0]?.alt ?? ""}
          width={project.gallery[0]?.width}
          height={project.gallery[0]?.height}
          loading="lazy"
        />
        <figcaption>{project.previewNote}</figcaption>
      </figure>
      <div className="dialog-body quick-preview-status">
        <Eyebrow>{project.statusText}</Eyebrow>
        <p>{project.roleSummary}</p>
      </div>
      <div className="dialog-actions">
        <a className="button button-primary" href={project.href}>
          Read the full case study
          <ArrowRight size={17} />
        </a>
        <a
          className="text-link"
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          View public source
          <ArrowUpRight size={16} />
        </a>
      </div>
    </dialog>
  );
}

export default function PortfolioHome() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [previewFromPointer, setPreviewFromPointer] = useState(false);
  const preferences = useSitePreferences();
  const { theme, setTheme, motionEnabled } = preferences;
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useNativeMotion(root, motionEnabled && !selected);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(([entry]) =>
      setScrolled(entry ? !entry.isIntersecting : false),
    );
    const sentinel = root.current?.querySelector(".header-sentinel");
    if (sentinel) headerObserver.observe(sentinel);
    const sections = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    root.current
      ?.querySelectorAll(
        "#home, #projects, #about, #stack, #experience, #contact",
      )
      .forEach((section) => sections.observe(section));
    return () => {
      headerObserver.disconnect();
      sections.disconnect();
    };
  }, []);
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuTrigger.current?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 4500);
  };
  const closeProject = () => {
    setSelected(null);
    requestAnimationFrame(() =>
      projectTrigger.current?.focus({ preventScroll: true }),
    );
  };

  return (
    <div ref={root} className="portfolio">
      <DotField enabled={motionEnabled && !selected} theme={theme} />
      <div className="header-sentinel" aria-hidden="true" />
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>
      <header
        className={`site-header ${scrolled || menuOpen ? "is-scrolled" : ""}`}
      >
        <div className="header-inner wrap">
          <a
            className="monogram"
            href="#home"
            aria-label="VM Valkenburgh Margin, home"
          >
            V<span>M</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                href={item.href}
                target={item.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined}
                key={item.label}
                aria-current={
                  activeSection === item.href.slice(1) ? "location" : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <ThemeToggle theme={theme} onChange={setTheme} />
            <button
              ref={menuTrigger}
              className="icon-button menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {navItems.map((item) => (
            <a
              href={item.href}
              target={item.href.endsWith(".pdf") ? "_blank" : undefined}
              rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined}
              key={item.label}
              aria-current={
                activeSection === item.href.slice(1) ? "location" : undefined
              }
              onClick={() => {
                setMenuOpen(false);
                if (item.href.startsWith("#"))
                  requestAnimationFrame(() => {
                    const destination = document.querySelector<HTMLElement>(
                      item.href,
                    );
                    destination?.setAttribute("tabindex", "-1");
                    destination?.focus({ preventScroll: true });
                  });
              }}
            >
              {item.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section
          className="hero"
          id="home"
          aria-labelledby="hero-title"
          tabIndex={-1}
        >
          <div className="wrap hero-layout">
            <div className="hero-content">
              <p className="hero-availability">
                <span className="status-dot" aria-hidden="true" />
                {site.availability}
              </p>
              <h1 id="hero-title" className="hero-greeting">
                {site.heroGreeting}
              </h1>
              <p className="hero-position">{site.role}</p>
              <p className="hero-role">{site.heroHeadline}</p>
              <p className="hero-description">{site.heroDescription}</p>
              <div className="button-row">
                <Action href="#projects">View Projects</Action>
                <Action href="#contact" secondary>
                  Contact Me
                </Action>
              </div>
            </div>
            <figure className="hero-portrait">
              <img
                src="/images/portraits/hero-formal.webp"
                alt="Valkenburgh Margin in formal attire"
                width="850"
                height="1275"
                fetchPriority="high"
              />
            </figure>
          </div>
          <div className="hero-bottom wrap">
            <span className="location">
              <MapPin size={16} aria-hidden="true" />
              {site.location}
            </span>
            <a className="scroll-cue" href="#projects">
              <span>Explore the work</span>
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section
          className="projects-section section wrap"
          id="projects"
          tabIndex={-1}
          aria-labelledby="projects-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <h2 id="projects-title">
                Selected <em>projects.</em>
              </h2>
              <p>
                Three applications, from Java fundamentals to full-stack
                workflows.
              </p>
            </div>
            <a
              className="text-link"
              href={site.github}
              target="_blank"
              rel="noreferrer"
            >
              Explore GitHub
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.id}
                aria-labelledby={`project-${project.id}-title`}
                data-reveal
              >
                <a className="project-open" href={project.href}>
                  <div className="project-image-wrap">
                    <img
                      className="project-cover"
                      src={project.cover}
                      alt=""
                      width={project.gallery[0]?.width}
                      height={project.gallery[0]?.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="project-open-icon" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta">
                      <span className="project-type">{project.type}</span>
                      <span className="project-status-label">
                        {project.statusText}
                      </span>
                    </div>
                    <h3 id={`project-${project.id}-title`}>
                      {project.title}
                      <ArrowUpRight size={19} />
                    </h3>
                    <p>{project.summary}</p>
                    {project.cardFeatures && (
                      <p className="project-features">{project.cardFeatures}</p>
                    )}
                    <p className="project-role-summary">
                      {project.roleSummary}
                    </p>
                    <div className="tags">
                      {project.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <span className="case-study-link">
                      Read the case study
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </a>
                <div className="project-actions">
                  <a
                    className="project-demo-link"
                    href={project.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-describedby={`project-${project.id}-title project-${project.id}-demo-note`}
                  >
                    Try Demo <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <button
                    className="quick-preview-trigger"
                    type="button"
                    onClick={(event) => {
                      projectTrigger.current = event.currentTarget;
                      setPreviewFromPointer(event.detail > 0);
                      setSelected(project);
                    }}
                  >
                    Quick preview <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
                <p
                  className="project-demo-note"
                  id={`project-${project.id}-demo-note`}
                >
                  {project.demoAccess}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about-section section wrap"
          id="about"
          tabIndex={-1}
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <div className="about-copy" data-reveal>
              <h2 id="about-title">{about.title}</h2>
              <p>{about.intro}</p>
              <p>{about.paragraphs[0]}</p>
              <p>{about.paragraphs[1]}</p>
            </div>
            <AboutPortrait theme={theme} onThemeChange={setTheme} />
          </div>
        </section>

        <Toolkit motionEnabled={motionEnabled && !selected} />

        <section
          className="background-section section wrap"
          id="experience"
          tabIndex={-1}
          aria-labelledby="experience-title"
        >
          <span
            id="certifications"
            className="section-anchor"
            aria-hidden="true"
          />
          <div className="background-heading">
            <Eyebrow>Learning & foundations</Eyebrow>
            <h2 id="experience-title">Experience &amp; Education</h2>
            <p>
              Engineering foundations, project experience, and continued
              learning.
            </p>
          </div>
          <div className="journey-grid">
            <div className="journey-foundations">
              <div className="journey-column">
                <h3>Education</h3>
                <div className="journey-timeline">
                  <article className="journey-entry education-card" data-reveal>
                    <span className="background-date">
                      Graduated {about.education.year}
                    </span>
                    <h4>{about.education.qualification}</h4>
                    <p>{about.education.institution}</p>
                    <div className="background-detail">
                      <p>{about.education.description}</p>
                    </div>
                    <div className="background-footer education-coursework">
                      <h5>Relevant coursework</h5>
                      <ul>
                        {about.education.coursework.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              </div>
              <div className="journey-column">
                <h3>Training</h3>
                <div className="journey-timeline">
                  {about.training.map((item) => (
                    <article
                      className="journey-entry"
                      key={item.id}
                      data-reveal
                    >
                      <span className="background-date">{item.statusText}</span>
                      <h4>{item.title}</h4>
                      <p>{item.provider}</p>
                      <div className="background-detail">
                        <p>{item.detail}</p>
                      </div>
                      <div className="background-footer">
                        {item.relatedLink && (
                          <a
                            href={item.relatedLink.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.relatedLink.label} <ArrowUpRight size={14} />
                          </a>
                        )}
                        {item.credentialUrl && (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View course completion <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            <div className="journey-column project-experience">
              <h3>Experience</h3>
              <div className="journey-timeline">
                {about.experience.map((item) => (
                  <article className="journey-entry" key={item.id} data-reveal>
                    <span className="background-date">{item.period}</span>
                    <h4>{item.title}</h4>
                    <p>{item.context}</p>
                    <div className="background-detail">
                      <p>{item.detail}</p>
                    </div>
                    <div className="background-footer">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target={
                            link.href.startsWith("https:")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            link.href.startsWith("https:")
                              ? "noreferrer"
                              : undefined
                          }
                        >
                          {link.label}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="contact-section wrap"
          id="contact"
          tabIndex={-1}
          aria-labelledby="contact-title"
        >
          <figure className="contact-visual">
            <img
              className="contact-photo"
              src={site.contactImage.src}
              srcSet={site.contactImage.sources
                .map((image) => `${image.src} ${image.width}w`)
                .join(", ")}
              sizes="(min-width: 1470px) 670px, (min-width: 1024px) 46vw, 92vw"
              alt={site.contactImage.alt}
              width={site.contactImage.width}
              height={site.contactImage.height}
              loading="lazy"
            />
            <figcaption>
              <span>Beyond the screen</span>
              <span>Valk</span>
            </figcaption>
          </figure>
          <div className="contact-content">
            <div data-reveal>
              <h2 id="contact-title">{contact.heading}</h2>
              <p className="contact-description">{contact.text}</p>
              <div className="button-row">
                <Action href={`mailto:${site.email}`}>
                  Email me about a role
                </Action>
                <Action
                  href={resumeHref}
                  secondary
                  icon={<FileText size={17} />}
                >
                  View Resume
                </Action>
              </div>
            </div>
            <div className="contact-links" data-stagger>
              <div className="contact-block">
                <div className="contact-label">
                  <Mail size={22} />
                  <span>Email</span>
                </div>
                <a className="contact-value" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <button className="copy-email" onClick={copyEmail}>
                  {copyState === "copied" ? (
                    <Check size={13} />
                  ) : (
                    <Copy size={13} />
                  )}
                  {copyState === "copied"
                    ? "Email copied"
                    : "Copy email address"}
                </button>
              </div>
              <a
                className="contact-block"
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <div className="contact-label">
                  <Linkedin size={22} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={15} />
                </div>
                <span className="contact-value">linkedin.com/in/vmargin</span>
                <p>Let’s connect professionally.</p>
              </a>
              <a
                className="contact-block"
                href={site.github}
                target="_blank"
                rel="noreferrer"
              >
                <div className="contact-label">
                  <Github size={22} />
                  <span>GitHub</span>
                  <ArrowUpRight size={15} />
                </div>
                <span className="contact-value">github.com/vmargin</span>
                <p>A closer look at the code.</p>
              </a>
            </div>
            <p className="copy-feedback" role="status">
              {copyState === "error"
                ? "Copy unavailable. Select the email address above or open your mail app."
                : copyState === "copied"
                  ? "Email address copied to clipboard."
                  : ""}
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer wrap">
        <div className="footer-main">
          <a className="footer-brand" href="#home">
            <span className="monogram">
              V<span>M</span>
            </span>
            <span>
              Valkenburgh Margin<small>{site.role}</small>
            </span>
          </a>
          <nav aria-label="Footer navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.endsWith(".pdf") ? "_blank" : undefined}
                rel={item.href.endsWith(".pdf") ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-socials">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email Valkenburgh">
              <Mail size={21} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Valkenburgh Margin</span>
          <MotionControl preferences={preferences} />
          <a href="#home">
            Back to Top
            <ArrowUp size={15} />
          </a>
        </div>
      </footer>
      {selected && (
        <ProjectDetails
          project={selected}
          onClose={closeProject}
          animate={motionEnabled && previewFromPointer}
        />
      )}
    </div>
  );
}
