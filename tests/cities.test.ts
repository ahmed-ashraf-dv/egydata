import { cities } from '../src/index';

describe('cities', () => {
  describe('getByGovernorate()', () => {
    it('should return cities for Cairo', () => {
      const cairoCities = cities.getByGovernorate('CAI');
      expect(cairoCities.length).toBeGreaterThan(0);
      for (const city of cairoCities) {
        expect(city.governorateCode).toBe('CAI');
      }
    });

    it('should be case-insensitive', () => {
      const result = cities.getByGovernorate('cai');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return a new array each time', () => {
      const a = cities.getByGovernorate('CAI');
      const b = cities.getByGovernorate('CAI');
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });

    it('should return empty array for invalid governorate code', () => {
      expect(cities.getByGovernorate('XYZ')).toEqual([]);
    });

    it('should return empty array for non-string input', () => {
      expect(cities.getByGovernorate(123 as unknown as string)).toEqual([]);
    });

    it('every city should have required fields', () => {
      const all = cities.getByGovernorate('ALX');
      for (const city of all) {
        expect(city).toHaveProperty('id');
        expect(city).toHaveProperty('name');
        expect(city).toHaveProperty('nameEn');
        expect(city).toHaveProperty('governorateCode');
      }
    });

    it('should return cities for all 27 governorates', () => {
      const govCodes = [
        'CAI', 'ALX', 'GIZ', 'PTS', 'SUZ', 'DKH', 'SHR', 'QLB', 'KFS',
        'GHR', 'MNF', 'BHR', 'ISM', 'DMT', 'FYM', 'BNS', 'MNY', 'AST',
        'SHG', 'QNA', 'LXR', 'ASN', 'RED', 'WAD', 'MTR', 'SIN', 'SIS',
      ];
      for (const code of govCodes) {
        const result = cities.getByGovernorate(code);
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getById()', () => {
    it('should return a city by id', () => {
      const city = cities.getById(1);
      expect(city).toBeDefined();
      expect(city!.id).toBe(1);
      expect(city!.governorateCode).toBe('CAI');
    });

    it('should accept string numbers', () => {
      const city = cities.getById('1');
      expect(city).toBeDefined();
      expect(city!.id).toBe(1);
    });

    it('should return undefined for non-existent id', () => {
      expect(cities.getById(99999)).toBeUndefined();
    });

    it('should return undefined for invalid input', () => {
      expect(cities.getById('abc')).toBeUndefined();
      expect(cities.getById(null as unknown as number)).toBeUndefined();
    });
  });

  describe('search()', () => {
    it('should find cities by English name', () => {
      const results = cities.search('Maadi');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].nameEn).toBe('Maadi');
    });

    it('should find cities by Arabic name', () => {
      const results = cities.search('المعادي');
      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it('should find by partial name', () => {
      const results = cities.search('sharm');
      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it('should be case-insensitive', () => {
      const results = cities.search('HURGHADA');
      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it('should return empty array for no match', () => {
      expect(cities.search('NoSuchCity')).toEqual([]);
    });

    it('should return empty array for empty or invalid input', () => {
      expect(cities.search('')).toEqual([]);
      expect(cities.search('  ')).toEqual([]);
      expect(cities.search(null as unknown as string)).toEqual([]);
    });
  });
});
