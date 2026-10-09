import { useState } from "react";
import {
  Braces,
  CodeXml,
  Database,
  Layers,
  Server,
  Workflow,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import portfolio from "../data/portfolio.json";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import "./Toolkit.css";

const categories: Record<string, LucideIcon> = {
  languages: Braces,
  backend: Server,
  frontend: Layers,
  data: Database,
  testing: CodeXml,
  delivery: Workflow,
};
const logos: Record<string, string> = {
  Java: "java",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML: "html5",
  CSS: "css3",
  "Spring Boot": "spring",
  "Node.js": "nodejs",
  Express: "express",
  React: "react",
  "Tailwind CSS": "tailwindcss",
  PostgreSQL: "postgresql",
  Prisma: "prisma-mark",
  JUnit: "junit",
  Jest: "jest",
  Maven: "maven",
  Vite: "vitejs",
  Git: "git",
  GitHub: "github",
  Docker: "docker",
  Vercel: "vercel",
};

export function Toolkit() {
  const [active, setActive] = useState("all");
  const groups = portfolio.stack;
  return (
    <section
      className="toolkit section wrap"
      id="stack"
      aria-labelledby="toolkit-title"
    >
      <div className="toolkit-heading" data-reveal>
        <h2 id="toolkit-title">The development toolkit.</h2>
        <p>
          Languages, frameworks, and tools used across my projects and this
          portfolio.
        </p>
      </div>
      <div className="toolkit-shell">
        <aside className="toolkit-focus" data-reveal>
          <div className="toolkit-emblem" aria-hidden="true">
            <img
              src="/images/stack/java.svg"
              width="104"
              height="104"
              alt=""
              loading="lazy"
            />
          </div>
          <Badge variant="outline" className="focus-badge">
            Primary focus
          </Badge>
          <h3>
            Java <span>& backend.</span>
          </h3>
          <p>From desktop applications to database-backed web systems.</p>
          <a href="/projects/cash-g/" className="text-link">
            Explore CASH-G <ArrowUpRight size={16} />
          </a>
        </aside>
        <Tabs value={active} onValueChange={setActive} className="toolkit-tabs">
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
                    const Icon = categories[group.id];
                    return (
                      <article className="toolkit-group" key={group.id}>
                        <div className="toolkit-group-heading">
                          <Icon size={18} aria-hidden="true" />
                          <h3>{group.title}</h3>
                        </div>
                        <p>{group.context}</p>
                        <ul className="toolkit-items">
                          {group.items.map((item) => (
                            <li key={item}>
                              <span className="tech-mark" aria-hidden="true">
                                {logos[item] ? (
                                  <img
                                    src={`/images/stack/${logos[item]}.svg`}
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
      </div>
      <p className="toolkit-note">
        Includes technologies used in AI-assisted projects. Each case study
        explains my contribution and the implementation context.
      </p>
    </section>
  );
}
