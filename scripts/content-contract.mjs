import { z } from "zod";

const text = z.string().trim().min(1);
const local = z
  .string()
  .regex(/^\/(?!\/)(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]*$/)
  .refine((value) => !value.split("/").includes(".."));
const https = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return url.protocol === "https:" && !url.username && !url.password;
}, "Expected a public HTTPS URL");
const link = z.union([https, local, z.string().regex(/^#[a-z][a-z0-9-]*$/)]);
const projectId = z.enum(["cash-g", "arctic", "assethub"]);
const gallery = z.object({
  src: local,
  alt: text,
  caption: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const image = z.object({
  src: local,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const sourceLink = z.object({ label: text, href: https }).passthrough();
const version = z
  .object({ title: text, summary: text, sourceUrl: https })
  .passthrough();
const project = z.object({
  id: projectId,
  title: text,
  type: text,
  period: text,
  featured: z.boolean(),
  summary: text,
  roleSummary: text,
  stack: z.array(text).min(1),
  statusText: text,
  href: z.string().regex(/^\/projects\/(cash-g|arctic|assethub)\/$/),
  sourceUrl: https,
  applicationUrl: https,
  cover: local,
  gallery: z.array(gallery).min(1),
  overview: text,
  architecture: z.object({
    summary: text,
    groups: z
      .array(z.object({ title: text, steps: z.array(text).min(1) }))
      .min(1),
  }),
  accessModel: z
    .object({
      summary: text,
      roles: z.array(z.object({ name: text, scope: text })).min(1),
      evidence: z.array(sourceLink),
    })
    .nullable(),
  workflow: z.array(text).min(1),
  decisions: z
    .array(
      z.object({
        title: text,
        body: text,
        evidenceUrl: https.optional(),
        galleryHref: z
          .string()
          .regex(/^#screen-[1-3]$/)
          .optional(),
        galleryLabel: text.optional(),
      }),
    )
    .min(1),
  sourceEvidence: z.array(sourceLink.extend({ detail: text })).min(1),
  role: text,
  versions: z.array(version),
  verificationTitle: text,
  verificationSummary: text,
  verificationUrl: https,
  portfolioCheck: text,
  applicationNote: text.nullable(),
  previewNote: text,
  previewLabel: text,
  demoAccess: text,
  limitations: z.array(text),
  nextProjectId: projectId,
});
const schema = z.object({
  site: z.object({
    displayName: text,
    brandMark: text,
    role: text,
    location: text,
    heroHeadline: text,
    heroDescription: text,
    availability: text,
    title: text,
    description: text,
    canonicalOrigin: https.refine((value) => new URL(value).origin === value),
    email: z.email(),
    github: https,
    linkedin: https,
    resumeUrl: local,
    portraitUrl: local,
    contactImage: z.object({
      src: local,
      alt: text,
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      sources: z
        .array(
          z.object({
            src: local,
            width: z.number().int().positive(),
            height: z.number().int().positive(),
          }),
        )
        .min(1),
    }),
    navigation: z.array(z.object({ label: text, href: link })).min(1),
  }),
  about: z.object({
    title: text,
    portraits: z.object({
      black: image.extend({ alt: text }),
      white: image.extend({ alt: text }),
    }),
    bulb: image,
    intro: text,
    paragraphs: z.array(text).min(2),
    education: z.object({
      qualification: text,
      institution: text,
      year: text,
      description: text,
      coursework: z.array(text),
    }),
    training: z.array(
      z.object({
        id: text,
        title: text,
        provider: text,
        statusText: text,
        detail: text,
        credentialUrl: local.nullable(),
        relatedLink: sourceLink.nullable(),
      }),
    ),
  }),
  projects: z.array(project).length(3),
  stack: z
    .array(
      z.object({
        id: z.enum([
          "languages",
          "backend",
          "frontend",
          "data",
          "testing",
          "delivery",
        ]),
        title: text,
        context: text,
        items: z.array(text).min(1),
      }),
    )
    .length(6),
  aiWorkflow: z.object({
    title: text,
    summary: text,
    tools: z.array(text).min(1),
  }),
  contact: z.object({ heading: text, text: text }).passthrough(),
});

export function validatePortfolio(input) {
  const data = schema.parse(input);
  for (const key of ["id", "href"]) {
    if (
      new Set(data.projects.map((item) => item[key])).size !==
      data.projects.length
    )
      throw new Error(`Duplicate project ${key}`);
  }
  for (const item of data.projects) {
    for (const decision of item.decisions) {
      if (Boolean(decision.galleryHref) !== Boolean(decision.galleryLabel))
        throw new Error(
          "Screenshot references require both an anchor and a label",
        );
      if (
        decision.galleryHref &&
        Number(decision.galleryHref.replace("#screen-", "")) >
          item.gallery.length
      )
        throw new Error(
          `Unknown screenshot reference: ${decision.galleryHref}`,
        );
    }
    if (item.href !== `/projects/${item.id}/`)
      throw new Error(`Route does not match project ${item.id}`);
    if (!data.projects.some((candidate) => candidate.id === item.nextProjectId))
      throw new Error("Unknown next project");
    if (!item.gallery.some((image) => image.src === item.cover))
      throw new Error("Cover is absent from gallery");
  }
  if (new Set(data.stack.map((item) => item.id)).size !== data.stack.length)
    throw new Error("Duplicate stack category");
  return data;
}
