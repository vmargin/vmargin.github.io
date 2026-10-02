import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Box,
  Check,
  CheckCheck,
  CodeXml,
  Copy,
  Database,
  FileText,
  GitBranch,
  Github,
  GraduationCap,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Pause,
  Play,
  Rocket,
  Search,
  Server,
  Sparkles,
  Sun,
  Moon,
  Users,
  X,
} from "lucide-react";
import portfolio from "./data/portfolio.json";
import { ProjectVisual } from "./ProjectVisual";
import { usePortfolioMotion } from "./usePortfolioMotion";

type Project = (typeof portfolio.projects)[number];
const { site, about, projects } = portfolio;
type ColorTheme = "dark" | "light";
const themeStorageKey = "v6-theme";
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
const shortTitles: Record<string, string> = {
  "cash-g": "CASH-G",
  arctic: "ARCTIC",
  "asset-manager": "Asset Manager",
};
const projectTypes: Record<string, string> = {
  "cash-g": "Java desktop",
  arctic: "Service operations",
  "asset-manager": "Full-stack web",
};
const summaries: Record<string, string> = {
  "cash-g": "Every transfer has two sides. Keep them in sync.",
  arctic: "A clearer path from service request to payment.",
  "asset-manager": "Every asset in its place. Every organization in its scope.",
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
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
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
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={() => {
        if (!dialog.current?.open) onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom
          )
            onClose();
        }
      }}
      data-lenis-prevent
    >
      <div className="dialog-top">
        <span className="eyebrow">Project case study / {project.period}</span>
        <button
          className="icon-button dialog-close"
          aria-label="Close project details"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <div className="dialog-heading">
        <p className="eyebrow">{project.type}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.overview}</p>
        <div className="tags">
          {project.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <ProjectVisual id={project.id} />
      <p className="illustration-caption">
        Workflow illustration · not an application screenshot
      </p>
      <div className="dialog-body">
        <section>
          <h3>The workflow</h3>
          <ol>
            {project.workflow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section>
          <h3>Decisions that matter</h3>
          {project.decisions.map((decision) => (
            <div className="decision" key={decision.title}>
              <h4>{decision.title}</h4>
              <p>{decision.body}</p>
            </div>
          ))}
        </section>
        <section>
          <h3>My contribution</h3>
          <p>{project.role}</p>
        </section>
        <section className="project-status">
          <Eyebrow>Recorded project status</Eyebrow>
          <p>{project.currentStatus}</p>
          {project.evolution && (
            <>
              <h4>{project.evolution.heading}</h4>
              <p>{project.evolution.body}</p>
              <a
                href={project.evolution.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explore the web version <ArrowUpRight size={16} />
              </a>
            </>
          )}
          <small>
            Status carried from the source portfolio. These dated checks have
            not been rerun as part of this design build.
          </small>
        </section>
      </div>
      <div className="dialog-actions">
        <a
          className="button button-primary"
          href={project.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} />
          View source
          <ArrowUpRight size={16} />
        </a>
        <button className="text-link" onClick={onNext}>
          Next project
          <ArrowRight size={17} />
        </button>
      </div>
    </dialog>
  );
}

export default function App() {
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
            className={`hero-photo ${theme === "dark" ? "is-active" : ""}`}
            src="/images/hero-full-sunset-v2.png"
            alt=""
            fetchPriority="high"
            aria-hidden="true"
            width="1672"
            height="941"
          />
          <img
            className={`hero-photo ${theme === "light" ? "is-active" : ""}`}
            src="/images/hero-full-sunrise-v2.png"
            alt=""
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
            <p className="hero-role hero-reveal">Software Developer</p>
            <p className="hero-description hero-reveal">
              Building thoughtful digital experiences.
              <br />
              From interface to infrastructure.
            </p>
            <div className="button-row hero-reveal">
              <Action href="#projects">View Projects</Action>
              <Action href="#about" secondary>
                About Me
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
              <h2 id="projects-title">Ideas made tangible.</h2>
            </div>
            <p>
              <span className="section-support-line">
                Java applications and full-stack systems.
              </span>
              <span className="section-support-line">
                Built around the work people need to do.
              </span>
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
                <button
                  className="project-open"
                  aria-label={`View ${shortTitles[project.id]} case study`}
                  onClick={(e) => {
                    projectTrigger.current = e.currentTarget;
                    setSelected(project);
                  }}
                >
                  <div className="project-image-wrap">
                    <ProjectVisual id={project.id} />
                    <span className="project-open-icon">
                      <ArrowUpRight size={20} />
                    </span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta">
                      <span className="project-type">
                        {projectTypes[project.id]}
                      </span>
                      <span className="illustration-label">Illustration</span>
                    </div>
                    <h3>
                      {shortTitles[project.id]}
                      <ArrowUpRight size={19} />
                    </h3>
                    <p>{summaries[project.id]}</p>
                    <div className="tags">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <span className="case-study-link">
                      Explore case study
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <p className="projects-footnote">
            <span className="status-dot" />
            Real projects. Open source. The details behind the decisions.
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
              <h2 id="about-title">Beyond the Code</h2>
              <p className="editorial-copy">
                A curious mind.
                <br />A builder at heart.
              </p>
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
          <div className="strengths">
            <div className="section-heading" data-reveal>
              <div>
                <Eyebrow>What drives me</Eyebrow>
                <h2>
                  A little intention.
                  <br className="mobile-only" /> In everything.
                </h2>
              </div>
              <p>
                How I approach the work,
                <br />
                and the developer I’m working to become.
              </p>
            </div>
            <div className="strength-grid" data-stagger>
              {[
                {
                  Icon: Lightbulb,
                  title: "Product Thinking",
                  text: "Start with the people and the workflow. Build around a problem worth solving.",
                },
                {
                  Icon: CodeXml,
                  title: "Clear Systems",
                  text: "Keep the rules explicit, responsibilities focused, and data boundaries clear.",
                },
                {
                  Icon: BookOpen,
                  title: "Always Learning",
                  text: "Learn by building, checking assumptions, and understanding the decisions behind the code.",
                },
                {
                  Icon: Users,
                  title: "Purpose in the Details",
                  text: "Make the everyday tasks feel simpler, from the first click to the final result.",
                },
              ].map(({ Icon, title, text }) => (
                <article className="strength-card" key={title}>
                  <span className="line-icon">
                    <Icon size={24} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="tech-section" id="stack">
            <div className="tech-heading">
              <Eyebrow>Tools of the trade</Eyebrow>
              <p>Across my current projects.</p>
            </div>
            <div className="tech-list" data-stagger>
              {[
                { name: "Java", icon: <CodeXml />, className: "java" },
                { name: "React", icon: <Sparkles />, className: "react" },
                {
                  name: "TypeScript",
                  icon: <b>TS</b>,
                  className: "typescript",
                },
                { name: "Spring Boot", icon: <Server />, className: "spring" },
                {
                  name: "PostgreSQL",
                  icon: <Database />,
                  className: "postgres",
                },
                { name: "Node.js", icon: <Box />, className: "node" },
                { name: "Git", icon: <GitBranch />, className: "git" },
                { name: "Docker", icon: <Box />, className: "docker" },
              ].map((tech) => (
                <span className={`tech-chip ${tech.className}`} key={tech.name}>
                  {tech.icon}
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="process-section section wrap"
          aria-labelledby="process-title"
        >
          <div className="section-heading process-heading" data-reveal>
            <div>
              <Eyebrow>My approach</Eyebrow>
              <h2 id="process-title">From Idea to Impact</h2>
              <p className="serif-description">
                A thoughtful process. A clearer outcome.
              </p>
            </div>
            <p>
              Understand the problem, make a plan,
              <br />
              then keep learning from what you build.
            </p>
            <a className="text-link" href="#contact">
              Let’s Work Together
              <ArrowRight size={17} />
            </a>
          </div>
          <div className="process-steps" data-stagger>
            <div className="process-track" aria-hidden="true">
              <span className="process-progress" />
            </div>
            {[
              {
                Icon: Search,
                title: "Understand",
                text: "Look at the problem, the people, and the rules that matter.",
              },
              {
                Icon: FileText,
                title: "Plan & Design",
                text: "Map the workflow. Shape the experience. Define the data.",
              },
              {
                Icon: CodeXml,
                title: "Build & Iterate",
                text: "Turn the plan into working pieces, with checks along the way.",
              },
              {
                Icon: Rocket,
                title: "Ship & Improve",
                text: "Review the result, record the limits, and keep improving.",
              },
            ].map(({ Icon, title, text }, index) => (
              <article className="process-step" key={title}>
                <div className="process-icon">
                  <Icon size={27} />
                </div>
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section" aria-labelledby="journey-title">
          <div className="wrap journey-grid">
            <div className="journey-intro" data-reveal>
              <Eyebrow>The journey</Eyebrow>
              <h2 id="journey-title">
                Still curious.
                <br />
                Still building.
              </h2>
              <p className="serif-description">
                Turning curiosity into understanding,
                <br />
                one project at a time.
              </p>
              <a href={resumeHref} className="text-link">
                {site.resumeUrl ? "View My Résumé" : "Request My Résumé"}
                <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="timeline" data-stagger>
              <div className="timeline-track" aria-hidden="true">
                <span className="timeline-progress" />
              </div>
              <article className="milestone">
                <span className="timeline-dot" />
                <span className="milestone-date">September 2026</span>
                <h3>A step into the cloud</h3>
                <p>AWS Cloud Quest: Cloud Practitioner course completed.</p>
                <span className="milestone-detail">
                  Course completion · AWS Training & Certification
                </span>
              </article>
              <article className="milestone">
                <span className="timeline-dot" />
                <span className="milestone-date">2026</span>
                <h3>Building a Java foundation</h3>
                <p>
                  Java Programming NC III training at CIICC. Coursework and the
                  CASH-G banking application.
                </p>
                <a
                  href="https://github.com/vmargin/ciicc92026"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore coursework
                  <ArrowUpRight size={14} />
                </a>
              </article>
              <article className="milestone">
                <span className="timeline-dot" />
                <span className="milestone-date">2020</span>
                <h3>Computer Engineering</h3>
                <p>
                  BS Computer Engineering
                  <br />
                  Polytechnic University of the Philippines
                </p>
                <span className="milestone-detail">
                  <GraduationCap size={14} />
                  Relevant coursework · OOP, data structures, relational
                  databases, software engineering
                </span>
              </article>
            </div>
            <aside className="exploring" data-reveal>
              <Eyebrow>Current focus</Eyebrow>
              <h3>Going a little deeper.</h3>
              <p>Building on the ideas in my projects.</p>
              {[
                {
                  Icon: Server,
                  title: "Spring Boot",
                  text: "Taking CASH-G from desktop to web.",
                },
                {
                  Icon: Database,
                  title: "Relational Systems",
                  text: "Explicit rules. Consistent data.",
                },
                {
                  Icon: CheckCheck,
                  title: "Testing & Verification",
                  text: "Checking behavior, not just output.",
                },
                {
                  Icon: CodeXml,
                  title: "Full-Stack Development",
                  text: "Connecting interfaces to operations.",
                },
              ].map(({ Icon, title, text }) => (
                <div className="focus-card" key={title}>
                  <Icon size={23} />
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
          <div className="journey-bottom wrap">
            <blockquote>
              “A little progress each day
              <br />
              adds up to big results.”
            </blockquote>
            <a className="text-link" href="#contact">
              Let’s build what’s next
              <ArrowRight size={17} />
            </a>
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
              <Eyebrow>Good things start with a conversation</Eyebrow>
              <h2 id="contact-title">
                Let’s Build Something
                <br />
                <em>Meaningful.</em>
              </h2>
              <p className="contact-description">
                <span>Open to junior software development opportunities.</span>
                <span>
                  Java, backend systems, and thoughtful web experiences.
                </span>
                <span>Let’s talk about what we could build together.</span>
              </p>
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
              Valkenburgh Margin<small>Software Developer</small>
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
      {selected && (
        <ProjectDetails
          project={selected}
          onClose={closeProject}
          onNext={() =>
            setSelected(
              projects[
                (projects.findIndex((p) => p.id === selected.id) + 1) %
                  projects.length
              ],
            )
          }
        />
      )}
    </div>
  );
}
