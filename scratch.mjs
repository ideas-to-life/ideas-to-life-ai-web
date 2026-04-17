import fs from 'fs';
import path from 'path';

// read all files in patterns
const dir = './src/content/patterns';
const files = fs.readdirSync(dir);
const ids = files.map(f => {
  return f.replace(/\.md$/, '').replace(/\.mdx$/, '');
});
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
console.log("duplicates in patterns:", duplicates);
