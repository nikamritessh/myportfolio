import { projects, experiences, caseStudies } from '../data';

/**
 * INTERNAL: Calculate accurate months between two dates
 */
const getMonthsBetween = (startDate, endDate = null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    // Calculate raw months difference
    let months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

    // Day-based adjustment:
    // If the end day is less than the start day, the current month has 
    // "started but is not complete", so we don't count it.
    if (end.getDate() < start.getDate()) {
        months--;
    }

    return Math.max(months, 0);
};

/**
 * ✅ REQUIRED BY UI
 * Calculate duration for a SINGLE experience
 */
export const calculateDuration = (startDate, endDate = null) => {
    const totalMonths = getMonthsBetween(startDate, endDate);

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
    };
};

/**
 * Format duration for UI
 * Example: "1 yr 8 mos"
 */
export const formatDuration = ({ years, months }) => {
    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ') || '1 mo';
};

/**
 * TOTAL REAL EXPERIENCE (Linear span from career start to present)
 */
export const getTotalExperience = () => {
    if (!experiences || experiences.length === 0) {
        return { years: 0, months: 0 };
    }

    // Get the earliest start date across all experiences
    const startDates = experiences.map(exp => new Date(exp.startDate).getTime());
    const earliestStart = new Date(Math.min(...startDates));

    const totalMonths = getMonthsBetween(earliestStart, null);

    return {
        years: Math.floor(totalMonths / 12),
        months: totalMonths % 12
    };
};

/**
 * Portfolio hero stats
 */
export const getPortfolioStats = () => {
    const totalExperience = getTotalExperience();

    return {
        experienceYears: totalExperience.years, // e.g. 2 for "02+ Years"
        experienceLabel: formatDuration(totalExperience),
        projectsCount: projects.length,
        caseStudiesCount: caseStudies.length
    };
};
