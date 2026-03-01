const { timezone } = require('../src/index');

describe('timezone', () => {
  describe('properties', () => {
    it('should have name "Africa/Cairo"', () => {
      expect(timezone.name).toBe('Africa/Cairo');
    });

    it('should have offset dynamically based on DST', () => {
      const expectedOffset = timezone.isDST() ? '+03:00' : '+02:00';
      expect(timezone.offset).toBe(expectedOffset);
    });
  });

  describe('now()', () => {
    it('should return a Date object', () => {
      const result = timezone.now();
      expect(result).toBeInstanceOf(Date);
    });

    it('should return a valid date (not NaN)', () => {
      const result = timezone.now();
      expect(isNaN(result.getTime())).toBe(false);
    });

    it('should return a date close to the current time', () => {
      const result = timezone.now();
      const nowUtc = Date.now();
      const diff = Math.abs(result.getTime() - nowUtc);
      // Egypt is UTC+2 or UTC+3, so the date shifted to UTC representation
      // will differ by roughly 2-3 hours from real UTC
      expect(diff).toBeLessThan(4 * 60 * 60 * 1000);
    });
  });

  describe('isDST()', () => {
    it('should return a boolean', () => {
      expect(typeof timezone.isDST()).toBe('boolean');
    });

    it('should accept an optional date parameter', () => {
      const winterDate = new Date('2026-01-15T12:00:00Z');
      expect(timezone.isDST(winterDate)).toBe(false);
    });

    it('should return true during DST months', () => {
      const summerDate = new Date('2026-07-15T12:00:00Z');
      expect(timezone.isDST(summerDate)).toBe(true);
    });
  });
});
