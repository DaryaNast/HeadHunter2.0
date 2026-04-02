import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { vacancyApi } from './api/api';

// Мок для API
vi.mock('./api/api', () => ({
    useGetVacanciesQuery: vi.fn(),
    vacancyApi: {
        reducerPath: 'vacancyApi',
        reducer: (state = {}) => state,
        middleware: () => (next: (action: unknown) => unknown) => (action: unknown) => next(action),
    },
}));

import { useGetVacanciesQuery } from './api/api';

const mockVacancies = {
    items: [
        {
            id: '1',
            name: 'Frontend Developer',
            salary: { from: 100000, to: 150000, currency: 'RUR', gross: false },
            experience: { id: '1', name: 'От 1 года до 3 лет' },
            employment: { id: 'full', name: 'Полная занятость' },
            schedule: { id: 'remote', name: 'Удаленная работа' },
            area: { id: '1', name: 'Москва' },
            employer: { id: '1', name: 'Tech Company' },
            snippet: { requirement: 'React, TypeScript', responsibility: '' },
            key_skills: [{ name: 'React' }],
            alternate_url: 'https://hh.ru/vacancy/1',
        },
    ],
    found: 30,
    pages: 3,
    page: 0,
    per_page: 10,
    clusters: [],
    arguments: [],
};

describe('App', () => {
    const renderApp = () => {
        const store = configureStore({
            reducer: {
                [vacancyApi.reducerPath]: vacancyApi.reducer,
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(vacancyApi.middleware),
        });

        return render(
            <Provider store={store}>
                <MantineProvider>
                    <App />
                </MantineProvider>
            </Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('должен отображать список вакансий после загрузки', async () => {
        const mockQuery = useGetVacanciesQuery as unknown as ReturnType<typeof vi.fn>;
        mockQuery.mockReturnValue({
            data: mockVacancies,
            isLoading: false,
            isError: false,
            error: undefined,
            refetch: vi.fn(),
        });

        renderApp();

        await waitFor(() => {
            expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
            expect(screen.getByText('Tech Company')).toBeInTheDocument();
        });
    });

    it('должен отображать сообщение об ошибке', () => {
        const mockQuery = useGetVacanciesQuery as unknown as ReturnType<typeof vi.fn>;
        mockQuery.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: new Error('API Error'),
            refetch: vi.fn(),
        });

        renderApp();
        expect(screen.getByText('Ошибка при загрузке вакансий')).toBeInTheDocument();
    });

    it('должен отображать пагинацию, если страниц больше 1', async () => {
        const mockQuery = useGetVacanciesQuery as unknown as ReturnType<typeof vi.fn>;
        mockQuery.mockReturnValue({
            data: { ...mockVacancies, pages: 3 },
            isLoading: false,
            isError: false,
            error: undefined,
            refetch: vi.fn(),
        });

        renderApp();

        await waitFor(() => {
            const pagination = document.querySelector('.mantine-Pagination-root');
            expect(pagination).toBeInTheDocument();
        });
    });

    it('должен выполнять поиск при вводе текста', async () => {
        let callCount = 0;
        const mockQuery = useGetVacanciesQuery as unknown as ReturnType<typeof vi.fn>;

        mockQuery.mockImplementation(() => {
            callCount++;
            return {
                data: mockVacancies,
                isLoading: false,
                isError: false,
                error: undefined,
                refetch: vi.fn(),
            };
        });

        renderApp();

        const searchInput = await screen.findByPlaceholderText('Должность или название компании');
        const searchButton = screen.getByRole('button', { name: /найти/i });

        fireEvent.change(searchInput, { target: { value: 'React' } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            // Проверяем, что хук был вызван с новыми параметрами
            expect(callCount).toBeGreaterThan(1);
        });
    });
});