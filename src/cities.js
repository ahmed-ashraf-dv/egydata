'use strict';

const cities = require('./data/cities.json');

const idMap = new Map(cities.map((c) => [c.id, c]));

const govMap = new Map();
for (const city of cities) {
  const code = city.governorateCode;
  if (!govMap.has(code)) govMap.set(code, []);
  govMap.get(code).push(city);
}

function getByGovernorate(govCode) {
  if (typeof govCode !== 'string') return [];
  const list = govMap.get(govCode.toUpperCase());
  return list ? [...list] : [];
}

function getById(id) {
  const numId = Number(id);
  if (!Number.isInteger(numId)) return undefined;
  return idMap.get(numId) || undefined;
}

function search(query) {
  if (typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return cities.filter(
    (c) => c.name.includes(q) || c.nameEn.toLowerCase().includes(q)
  );
}

module.exports = { getByGovernorate, getById, search };
