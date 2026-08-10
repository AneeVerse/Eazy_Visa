/**
 * Regenerates src/data/airports.js from the Canadian Transportation Agency
 * Listing of World Airports open data API.
 *
 * Usage: node scripts/generate-airports.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://portail-portal.otc-cta.gc.ca/api/Airports';
const outPath = path.join(__dirname, '..', 'src', 'data', 'airports.js');

const popularIndiaCodes = [
  'DEL', 'BOM', 'BLR', 'MAA', 'HYD', 'CCU', 'GOI', 'PNQ', 'COK', 'AMD',
  'IXC', 'LKO', 'JAI', 'ATQ', 'GAU', 'BBI', 'TRV', 'IXB', 'IXE', 'IXM',
  'TRZ', 'NAG', 'PAT', 'SXR', 'IXJ', 'IXR', 'VNS', 'VTZ', 'UDR', 'RPR',
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'easy-visa-airport-sync/1.0' } }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} from ${url}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on('error', reject);
  });
}

function buildAirports(raw) {
  const mapped = raw
    .filter((a) => a.iata && String(a.iata).trim())
    .map((a) => ({
      code: String(a.iata).trim().toUpperCase(),
      name: String(a.nameEn || '').trim(),
      city: String(a.city?.nameEn || '').trim(),
      country: String(a.city?.country?.nameEn || a.country?.nameEn || '').trim(),
    }))
    .filter((a) => a.code && a.name);

  const byCode = new Map();
  for (const a of mapped) {
    if (!byCode.has(a.code)) byCode.set(a.code, a);
  }

  const all = Array.from(byCode.values());
  const popular = [];
  for (const code of popularIndiaCodes) {
    const a = byCode.get(code);
    if (a) popular.push(a);
  }
  const popularCodesPresent = new Set(popular.map((a) => a.code));

  const otherIndia = all
    .filter((a) => a.country === 'India' && !popularCodesPresent.has(a.code))
    .sort((a, b) => a.name.localeCompare(b.name));

  const others = all
    .filter((a) => a.country !== 'India')
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...popular, ...otherIndia, ...others];
}

async function main() {
  console.log('Fetching', API_URL);
  const raw = await fetchJson(API_URL);
  const ordered = buildAirports(raw);

  const header = `// Auto-generated from Canadian Transportation Agency Open Data Portal
// Source: https://portail-portal.otc-cta.gc.ca/api/Airports
// Portal: https://portail-portal.otc-cta.gc.ca/en/listing-world-airports
// Generated: ${new Date().toISOString().slice(0, 10)}
// Count: ${ordered.length}

export const airports = `;

  const body = JSON.stringify(ordered, null, 2).replace(/"([^"]+)":/g, '$1:');
  fs.writeFileSync(outPath, `${header}${body};\n\nexport default airports;\n`, 'utf8');

  console.log('Wrote', ordered.length, 'airports to', outPath);
  console.log('India:', ordered.filter((a) => a.country === 'India').length);
  console.log('File size KB:', Math.round(fs.statSync(outPath).size / 1024));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
