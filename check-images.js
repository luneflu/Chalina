import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const publicFiles = new Set();
walk('public', (filePath) => {
  const rel = '/' + path.relative('public', filePath).replace(/\\/g, '/');
  publicFiles.add(rel);
});

console.log(`Found ${publicFiles.size} files in public/`);

const regex = /"\/[^"]+\.[a-zA-Z0-9]+"/g;
const regexSingle = /'\/[^']+\.[a-zA-Z0-9]+'/g;

walk('src', (filePath) => {
  if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let match;
    while ((match = regex.exec(content)) !== null) {
      const val = match[0].slice(1, -1);
      if (!publicFiles.has(val) && !val.startsWith('/_astro')) {
        console.log(`In ${filePath}: Referenced ${val} which does not exist in public/`);
      }
    }
    while ((match = regexSingle.exec(content)) !== null) {
      const val = match[0].slice(1, -1);
      if (!publicFiles.has(val) && !val.startsWith('/_astro')) {
        console.log(`In ${filePath}: Referenced ${val} which does not exist in public/`);
      }
    }
  }
});

