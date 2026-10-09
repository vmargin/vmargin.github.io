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
  Moon,
  Pause,
  Play,
  Sun,
  X,
} from "lucide-react";
import portfolio from "./data/portfolio.json";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import { usePortfolioMotion } from "./usePortfolioMotion";
import { Toolkit } from "./components/Toolkit";

type Project = (typeof portfolio.projects)[number];
const { site, about, projects, contact } = portfolio;
type ColorTheme = "dark" | "light";
const themeStorageKey = "v6-theme";
const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];
const shortTitles: Record<string, string> = {
  "cash-g": "CASH-G",
  arctic: "ARCTIC",
  assethub: "AssetHub",
};
const projectTypes: Record<string, string> = {
  "cash-g": "Java · Desktop and Web",
  arctic: "Service operations",
  assethub: "Equipment lifecycle",
};
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
  download = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  icon?: ReactNode;
  className?: string;
  download?: boolean;
}) {
  return (
    <a
      className={`button ${secondary ? "button-outline" : "button-primary"} ${className}`}
      href={href}
      download={download || undefined}
      data-magnetic
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
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

function ProjectDetails({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
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
        <img src={project.cover} alt="" loading="lazy" />
        <figcaption>{project.gallery[0].caption}</figcaption>
      </figure>
      <div className="dialog-body quick-preview-status">
        <Eyebrow>{project.statusText}</Eyebrow>
        <p>{project.role}</p>
        <p>{project.portfolioCheck}</p>
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

export default function App() {
  const path = window.location.pathname.endsWith("/")
    ? window.location.pathname.slice(0, -1) || "/"
    : window.location.pathname;
  const project = projects.find((candidate) => {
    const projectPath = candidate.href.endsWith("/")
      ? candidate.href.slice(0, -1)
      : candidate.href;
    return projectPath === path;
  });
  return project ? <ProjectCaseStudy project={project} /> : <PortfolioHome />;
}

function PortfolioHome() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [theme, setTheme] = useState<ColorTheme>(() => {
    try {
      return localStorage.getItem(themeStorageKey) === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [motionPaused, setMotionPaused] = useState(() => {
    try {
      return localStorage.getItem("v6-motion-paused") === "true";
    } catch {
      return false;
    }
  });
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const projectTrigger = useRef<HTMLButtonElement | null>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const motionEnabled = !systemReduced && !motionPaused;
  usePortfolioMotion(root, motionEnabled, !!selected);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled
      ? "full"
      : "reduced";
    try {
      localStorage.setItem("v6-motion-paused", String(motionPaused));
    } catch {
      /* The preference remains available for this visit. */
    }
  }, [motionEnabled, motionPaused]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f5f3ef" : "#10161c");
    try {
      localStorage.setItem(themeStorageKey, theme);
    } catch {
      /* The selected theme remains active for this visit. */
    }
  }, [theme]);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);
      const cutoff = window.innerHeight * 0.4;
      let current = "home";
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top <= cutoff)
          current = item.href.slice(1);
      }
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
            aria-label="Valkenburgh Margin, home"
          >
            V<span>M</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                href={item.href}
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
            <a className="header-cta" href="#contact">
              Let’s Work Together
              <ArrowRight size={16} />
            </a>
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
              key={item.label}
              aria-current={
                activeSection === item.href.slice(1) ? "location" : undefined
              }
              onClick={() => {
                setMenuOpen(false);
                requestAnimationFrame(() =>
                  menuTrigger.current?.focus({ preventScroll: true }),
                );
              }}
            >
              {item.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-photo is-active"
            src={
              theme === "dark"
                ? "/images/projects/hero-sunset.webp"
                : "/images/projects/hero-sunrise.webp"
            }
            alt=""
            fetchPriority="high"
            aria-hidden="true"
            width="1672"
            height="941"
          />
          <div className="wrap hero-content">
            <div className="hero-reveal">
              <Eyebrow>Hello, I’m</Eyebrow>
            </div>
            <h1 id="hero-title" className="hero-reveal">
              Valkenburgh <span>Margin</span>
            </h1>
            <p className="hero-role hero-reveal">{site.role}</p>
            <p className="hero-description hero-reveal">
              Java applications and backend systems, explained through real
              project screens, source, and verification.
            </p>
            <div className="button-row hero-reveal">
              <Action href="#projects">View Projects</Action>
              <Action
                href={resumeHref}
                secondary
                icon={<FileText size={17} />}
                download={!!site.resumeUrl}
              >
                Download Résumé
              </Action>
            </div>
          </div>
          <div className="hero-bottom wrap">
            <span className="location">
              <MapPin size={16} />
              {site.location}
            </span>
            <a className="scroll-cue" href="#projects">
              <span>Scroll to explore</span>
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section
          className="projects-section section wrap"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <Eyebrow>Featured work</Eyebrow>
              <h2 id="projects-title">Selected projects.</h2>
            </div>
            <p>
              Three application case studies with real screens, clear roles, and
              dated project evidence.
            </p>
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
          <div className="project-grid" data-stagger>
            {projects.map((project, index) => (
              <article className="project-card" key={project.id}>
                <a className="project-open" href={project.href}>
                  <div className="project-image-wrap">
                    <img
                      className="project-cover"
                      src={project.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="project-open-icon" aria-hidden="true">
                      <ArrowUpRight size={20} />
                    </span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta">
                      <span className="project-type">
                        {projectTypes[project.id]}
                      </span>
                      <span className="project-status-label">
                        {project.statusText}
                      </span>
                    </div>
                    <h3>
                      {shortTitles[project.id]}
                      <ArrowUpRight size={19} />
                    </h3>
                    <p>{project.summary}</p>
                    <p className="project-role-summary">
                      {project.roleSummary}
                    </p>
                    <div className="tags">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <span className="case-study-link">
                      Read the case study
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </a>
                <button
                  className="quick-preview-trigger"
                  type="button"
                  onClick={(event) => {
                    projectTrigger.current = event.currentTarget;
                    setSelected(project);
                  }}
                >
                  Quick preview <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>
          <p className="projects-footnote">
            <span className="status-dot" />
            Real projects. Public source. Decisions and verification.
          </p>
        </section>

        <section
          className="about-section section wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-intro">
            <div className="about-copy" data-reveal>
              <Eyebrow>About me</Eyebrow>
              <h2 id="about-title">About</h2>
              <p>{about.intro}</p>
              <p>{about.paragraphs[0]}</p>
              <p>{about.paragraphs[1]}</p>
              <div className="button-row">
                <Action
                  href={resumeHref}
                  icon={<FileText size={17} />}
                  download={!!site.resumeUrl}
                >
                  {site.resumeUrl ? "Download Résumé" : "Request Résumé"}
                </Action>
                <Action href="#contact" secondary>
                  Let’s Connect
                </Action>
              </div>
            </div>
            <figure className="about-image">
              <img
                src="/images/antipolo-original.webp"
                width="1200"
                height="900"
                alt="Valkenburgh looking toward the sky at a hilltop overlooking the city in Antipolo"
                loading="lazy"
              />
              <figcaption>
                <span>Room to think. Space to build.</span>
                <span>
                  Antipolo, PH
                  <ArrowUpRight size={14} />
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <Toolkit />

        <section className="background-section section wrap" id="background">
          <div className="background-heading">
            <Eyebrow>Education and training</Eyebrow>
            <h2>Foundations for the work.</h2>
            <p>
              Formal study and completed training, with public coursework where
              available.
            </p>
          </div>
          <div className="background-grid">
            <article className="background-card">
              <span className="background-date">{about.education.year}</span>
              <h3>{about.education.qualification}</h3>
              <p>{about.education.institution}</p>
              <span className="background-detail">Bachelor’s degree</span>
              <div className="education-coursework">
                <h4>Relevant coursework</h4>
                <ul>
                  {about.education.coursework.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </div>
            </article>
            {about.training.map((item) => (
              <article className="background-card" key={item.id}>
                <span className="background-date">{item.statusText}</span>
                <h3>{item.title}</h3>
                <p>{item.provider}</p>
                <span className="background-detail">{item.detail}</span>
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
                  <a href={item.credentialUrl} target="_blank" rel="noreferrer">
                    View course completion <ArrowUpRight size={14} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <img
            className="contact-photo"
            src="/images/contact-cinematic.webp"
            alt=""
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="contact-shade" />
          <div className="wrap contact-content">
            <div data-reveal>
              <Eyebrow>Contact</Eyebrow>
              <h2 id="contact-title">{contact.heading}</h2>
              <p className="contact-description">{contact.text}</p>
              <div className="button-row">
                <Action href={`mailto:${site.email}`}>Get in Touch</Action>
                <Action
                  href={resumeHref}
                  secondary
                  icon={<FileText size={17} />}
                  download={!!site.resumeUrl}
                >
                  {site.resumeUrl ? "Download Résumé" : "Request Résumé"}
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
              <a key={item.label} href={item.href}>
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
          <button
            className="motion-control"
            onClick={() => setMotionPaused(!motionPaused)}
            aria-pressed={!motionEnabled}
            disabled={systemReduced}
            aria-label={
              systemReduced
                ? "Reduced motion follows your system preference"
                : motionPaused
                  ? "Enable animations"
                  : "Pause animations"
            }
          >
            {motionEnabled ? <Pause size={12} /> : <Play size={12} />}
            {systemReduced
              ? "Reduced motion"
              : motionPaused
                ? "Motion paused"
                : "Motion on"}
          </button>
          <a href="#home">
            Back to Top
            <ArrowUp size={15} />
          </a>
        </div>
      </footer>
      {selected && <ProjectDetails project={selected} onClose={closeProject} />}
    </div>
  );
}
