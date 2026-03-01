'use strict';

const areaCodes = require('./data/phoneArea.json');

const codeMap = new Map(areaCodes.map((a) => [a.code, a]));

function getAll() {
  return [...areaCodes];
}

function getRegion(code) {
  if (typeof code !== 'string') return undefined;
  const normalized = code.replace(/^0*/, '0');
  return codeMap.get(code) || codeMap.get(normalized) || undefined;
}

function getCode(regionName) {
  if (typeof regionName !== 'string' || !regionName.trim()) return undefined;
  const q = regionName.trim().toLowerCase();
  return (
    areaCodes.find(
      (a) => a.region.includes(q) || a.regionEn.toLowerCase().includes(q)
    ) || undefined
  );
}

module.exports = { getAll, getRegion, getCode };
