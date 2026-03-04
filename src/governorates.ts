import type { Governorate } from './types';
import governoratesData from './data/governorates.json';

const governorates: Governorate[] = governoratesData;

const codeMap = new Map<string, Governorate>(governorates.map((g) => [g.code, g]));
const idMap = new Map<number, Governorate>(governorates.map((g) => [g.id, g]));

export function getAll(): Governorate[] {
  return [...governorates];
}

export function getByCode(code: unknown): Governorate | undefined {
  if (typeof code !== 'string') return undefined;
  return codeMap.get(code.toUpperCase()) || undefined;
}

export function getById(id: unknown): Governorate | undefined {
  const numId = Number(id);
  if (!Number.isInteger(numId)) return undefined;
  return idMap.get(numId) || undefined;
}

export function search(query: unknown): Governorate[] {
  if (typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return governorates.filter(
    (g) =>
      g.name.includes(q) ||
      g.nameEn.toLowerCase().includes(q) ||
      g.code.toLowerCase().includes(q)
  );
}
