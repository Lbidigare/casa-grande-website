// Lists every TBD value and unconfirmed item in the site data.
// Shared by the pages (preview notice) and the build guard in astro.config.mjs.

const isTBD = (v) =>
  v === undefined || v === null || (typeof v === 'string' && (v.trim() === '' || v.trim().toUpperCase() === 'TBD'));

// Fields that may be left blank without blocking launch.
const OPTIONAL = [/^property\.other_listings\./, /\.photos$/, /^gallery$/];

export function findUnconfirmed(data) {
  const found = [];
  const walk = (value, path) => {
    if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${path}[${i}]`));
    } else if (value && typeof value === 'object') {
      if (value.confirmed === false) found.push(`${path} (${value.name ?? 'item'}) is not confirmed`);
      if (value.rent_confirmed === false) found.push(`${path} (${value.name}) rent is not confirmed`);
      for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k);
    } else if (isTBD(value) && !OPTIONAL.some((re) => re.test(path))) {
      found.push(`${path} is TBD`);
    }
  };
  walk(data, '');
  return found;
}
