import portfolio from "../data/portfolio.json";

type Project = (typeof portfolio.projects)[number];

/** Build and browser routes consume the same content and metadata contract. */
export function createMetadata(project?: Project) {
  const { site } = portfolio;
  const title = project ? `${project.title} | ${site.displayName}` : site.title;
  const description = project?.summary ?? site.description;
  const url = site.canonicalOrigin + (project?.href ?? "/");
  const image =
    site.canonicalOrigin +
    (project?.cover ?? "/images/portraits/about-portrait.webp");
  const imageAlt =
    project?.gallery[0]?.alt ?? `Portrait of ${site.displayName}`;
  const structuredData = project
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url,
        image,
        about: { "@type": "CreativeWork", name: project.title, description },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.displayName,
        alternateName: "Valk",
        jobTitle: site.role,
        description,
        url,
        image,
        sameAs: [site.github, site.linkedin],
      };
  return { title, description, url, image, imageAlt, structuredData };
}

export function applyMetadata(metadata: ReturnType<typeof createMetadata>) {
  document.title = metadata.title;
  const entries = [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:url"]', metadata.url],
    ['meta[property="og:image"]', metadata.image],
    ['meta[property="og:image:alt"]', metadata.imageAlt],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
    ['meta[name="twitter:image"]', metadata.image],
  ] as const;
  for (const [selector, content] of entries)
    document.querySelector(selector)?.setAttribute("content", content);
  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", metadata.url);
  const structured = document.getElementById("portfolio-structured-data");
  if (structured)
    structured.textContent = JSON.stringify(metadata.structuredData);
}
