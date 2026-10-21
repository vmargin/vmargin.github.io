import { renderToString } from "react-dom/server";
import PortfolioHome from "./App";
import { ProjectCaseStudy } from "./ProjectCaseStudy";
import portfolio from "./data/portfolio.json";
import { createMetadata } from "./lib/metadata";

export function render(route: string) {
  const project = portfolio.projects.find((item) => item.href === route);
  if (route !== "/" && !project)
    throw new Error(`Unknown portfolio route: ${route}`);
  return {
    html: renderToString(
      project ? <ProjectCaseStudy project={project} /> : <PortfolioHome />,
    ),
    metadata: createMetadata(project),
  };
}
