import { projects } from '../data';

export const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/\+/g, ' plus ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const getProjectsWithSlugs = () =>
    projects.map((p) => ({ ...p, slug: slugify(p.title) }));

export const getProjectBySlug = (slug) => {
    const all = getProjectsWithSlugs();
    const index = all.findIndex((p) => p.slug === slug);
    if (index === -1) return null;
    return {
        project: all[index],
        prev: index > 0 ? all[index - 1] : null,
        next: index < all.length - 1 ? all[index + 1] : null,
    };
};

export const getRelatedProjects = (slug, limit = 2) => {
    const all = getProjectsWithSlugs();
    const current = all.find((p) => p.slug === slug);
    if (!current) return all.slice(0, limit);
    const sameCategory = all.filter(
        (p) => p.slug !== slug && p.category === current.category
    );
    const others = all.filter(
        (p) => p.slug !== slug && p.category !== current.category
    );
    return [...sameCategory, ...others].slice(0, limit);
};
