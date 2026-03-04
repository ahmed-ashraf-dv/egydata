import { phoneArea } from '../src/index';

describe('phoneArea', () => {
  describe('getAll()', () => {
    it('should return all area codes', () => {
      const all = phoneArea.getAll();
      expect(all.length).toBeGreaterThan(0);
    });

    it('should return a new array each time', () => {
      const a = phoneArea.getAll();
      const b = phoneArea.getAll();
      expect(a).not.toBe(b);
      expect(a).toEqual(b);
    });

    it('every entry should have code, region, regionEn', () => {
      const all = phoneArea.getAll();
      for (const entry of all) {
        expect(entry).toHaveProperty('code');
        expect(entry).toHaveProperty('region');
        expect(entry).toHaveProperty('regionEn');
        expect(typeof entry.code).toBe('string');
        expect(typeof entry.region).toBe('string');
        expect(typeof entry.regionEn).toBe('string');
      }
    });

    it('should include major area codes', () => {
      const all = phoneArea.getAll();
      const codes = all.map((a) => a.code);
      expect(codes).toContain('02');
      expect(codes).toContain('03');
      expect(codes).toContain('050');
      expect(codes).toContain('055');
    });
  });

  describe('getRegion()', () => {
    it('should return Cairo & Giza for code "02"', () => {
      const result = phoneArea.getRegion('02');
      expect(result).toBeDefined();
      expect(result!.regionEn).toBe('Cairo & Giza');
    });

    it('should return Alexandria for code "03"', () => {
      const result = phoneArea.getRegion('03');
      expect(result).toBeDefined();
      expect(result!.regionEn).toBe('Alexandria');
    });

    it('should return undefined for invalid code', () => {
      expect(phoneArea.getRegion('999')).toBeUndefined();
    });

    it('should return undefined for non-string input', () => {
      expect(phoneArea.getRegion(2 as unknown as string)).toBeUndefined();
      expect(phoneArea.getRegion(null as unknown as string)).toBeUndefined();
    });
  });

  describe('getCode()', () => {
    it('should find area code by English region name', () => {
      const result = phoneArea.getCode('Alexandria');
      expect(result).toBeDefined();
      expect(result!.code).toBe('03');
    });

    it('should find area code by Arabic region name', () => {
      const result = phoneArea.getCode('الإسكندرية');
      expect(result).toBeDefined();
      expect(result!.code).toBe('03');
    });

    it('should find by partial name', () => {
      const result = phoneArea.getCode('Mansoura');
      expect(result).toBeDefined();
      expect(result!.code).toBe('050');
    });

    it('should return undefined for no match', () => {
      expect(phoneArea.getCode('NoSuchRegion')).toBeUndefined();
    });

    it('should return undefined for empty or invalid input', () => {
      expect(phoneArea.getCode('')).toBeUndefined();
      expect(phoneArea.getCode('  ')).toBeUndefined();
      expect(phoneArea.getCode(null as unknown as string)).toBeUndefined();
    });
  });
});
