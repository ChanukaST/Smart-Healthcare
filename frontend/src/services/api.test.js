import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchApi } from './api';

// Mock the environment
const API_BASE_URL = 'http://localhost:8080/api';

// Need to mock the constant from '../utils/constants'
vi.mock('../utils/constants', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

describe('fetchApi', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('console', { ...console, warn: vi.fn() });

    // Clear mocks before each test
    vi.clearAllMocks();

    // Setup local storage mock for token
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue('fake-token')
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return parsed JSON data on successful API call', async () => {
    const mockData = { id: 1, name: 'Test' };

    // Mock fetch to return a successful response
    const fetchMock = vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData)
    });

    const result = await fetchApi('/test-endpoint');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8080/api/test-endpoint', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer fake-token'
      }
    });

    expect(result).toEqual(mockData);
  });

  it('should return null and log warning when API response is not OK', async () => {
    // Mock fetch to return a non-ok response
    const fetchMock = vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error'
    });

    const consoleWarnMock = vi.mocked(console.warn);

    const result = await fetchApi('/test-endpoint');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Falling back for endpoint /test-endpoint:',
      expect.any(Error)
    );
    expect(result).toBeNull();
  });

  it('should return null and log warning when API request rejects (e.g., network error)', async () => {
    const networkError = new Error('Network Failed');

    // Mock fetch to reject
    const fetchMock = vi.mocked(fetch).mockRejectedValueOnce(networkError);
    const consoleWarnMock = vi.mocked(console.warn);

    const result = await fetchApi('/test-endpoint');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock).toHaveBeenCalledWith(
      'Falling back for endpoint /test-endpoint:',
      networkError
    );
    expect(result).toBeNull();
  });
});
