import { portfolioData } from '../data/portfolio';

const byId = new Map(portfolioData.skills.map((s) => [s.id, s]));

export const skillName = (id: string) => byId.get(id)?.name ?? id;

export const roleById = (id: string) => portfolioData.experience.find((r) => r.id === id);

/** How many roles + engagements reference a skill — drives the usage counter on each skill. */
export const skillUsage = (id: string) => ({
  roles: portfolioData.experience.filter((r) => r.skills.includes(id)).length,
  engagements: portfolioData.engagements.filter((e) => e.skills.includes(id)).length,
});
