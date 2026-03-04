import type { City } from './types';
import citiesData from './data/cities.json';

const cities: City[] = citiesData;

const idMap = new Map<number, City>(cities.map((c) => [c.id, c]));

const govMap = new Map<string, City[]>();
for (const city of cities) {
  const code = city.governorateCode;
  if (!govMap.has(code)) govMap.set(code, []);
  govMap.get(code)!.push(city);
}

export function getByGovernorate(govCode: unknown): City[] {
  if (typeof govCode !== 'string') return [];
  const list = govMap.get(govCode.toUpperCase());
  return list ? [...list] : [];
}

export function getById(id: unknown): City | undefined {
  const numId = Number(id);
  if (!Number.isInteger(numId)) return undefined;
  return idMap.get(numId) || undefined;
}

export function search(query: unknown): City[] {
  if (typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return cities.filter(
    (c) => c.name.includes(q) || c.nameEn.toLowerCase().includes(q)
  );
}
