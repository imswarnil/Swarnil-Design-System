import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const PARTIALS = path.join(ROOT, 'partials');
export const SECTIONS = path.join(ROOT, 'sections');
export const SRC = path.join(ROOT, 'src');
export const SITE = path.join(ROOT, 'site');
export const DIST = path.join(ROOT, 'dist');
export const PORT = Number(process.env.PORT) || 4700;
