// Loads src/data/casa-grande.yaml and provides small helpers used by every page.
import { parse } from 'yaml';
import raw from '../data/casa-grande.yaml?raw';
import { findUnconfirmed } from './checks.mjs';

export const site = parse(raw);
export const preview: boolean = site.preview_mode !== false;

/** True when a value is missing or written as TBD. */
export function isTBD(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') return value.trim() === '' || value.trim().toUpperCase() === 'TBD';
  return false;
}

/** Amenities to display: everything in preview mode, confirmed items only at launch. */
export function visible<T extends { confirmed?: boolean }>(items: T[] = []): T[] {
  return preview ? items : items.filter((i) => i.confirmed);
}

/** Prefix an internal path with the site's base path (needed on GitHub Pages). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatRent(amount: unknown): string | null {
  if (isTBD(amount) || Number.isNaN(Number(amount))) return null;
  return `$${Number(amount).toLocaleString('en-US')}`;
}

export const telLink = `tel:+1${String(site.contact.phone).replace(/\D/g, '').slice(-10)}`;
export const mailLink = `mailto:${site.contact.email}`;

export function fullAddress(): string | null {
  const p = site.property;
  if ([p.street_address, p.city, p.state, p.zip].some(isTBD)) return null;
  return `${p.street_address}, ${p.city}, ${p.state} ${p.zip}`;
}

export const unconfirmed = findUnconfirmed(site);
