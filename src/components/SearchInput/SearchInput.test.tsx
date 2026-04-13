import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
    const mockOnSearch = vi.fn();

    const renderSearchInput = (initialSearchText = '') => {
        return render(
            <MantineProvider>
                <SearchInput
                    onSearch={mockOnSearch}
                    initialValue={initialSearchText}
                />
            </MantineProvider>
        );
    };

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    it('должен отображать заголовок и описание', () => {
        renderSearchInput();
        expect(screen.getByText('Список вакансий')).toBeInTheDocument();
        expect(screen.getByText('по профессии Frontend-разработчик')).toBeInTheDocument();
    });

    it('должен отображать поле ввода с placeholder', () => {
        renderSearchInput();
        const input = screen.getByPlaceholderText('Должность или название компании');
        expect(input).toBeInTheDocument();
    });

    it('должен отображать кнопку поиска', () => {
        renderSearchInput();
        const button = screen.getByRole('button', { name: /найти/i });
        expect(button).toBeInTheDocument();
    });

    it('должен обновлять значение при вводе текста', () => {
        renderSearchInput();
        const input = screen.getByPlaceholderText('Должность или название компании') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'React' } });
        expect(input.value).toBe('React');
    });

    it('должен вызывать onSearch при клике на кнопку', () => {
        renderSearchInput();
        const input = screen.getByPlaceholderText('Должность или название компании');
        const searchButton = screen.getByRole('button', { name: /найти/i });

        fireEvent.change(input, { target: { value: 'React' } });
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith('React');
    });

    it('должен вызывать onSearch при нажатии Enter', () => {
        renderSearchInput();
        const input = screen.getByPlaceholderText('Должность или название компании');

        fireEvent.change(input, { target: { value: 'TypeScript' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(mockOnSearch).toHaveBeenCalledWith('TypeScript');
    });
});
