'use strict';

const governorates = require('./data/governorates.json');

const codeMap = new Map(governorates.map((g) => [g.code, g]));
const idMap = new Map(governorates.map((g) => [g.id, g]));

function getAll() {
  return [...governorates];
}

function getByCode(code) {
  if (typeof code !== 'string') return undefined;
  return codeMap.get(code.toUpperCase()) || undefined;
}

function getById(id) {
  const numId = Number(id);
  if (!Number.isInteger(numId)) return undefined;
  return idMap.get(numId) || undefined;
}

function search(query) {
  if (typeof query !== 'string' || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  return governorates.filter(
    (g) =>
      g.name.includes(q) ||
      g.nameEn.toLowerCase().includes(q) ||
      g.code.toLowerCase().includes(q)
  );
}

module.exports = { getAll, getByCode, getById, search };
