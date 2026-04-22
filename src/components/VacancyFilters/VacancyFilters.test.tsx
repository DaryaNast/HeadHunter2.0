import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { VacancyFilters } from './VacancyFilters';

describe('VacancyFilters', () => {
    const mockOnAreaChange = vi.fn();
    const mockOnSkillsChange = vi.fn();
    const initialSkills = ['TypeScript', 'React', 'Redux'];

    const renderFilters = () => {
        return render(
            <MantineProvider>
                <VacancyFilters
                    onSkillsChange={mockOnSkillsChange}
                    initialSkills={initialSkills}
                />
            </MantineProvider>
        );
    };

    beforeEach(() => {
        mockOnAreaChange.mockClear();
        mockOnSkillsChange.mockClear();
    });

    it('должен отображать начальные навыки', () => {
        renderFilters();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Redux')).toBeInTheDocument();
    });

    it('должен отображать селект выбора города', () => {
        renderFilters();
        const citySelect = screen.getByPlaceholderText('Все города');
        expect(citySelect).toBeInTheDocument();
    });

    it('должен добавлять новый навык при нажатии Enter', () => {
        renderFilters();
        const input = screen.getByPlaceholderText('Добавить навык...');

        fireEvent.change(input, { target: { value: 'Vue' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(screen.getByText('Vue')).toBeInTheDocument();
        expect(mockOnSkillsChange).toHaveBeenCalledWith([...initialSkills, 'Vue']);
    });

    it('должен удалять навык при клике на крестик', async () => {
        renderFilters();

        // Ждем появления элементов
        await waitFor(() => {
            expect(screen.getByText('TypeScript')).toBeInTheDocument();
        });

        // Находим все пиллы и ищем внутри них кнопки удаления
        const pills = document.querySelectorAll('.mantine-Pill-root');

        // Находим кнопку удаления внутри первого пилла
        let removeButton: Element | null = null;
        for (const pill of pills) {
            const button = pill.querySelector('.mantine-Pill-remove');
            if (button) {
                removeButton = button;
                break;
            }
        }

        if (removeButton) {
            fireEvent.click(removeButton);
        }

        // Проверяем, что навык удален
        await waitFor(() => {
            expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
        });

        expect(mockOnSkillsChange).toHaveBeenCalledWith(['React', 'Redux']);
    });
});