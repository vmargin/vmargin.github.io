import { useRef, useState } from "react";
import {
  Braces,
  CodeXml,
  Database,
  Layers,
  Server,
  Workflow,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import portfolio from "../data/portfolio.json";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useNativeEntry } from "../useNativeMotion";
import "./Toolkit.css";

const categories: Record<string, LucideIcon> = {
  languages: Braces,
  backend: Server,
  frontend: Layers,
  data: Database,
  testing: CodeXml,
  delivery: Workflow,
  ai: Sparkles,
};
const logos: Record<string, string> = {
  Java: "java.svg",
  TypeScript: "typescript.svg",
  JavaScript: "javascript.svg",
  HTML: "html5.svg",
  CSS: "css3.svg",
  "Spring Boot": "spring.svg",
  "Node.js": "nodejs.svg",
  Express: "express.svg",
  Swing: "java.svg",
  Thymeleaf: "thymeleaf.svg",
  Zod: "zod.webp",
  React: "react.svg",
  "Tailwind CSS": "tailwindcss.svg",
  "TanStack Query": "tanstack.webp",
  "shadcn/ui": "shadcnui.svg",
  GSAP: "gsap.svg",
  PostgreSQL: "postgresql.svg",
  Prisma: "prisma-mark.svg",
  JDBC: "java.svg",
  JUnit: "junit.svg",
  Jest: "jest.svg",
  "Node.js Test Runner": "nodejs.svg",
  Maven: "maven.svg",
  Vite: "vitejs.svg",
  npm: "npm.svg",
  Git: "git.svg",
  GitHub: "github.svg",
  Docker: "docker.svg",
  Vercel: "vercel.svg",
};

export function Toolkit({ motionEnabled }: { motionEnabled: boolean }) {
  const root = useRef<HTMLElement>(null);
  const pointerInput = useRef(false);
  const [{ active, pointer }, setSelection] = useState({
    active: "all",
    pointer: false,
  });
  const groups = portfolio.stack;
  const [expanded, setExpanded] = useState(false);
  useNativeEntry(root, motionEnabled && pointer, "toolkit", active);
  return (
    <section
      ref={root}
      onPointerDownCapture={() => {
        pointerInput.current = true;
      }}
      onKeyDownCapture={() => {
        pointerInput.current = false;
      }}
      className="toolkit section wrap"
      id="stack"
      tabIndex={-1}
      aria-labelledby="toolkit-title"
    >
      <div className="toolkit-heading" data-reveal>
        <h2 id="toolkit-title">The development toolkit.</h2>
        <p>
          Languages, frameworks, and tools used across my projects and this
          portfolio.
        </p>
      </div>
      <Tabs
        value={active}
        onValueChange={(value) =>
          setSelection({ active: value, pointer: pointerInput.current })
        }
        className="toolkit-tabs"
      >
        <TabsList
          className="toolkit-tablist"
          aria-label="Browse technologies by category"
        >
          <TabsTrigger value="all">All</TabsTrigger>
          {groups.map((group) => (
            <TabsTrigger value={group.id} key={group.id}>
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {["all", ...groups.map((group) => group.id)].map((filter) => (
          <TabsContent value={filter} key={filter} className="toolkit-panel">
            <div className="toolkit-grid">
              {groups
                .filter((group) => filter === "all" || group.id === filter)
                .map((group) => {
                  const Icon = categories[group.id] ?? CodeXml;
                  return (
                    <article className="toolkit-group" key={group.id}>
                      <div className="toolkit-group-heading">
                        <Icon size={18} aria-hidden="true" />
                        <h3>{group.title}</h3>
                      </div>
                      <p>{group.context}</p>
                      <ul className="toolkit-items">
                        {(filter === "all" && !expanded
                          ? group.items.slice(0, 3)
                          : group.items
                        ).map((item) => (
                          <li key={item}>
                            <span className="tech-mark" aria-hidden="true">
                              {logos[item] ? (
                                <img
                                  src={`/images/stack/${logos[item]}`}
                                  alt=""
                                  width="22"
                                  height="22"
                                  loading="lazy"
                                />
                              ) : (
                                <Icon size={20} />
                              )}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      {active === "all" && (
        <button
          className="toolkit-expand text-link"
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show core technologies" : "Show all technologies"}
        </button>
      )}
      <p className="toolkit-note">
        Browse a category for the complete inventory.
      </p>
    </section>
  );
}
