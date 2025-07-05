import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock para indexedDB
const indexedDBMock = {
  open: vi.fn(() => ({
    onupgradeneeded: null,
    onsuccess: null,
    onerror: null,
    result: {
      createObjectStore: vi.fn(),
      transaction: vi.fn(() => ({
        objectStore: vi.fn(() => ({
          add: vi.fn(),
          get: vi.fn(),
          put: vi.fn(),
          delete: vi.fn(),
          getAll: vi.fn(),
        })),
        oncomplete: null,
        onerror: null,
      })),
    },
  })),
  deleteDatabase: vi.fn(() => ({
    onsuccess: null,
    onerror: null,
  })),
};

// Globalizar el mock para que esté disponible en todas las pruebas
Object.defineProperty(global, 'indexedDB', { value: indexedDBMock });
