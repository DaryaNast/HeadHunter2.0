// src/test/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Очистка после каждого теста
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Мок для window.scrollTo
window.scrollTo = vi.fn();

// Мок для matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
    }),
});

// Правильный мок для ResizeObserver - без vi.fn()
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.ResizeObserver = MockResizeObserver;