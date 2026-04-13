import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const distRoot = path.join(root, 'dist');

if (!fs.existsSync(distRoot)) {
  console.error('Missing dist output. Run `npm run build` before `npm run check:links`.');
  process.exit(1);
}

const scanExtensions = new Set(['.md', '.astro', '.ts']);
const ignoredPrefixes = ['/assets/', '/_astro/', '/api/'];
const files = [];
const issues = [];
const linkRegex = /\]\((\/[^)"#?\s]+\/?)(?:[?#][^)]+)?\)/g;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (scanExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
}

function resolveCandidates(url) {
  const normalized = url.replace(/\/+$/, '');
  if (normalized === '') {
    return [path.join(distRoot, 'index.html')];
  }

  const relativePath = normalized.slice(1);
  return [
    path.join(distRoot, relativePath, 'index.html'),
    path.join(distRoot, `${relativePath}.html`),
    path.join(distRoot, relativePath),
  ];
}

walk(srcRoot);

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = linkRegex.exec(text))) {
    const url = match[1];
    if (ignoredPrefixes.some(prefix => url.startsWith(prefix))) {
      continue;
    }

    const candidates = resolveCandidates(url);
    const exists = candidates.some(candidate => fs.existsSync(candidate));

    if (!exists) {
      issues.push({
        file: path.relative(root, file),
        url,
      });
    }
  }
}

if (issues.length > 0) {
  console.error('Broken internal links found:');
  for (const issue of issues) {
    console.error(`- ${issue.file} -> ${issue.url}`);
  }
  process.exit(1);
}

console.log(`OK: validated internal links across ${files.length} source files.`);
