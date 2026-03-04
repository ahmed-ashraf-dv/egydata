import { governorates } from '../src/index';

describe('governorates', () => {
  describe('getAll()', () => {
    it('should return all 27 governorates', () => {
      const all = governorates.getAll();
      expect(all).toHaveLength(27);
    });

    it('should return a new array each time (not the internal reference)', () => {
      const a = governorates.getAll();
      const b = governorates.getAll();
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });

    it('every governorate should have id, code, name, nameEn', () => {
      const all = governorates.getAll();
      for (const gov of all) {
        expect(gov).toHaveProperty('id');
        expect(gov).toHaveProperty('code');
        expect(gov).toHaveProperty('name');
        expect(gov).toHaveProperty('nameEn');
        expect(typeof gov.id).toBe('number');
        expect(typeof gov.code).toBe('string');
        expect(typeof gov.name).toBe('string');
        expect(typeof gov.nameEn).toBe('string');
      }
    });

    it('should have unique ids and codes', () => {
      const all = governorates.getAll();
      const ids = all.map((g) => g.id);
      const codes = all.map((g) => g.code);
      expect(new Set(ids).size).toBe(27);
      expect(new Set(codes).size).toBe(27);
    });
  });

  describe('getByCode()', () => {
    it('should return Cairo for code "CAI"', () => {
      const gov = governorates.getByCode('CAI');
      expect(gov).toBeDefined();
      expect(gov!.nameEn).toBe('Cairo');
      expect(gov!.name).toBe('القاهرة');
    });

    it('should be case-insensitive', () => {
      const gov = governorates.getByCode('cai');
      expect(gov).toBeDefined();
      expect(gov!.nameEn).toBe('Cairo');
    });

    it('should return undefined for invalid code', () => {
      expect(governorates.getByCode('XYZ')).toBeUndefined();
    });

    it('should return undefined for non-string input', () => {
      expect(governorates.getByCode(123 as unknown as string)).toBeUndefined();
      expect(governorates.getByCode(null as unknown as string)).toBeUndefined();
    });
  });

  describe('getById()', () => {
    it('should return Cairo for id 1', () => {
      const gov = governorates.getById(1);
      expect(gov).toBeDefined();
      expect(gov!.code).toBe('CAI');
    });

    it('should accept string numbers', () => {
      const gov = governorates.getById('1');
      expect(gov).toBeDefined();
      expect(gov!.code).toBe('CAI');
    });

    it('should return undefined for non-existent id', () => {
      expect(governorates.getById(999)).toBeUndefined();
    });

    it('should return undefined for invalid input', () => {
      expect(governorates.getById('abc')).toBeUndefined();
      expect(governorates.getById(1.5)).toBeUndefined();
    });
  });

  describe('search()', () => {
    it('should find governorates by English name', () => {
      const results = governorates.search('cairo');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].nameEn).toBe('Cairo');
    });

    it('should find governorates by Arabic name', () => {
      const results = governorates.search('القاهرة');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].name).toBe('القاهرة');
    });

    it('should find governorates by partial name', () => {
      const results = governorates.search('alex');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].nameEn).toBe('Alexandria');
    });

    it('should be case-insensitive for English search', () => {
      const results = governorates.search('LUXOR');
      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it('should return empty array for no match', () => {
      expect(governorates.search('NonExistent')).toEqual([]);
    });

    it('should return empty array for empty string', () => {
      expect(governorates.search('')).toEqual([]);
      expect(governorates.search('   ')).toEqual([]);
    });

    it('should return empty array for non-string input', () => {
      expect(governorates.search(123 as unknown as string)).toEqual([]);
      expect(governorates.search(null as unknown as string)).toEqual([]);
    });
  });
});
