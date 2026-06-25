/**
 * Central site configuration — single source for contact, social, and availability.
 * Use this instead of hardcoding values across pages and components.
 */
export const site = {
  name: 'Ritesh Nikam',
  title: 'Full Stack AI Engineer',
  email: 'nikamritesh778@gmail.com',
  phone: '+91 9136788710',
  phoneHref: 'tel:+919136788710',
  location: 'Mumbai, India',
  timezone: 'IST (UTC+5:30)',
  url: 'https://riteshnikam.dev',
  github: {
    url: 'https://github.com/nikamritessh',
    handle: 'nikamritessh',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/ritessh-nikam',
    label: 'Ritesh Nikam',
  },
  social: {
    github: 'https://github.com/nikamritessh',
    linkedin: 'https://www.linkedin.com/in/ritessh-nikam',
    email: 'mailto:nikamritesh778@gmail.com',
  },
  availability: {
    status: 'Available',
    remote: true,
    hybrid: true,
    relocation: 'Open',
    responseTime: 'Within 24 hours',
  },
  /** Resume PDF — opens directly in browser */
  resumePdf: '/resume/Ritessh_resume.pdf',
};

/** Opens Gmail compose in a new browser tab */
export function gmailComposeUrl({ subject = '', body = '' } = {}) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: site.email,
  });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
