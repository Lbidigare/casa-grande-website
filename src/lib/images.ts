// Looks up photos, floor plans and logo files named in casa-grande.yaml.
import type { ImageMetadata } from 'astro';
import { isTBD } from './site';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,svg}',
  { eager: true },
);

function find(folder: string, name: unknown): ImageMetadata | undefined {
  if (isTBD(name)) return undefined;
  const key = `/src/assets/${folder}/${String(name).replace(/^\/+/, '')}`;
  const match = files[key];
  if (!match) {
    throw new Error(`Image not found: ${key.slice(1)}. Check the file name in src/data/casa-grande.yaml.`);
  }
  return match.default;
}

export const photo = (name: unknown) => find('photos', name);
export const floorPlan = (name: unknown) => find('floorplans', name);

/** First logo file found in src/assets/brand/, if any. */
export const logo: ImageMetadata | undefined = Object.entries(files)
  .filter(([key]) => key.startsWith('/src/assets/brand/'))
  .map(([, mod]) => mod.default)[0];
