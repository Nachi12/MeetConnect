import '@testing-library/jest-dom';
import { expect, afterEach, vi, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import axios from 'axios';

// Mock axios globally to prevent real API calls
vi.mock('axios');

beforeAll(() => {
  // Define default axios mock implementations for HTTP methods
  axios.get = vi.fn().mockResolvedValue({ data: {} });
  axios.post = vi.fn().mockResolvedValue({ data: {} });
  axios.put = vi.fn().mockResolvedValue({ data: {} });
  axios.delete = vi.fn().mockResolvedValue({ data: {} });
});

// Cleanup test environment after each test run
afterEach(() => {
  cleanup();          // Unmount React components
  vi.clearAllMocks();  // Reset all mocks
});

// Mock window.matchMedia for components using media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),          // Deprecated API (still used in some libraries)
    removeListener: vi.fn(),       // Deprecated API
    addEventListener: vi.fn(),     // Modern API
    removeEventListener: vi.fn(),  // Modern API
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver for components using lazy loading or animations
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}       // Stops observing targets
  observe() {}          // Starts observing a target
  takeRecords() { return []; } // Returns no observed entries
  unobserve() {}        // Stops observing a specific target
};
