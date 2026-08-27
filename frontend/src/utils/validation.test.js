import { describe, it, expect } from 'vitest';
import { validateEmail, validateNicPassport } from './validation';

describe('validateEmail', () => {
  it('should return a match array for a valid email', () => {
    expect(validateEmail('test@example.com')).toBeTruthy();
    expect(validateEmail('user.name+tag@example.co.uk')).toBeTruthy();
    expect(validateEmail('123@123.com')).toBeTruthy();
  });

  it('should return null for an email missing the @ symbol', () => {
    expect(validateEmail('testexample.com')).toBeNull();
  });

  it('should return null for an email missing the domain', () => {
    expect(validateEmail('test@.com')).toBeNull();
    expect(validateEmail('test@')).toBeNull();
  });

  it('should return null for an email missing the username', () => {
    expect(validateEmail('@example.com')).toBeNull();
  });

  it('should return null for an email with a short TLD', () => {
    expect(validateEmail('test@example.c')).toBeNull();
  });

  it('should return null for an email with invalid characters', () => {
    expect(validateEmail('test name@example.com')).toBeNull();
  });

  it('should handle undefined or null gracefully (convert to string)', () => {
    // The current implementation uses String(email) which converts undefined to "undefined"
    // "undefined" is not a valid email, so it should return null
    expect(validateEmail(undefined)).toBeNull();
    expect(validateEmail(null)).toBeNull();
  });
});

describe('validateNicPassport', () => {
  it('should return true for a valid NIC or Passport (length >= 6)', () => {
    expect(validateNicPassport('123456')).toBe(true);
    expect(validateNicPassport('987654321V')).toBe(true);
    expect(validateNicPassport('  123456  ')).toBe(true);
  });

  it('should return false for a short ID', () => {
    expect(validateNicPassport('12345')).toBe(false);
  });

  it('should return false or undefined/null for empty, null, or undefined values', () => {
    expect(validateNicPassport('')).toBeFalsy();
    expect(validateNicPassport(null)).toBeFalsy();
    expect(validateNicPassport(undefined)).toBeFalsy();
  });

  it('should return false if ID is just whitespace', () => {
    expect(validateNicPassport('      ')).toBe(false);
  });
});
