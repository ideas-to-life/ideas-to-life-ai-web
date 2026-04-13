import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'src', 'content');

const collectionDirs = {
  experiments: path.join(contentRoot, 'experiments'),
  learnings: path.join(contentRoot, 'learnings'),
};

function collectMarkdownFiles(dir, bucket = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMarkdownFiles(fullPath, bucket);
      continue;
    }
    if (entry.name.endsWith('.md')) {
      bucket.push(fullPath);
    }
  }
  return bucket;
}

function parseFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  if (!text.startsWith('---\n')) {
    return {};
  }

  const end = text.indexOf('\n---', 4);
  if (end === -1) {
    return {};
  }

  const raw = text.slice(4, end);
  const data = {};

  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.+)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    const value = rawValue.trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = [...value.matchAll(/"([^"]+)"/g)].map(item => item[1]);
      continue;
    }

    if (value.startsWith('"') && value.endsWith('"')) {
      data[key] = value.slice(1, -1);
      continue;
    }

    data[key] = value;
  }

  return data;
}

function deriveLearningSlug(filePath, frontmatter) {
  if (typeof frontmatter.slug === 'string' && frontmatter.slug.length > 0) {
    return frontmatter.slug;
  }

  const relative = path.relative(collectionDirs.learnings, filePath);
  return relative.replace(/\\/g, '/').replace(/\.md$/, '');
}

function deriveFlatSlug(filePath, frontmatter, baseDir) {
  if (typeof frontmatter.slug === 'string' && frontmatter.slug.length > 0) {
    return frontmatter.slug;
  }

  return path.relative(baseDir, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
}

const experimentSlugs = new Set(
  collectMarkdownFiles(collectionDirs.experiments).map(file => {
    const frontmatter = parseFrontmatter(file);
    return deriveFlatSlug(file, frontmatter, collectionDirs.experiments);
  })
);

const learningSlugs = new Set(
  collectMarkdownFiles(collectionDirs.learnings).map(file => {
    const frontmatter = parseFrontmatter(file);
    return deriveLearningSlug(file, frontmatter);
  })
);

const patternFiles = collectMarkdownFiles(path.join(contentRoot, 'patterns'));
const issues = [];

for (const file of patternFiles) {
  const frontmatter = parseFrontmatter(file);
  const relatedExperiments = Array.isArray(frontmatter.relatedExperiments)
    ? frontmatter.relatedExperiments
    : [];
  const relatedLearnings = Array.isArray(frontmatter.relatedLearnings)
    ? frontmatter.relatedLearnings
    : [];

  relatedExperiments.forEach((slug, index) => {
    if (!experimentSlugs.has(slug)) {
      issues.push({
        file: path.relative(root, file),
        field: `relatedExperiments[${index}]`,
        value: slug,
        expected: 'experiment slug',
      });
    }
  });

  relatedLearnings.forEach((slug, index) => {
    if (!learningSlugs.has(slug)) {
      issues.push({
        file: path.relative(root, file),
        field: `relatedLearnings[${index}]`,
        value: slug,
        expected: 'learning slug',
      });
    }
  });
}

if (issues.length > 0) {
  console.error('Invalid content references found:');
  for (const issue of issues) {
    console.error(`- ${issue.file} -> ${issue.field} = "${issue.value}" (missing ${issue.expected})`);
  }
  process.exit(1);
}

console.log(
  `OK: validated content references across ${patternFiles.length} pattern files.`
);
