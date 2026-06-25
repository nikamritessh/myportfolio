// Maps tech icon slugs to CDN logo URLs (devicon / simpleicons).
// The TechCard component falls back to a monogram tile if the image fails.
const dev = (path) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;
const si = (slug) => `https://cdn.simpleicons.org/${slug}`;

const local = (path) => path;

export const techIconMap = {
    react: dev('react/react-original.svg'),
    nextjs: dev('nextjs/nextjs-original.svg'),
    javascript: dev('javascript/javascript-original.svg'),
    typescript: dev('typescript/typescript-original.svg'),
    tailwindcss: dev('tailwindcss/tailwindcss-original.svg'),
    framermotion: si('framer'),
    html5: dev('html5/html5-original.svg'),
    css3: dev('css3/css3-original.svg'),
    fastapi: dev('fastapi/fastapi-original.svg'),
    python: dev('python/python-original.svg'),
    nodejs: dev('nodejs/nodejs-original.svg'),
    php: dev('php/php-original.svg'),
    java: dev('java/java-original.svg'),
    openai: local('/icons/chatgpt.svg'),
    chatgpt: local('/icons/chatgpt.svg'),
    langchain: si('langchain'),
    tensorflow: dev('tensorflow/tensorflow-original.svg'),
    postgresql: dev('postgresql/postgresql-original.svg'),
    mysql: dev('mysql/mysql-original.svg'),
    supabase: dev('supabase/supabase-original.svg'),
    sqlalchemy: dev('sqlalchemy/sqlalchemy-original.svg'),
    prisma: dev('prisma/prisma-original.svg'),
    docker: dev('docker/docker-original.svg'),
    vercel: si('vercel'),
    render: si('render'),
    git: dev('git/git-original.svg'),
    github: si('github'),
    mqtt: si('mqtt'),
    vscode: dev('vscode/vscode-original.svg'),
    cursor: si('cursor'),
    figma: dev('figma/figma-original.svg'),
    flutter: dev('flutter/flutter-original.svg'),
    postman: si('postman'),
};

export const getTechIcon = (slug) => techIconMap[slug] || null;
