import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a valid date string correctly', () => {
    // 2023-12-25 should format to "Dec 25, 2023"
    expect(formatDate('2023-12-25')).toBe('Dec 25, 2023');
  });

  it('formats a valid ISO datetime string correctly', () => {
    // 2024-01-01T10:00:00Z format
    expect(formatDate('2024-01-01T10:00:00Z')).toBe('Jan 1, 2024');
  });

  it('returns an empty string when given an empty string', () => {
    expect(formatDate('')).toBe('');
  });

  it('returns an empty string when given null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('returns an empty string when given undefined', () => {
    expect(formatDate(undefined)).toBe('');
  });

  it('returns "Invalid Date" when given an invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('Invalid Date');
  });
});
