/**
 * Post-build SSG meta injection script.
 *
 * After `vite build` generates the SPA bundle, this script:
 * 1. Reads dist/index.html (the SPA shell)
 * 2. For each tool route: creates dist/{slug}/index.html with correct
 *    <title>, <meta name="description">, <link rel="canonical">, OG tags
 * 3. Creates dist/about/index.html and dist/privacy/index.html with meta
 * 4. Generates dist/sitemap.xml
 *
 * Tool metadata is sourced from locales/en.yml so no JS bundle import is needed.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const TOOLS_DIR = join(ROOT, 'src', 'tools');
const LOCALE_FILE = join(ROOT, 'locales', 'en.yml');
const BASE_URL = 'https://xaygo.com';

// ---------------------------------------------------------------------------
// 1. Load locale data
// ---------------------------------------------------------------------------
const locale = parse(readFileSync(LOCALE_FILE, 'utf-8'));
const toolLocales = locale.tools ?? {};

// ---------------------------------------------------------------------------
// 2. Extract tool paths from each tool's index.ts (path: '/slug')
// ---------------------------------------------------------------------------
const toolSlugs = [];
const toolDirs = readdirSync(TOOLS_DIR).filter((entry) => {
  const full = join(TOOLS_DIR, entry);
  return statSync(full).isDirectory();
});

for (const dir of toolDirs) {
  const indexFile = join(TOOLS_DIR, dir, 'index.ts');
  try {
    const content = readFileSync(indexFile, 'utf-8');
    const match = content.match(/path:\s*'\/([^']+)'/);
    if (match) {
      toolSlugs.push(match[1]);
    }
  }
  catch {
    // skip dirs without index.ts
  }
}

// ---------------------------------------------------------------------------
// 3. Load the SPA shell HTML
// ---------------------------------------------------------------------------
const shellHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');

// ---------------------------------------------------------------------------
// 4. Helper: inject meta tags into the shell <head>
// ---------------------------------------------------------------------------
function injectMeta(html, { title, description, canonical, ogType = 'website' }) {
  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);

  const metaBlock = `
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDesc}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDesc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedDesc}">`.trimStart();

  // Replace the existing <title>…</title> block with injected meta
  return html.replace(/<title>[\s\S]*?<\/title>/, metaBlock);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function writeIndexHtml(slug, html) {
  const dir = join(DIST, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf-8');
}

// ---------------------------------------------------------------------------
// 5. Generate per-tool HTML files
// ---------------------------------------------------------------------------
const generatedRoutes = [`${BASE_URL}/`];

for (const slug of toolSlugs) {
  const meta = toolLocales[slug] ?? {};
  const toolTitle = meta.title ?? slug;
  const toolDesc = meta.description ?? `Free online ${toolTitle} tool — no login required.`;

  const html = injectMeta(shellHtml, {
    title: `${toolTitle} - Free Online Tool | Xaygo`,
    description: toolDesc,
    canonical: `${BASE_URL}/${slug}/`,
    ogType: 'website',
  });

  writeIndexHtml(slug, html);
  generatedRoutes.push(`${BASE_URL}/${slug}/`);
}

// ---------------------------------------------------------------------------
// 6. Generate /about and /privacy pages
// ---------------------------------------------------------------------------
writeIndexHtml(
  'about',
  injectMeta(shellHtml, {
    title: 'About | Xaygo — Free Online Developer Tools',
    description: 'Learn about Xaygo, a free collection of developer tools. No account needed — open and use instantly.',
    canonical: `${BASE_URL}/about/`,
  }),
);
generatedRoutes.push(`${BASE_URL}/about/`);

writeIndexHtml(
  'privacy',
  injectMeta(shellHtml, {
    title: 'Privacy Policy | Xaygo',
    description: 'Xaygo Privacy Policy — how we handle data, cookies (Google AdSense & Analytics), and your rights.',
    canonical: `${BASE_URL}/privacy/`,
  }),
);
generatedRoutes.push(`${BASE_URL}/privacy/`);

writeIndexHtml(
  'terms',
  injectMeta(shellHtml, {
    title: 'Terms and Conditions | Xaygo',
    description: 'Terms and Conditions for using Xaygo — free online developer tools provided as-is with no warranty.',
    canonical: `${BASE_URL}/terms/`,
  }),
);
generatedRoutes.push(`${BASE_URL}/terms/`);

// ---------------------------------------------------------------------------
// 7. Generate sitemap.xml
// ---------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generatedRoutes
  .map(
    url => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n  </url>`,
  )
  .join('\n')}
</urlset>`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf-8');

console.log(`[ssg] Generated ${toolSlugs.length} tool pages + /about + /privacy + /terms`);
console.log(`[ssg] Sitemap written with ${generatedRoutes.length} URLs → dist/sitemap.xml`);
