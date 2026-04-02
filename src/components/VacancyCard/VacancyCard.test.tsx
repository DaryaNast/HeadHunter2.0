import {describe, expect} from "vitest";
import type {Vacancy} from "../../types/types.ts";
import {render, screen} from "@testing-library/react";
import {MantineProvider} from "@mantine/core";
import {VacancyCard} from "./VacancyCard.tsx";


describe("VacancyCard", () => {
    const mockVacancy: Vacancy = {
        id: '123',
        name: 'Frontend Developer',
        salary: {
            from: 100000,
            to: 150000,
        },
        experience: {
            id: 'between1And3',
            name: 'От 1 года до 3 лет',
        },
        work_format: {
            id: 'full',
            name: 'Полная занятость',
        },
        schedule: {
            id: 'remote',
            name: 'Удаленная работа',
        },
        address: {
            id: '1',
            city: 'Москва',
        },
        employer: {
            id: '1',
            name: 'Tech Company',
        }
    }

    const renderVacancyCard = (vacancy: Vacancy) => {
        return render(
            <MantineProvider>
                <VacancyCard vacancy={vacancy}/>
            </MantineProvider>
        )
    }

    it('должен отображать название вакансии', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    })

    it('должен отображать зарплату', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByText('100000 - 150000 ₽')).toBeInTheDocument()
    })

    it('должен отображать опыт работы', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByText('От 1 года до 3 лет')).toBeInTheDocument()
    })

    it('должен отображать название компании', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByText('Tech Company')).toBeInTheDocument()
    })

    it('должен отображать город', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByText('Москва')).toBeInTheDocument()
    })

    it('должен отображать кнопку "Смотреть вакансию"', () => {
        renderVacancyCard(mockVacancy)
        expect(screen.getByRole('button', { name: /смотреть вакансию/i })).toBeInTheDocument()
    })

    it('должен корректно отображать зарплату, если указана только от', () => {
        const salaryOnly = {
            ...mockVacancy,
            salary: { from: 100000, to: null }
        }
        renderVacancyCard(salaryOnly)
        expect(screen.getByText('от 100000 ₽')).toBeInTheDocument()
    })

    it('должен отображать "Зарплата не указана", если зарплата не указана', () => {
        const noSalary = {
            ...mockVacancy,
            salary: null,
        }
        renderVacancyCard(noSalary)
        expect(screen.getByText('Зарплата не указана')).toBeInTheDocument()
    })
})