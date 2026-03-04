import type { PhoneAreaEntry } from './types';
import areaCodesData from './data/phoneArea.json';

const areaCodes: PhoneAreaEntry[] = areaCodesData;

const codeMap = new Map<string, PhoneAreaEntry>(areaCodes.map((a) => [a.code, a]));

export function getAll(): PhoneAreaEntry[] {
  return [...areaCodes];
}

export function getRegion(code: unknown): PhoneAreaEntry | undefined {
  if (typeof code !== 'string') return undefined;
  const normalized = code.replace(/^0*/, '0');
  return codeMap.get(code) || codeMap.get(normalized) || undefined;
}

export function getCode(regionName: unknown): PhoneAreaEntry | undefined {
  if (typeof regionName !== 'string' || !regionName.trim()) return undefined;
  const q = regionName.trim().toLowerCase();
  return (
    areaCodes.find(
      (a) => a.region.includes(q) || a.regionEn.toLowerCase().includes(q)
    ) || undefined
  );
}
