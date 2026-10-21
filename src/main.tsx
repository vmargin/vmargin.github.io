import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./ui.css";
import "./styles.css";
import "./portfolio-updates.css";
import portfolio from "./data/portfolio.json";
import { applyMetadata, createMetadata } from "./lib/metadata";

const route = window.location.pathname.replace(/\/$/, "") || "/";
const project = portfolio.projects.find(
  (item) => item.href.replace(/\/$/, "") === route,
);
if (project || route === "/") applyMetadata(createMetadata(project));
const root = document.getElementById("root");
if (!root) throw new Error("Portfolio root is missing");
let page: React.ReactNode;
if (project) {
  const { ProjectCaseStudy } = await import("./ProjectCaseStudy");
  page = <ProjectCaseStudy project={project} />;
} else if (route === "/") {
  const { default: PortfolioHome } = await import("./App");
  page = <PortfolioHome />;
} else {
  page = (
    <main className="section wrap">
      <h1>Page not found</h1>
      <p>
        <a className="text-link" href="/">
          Return to the portfolio
        </a>
      </p>
    </main>
  );
}
const application = <React.StrictMode>{page}</React.StrictMode>;
if (root.hasChildNodes() && (project || route === "/"))
  ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
