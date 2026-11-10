import {
  about, coursework, education, experience, focusAreas, harmonyBoundaryNote,
  openSource, projects, research, sectionCopy, service, site, talks, toolkit, work,
} from "./content";
import { chatSources } from "./chat";

/** Public, versioned site content only. No runtime filesystem, account, or private-project access. */
export function buildChatProfile() {
  return {
    name: site.name,
    title: site.title,
    location: site.location,
    siteContentUpdated: site.updated,
    researchReviewedAt: research.reviewedAt,
    biography: about.summary,
    workingStyle: about.values,
    service,
    focusAreas,
    toolkit,
    education,
    coursework,
    experience,
    opportunities: sectionCopy.contact.lede,
    contact: {
      email: site.email,
      href: "/contact",
      resume: site.resumeUrl,
      github: site.github,
      linkedin: site.linkedin,
      scheduling: site.calendlyUrl,
      timezone: site.timezone,
    },
    projects: projects.map((project) => ({ ...project, href: `/projects/${project.slug}` })),
    clientWork: [work.greenspace],
    openSource,
    research,
    harmonyBoundaryNote,
    talks,
    sources: chatSources,
  };
}
