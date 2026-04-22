import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mockVacancies = {
    items: [
        {
            id: '1',
            name: 'Frontend Developer React',
            salary: { from: 150000, to: 200000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '1', name: 'ООО "ТехноЛид"' },
            address: { city: 'Москва', id: '1', street: 'Тверская', building: '15' },
            schedule: { id: 'fullDay', name: 'Полный день' },
            snippet: {
                requirement: 'Опыт работы с React от 2 лет, знание TypeScript, Redux',
                responsibility: 'Разработка новых функций, поддержка существующего кода'
            },
            description: '<p>Мы ищем талантливого Frontend разработчика</p><p>Требования:</p><ul><li>React</li><li>TypeScript</li><li>Redux</li></ul>',
            alternate_url: 'https://hh.ru/vacancy/1'
        },
        {
            id: '2',
            name: 'TypeScript Developer',
            salary: { from: 180000, to: 250000 },
            experience: { id: 'between3And6', name: 'От 3 до 6 лет' },
            employer: { id: '2', name: 'ООО "ИТ Решения"' },
            address: { city: 'Санкт-Петербург', id: '2' },
            schedule: { id: 'remote', name: 'Удаленная работа' },
            snippet: {
                requirement: 'Глубокое знание TypeScript, опыт с React',
                responsibility: 'Архитектура приложений, код-ревью'
            },
            description: 'Ищем эксперта в TypeScript',
            alternate_url: 'https://hh.ru/vacancy/2'
        },
        {
            id: '3',
            name: 'Redux Specialist',
            salary: { from: 130000, to: 170000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '3', name: 'Стартап Техно' },
            address: { city: 'Москва', id: '1' },
            schedule: { id: 'hybrid', name: 'Гибридный формат' },
            snippet: {
                requirement: 'Опыт с Redux Toolkit, RTK Query',
                responsibility: 'Оптимизация состояния приложения'
            },
            description: 'Присоединяйтесь к нашей команде',
            alternate_url: 'https://hh.ru/vacancy/3'
        },
        {
            id: '4',
            name: 'Frontend Developer React',
            salary: { from: 150000, to: 200000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '4', name: 'ООО "ТехноЛид"' },
            address: { city: 'Москва', id: '1', street: 'Тверская', building: '15' },
            schedule: { id: 'fullDay', name: 'Полный день' },
            snippet: {
                requirement: 'Опыт работы с React от 2 лет, знание TypeScript, Redux',
                responsibility: 'Разработка новых функций, поддержка существующего кода'
            },
            description: '<p>Мы ищем талантливого Frontend разработчика</p><p>Требования:</p><ul><li>React</li><li>TypeScript</li><li>Redux</li></ul>',
            alternate_url: 'https://hh.ru/vacancy/4'
        },
        {
            id: '5',
            name: 'TypeScript Developer',
            salary: { from: 180000, to: 250000 },
            experience: { id: 'between3And6', name: 'От 3 до 6 лет' },
            employer: { id: '5', name: 'ООО "ИТ Решения"' },
            address: { city: 'Санкт-Петербург', id: '2' },
            schedule: { id: 'remote', name: 'Удаленная работа' },
            snippet: {
                requirement: 'Глубокое знание TypeScript, опыт с React',
                responsibility: 'Архитектура приложений, код-ревью'
            },
            description: 'Ищем эксперта в TypeScript',
            alternate_url: 'https://hh.ru/vacancy/5'
        },
        {
            id: '6',
            name: 'Redux Specialist',
            salary: { from: 130000, to: 170000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '6', name: 'Стартап Техно' },
            address: { city: 'Москва', id: '1' },
            schedule: { id: 'hybrid', name: 'Гибридный формат' },
            snippet: {
                requirement: 'Опыт с Redux Toolkit, RTK Query',
                responsibility: 'Оптимизация состояния приложения'
            },
            description: 'Присоединяйтесь к нашей команде',
            alternate_url: 'https://hh.ru/vacancy/6'
        },
        {
            id: '7',
            name: 'Frontend Developer React',
            salary: { from: 150000, to: 200000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '7', name: 'ООО "ТехноЛид"' },
            address: { city: 'Москва', id: '1', street: 'Тверская', building: '15' },
            schedule: { id: 'fullDay', name: 'Полный день' },
            snippet: {
                requirement: 'Опыт работы с React от 2 лет, знание TypeScript, Redux',
                responsibility: 'Разработка новых функций, поддержка существующего кода'
            },
            description: '<p>Мы ищем талантливого Frontend разработчика</p><p>Требования:</p><ul><li>React</li><li>TypeScript</li><li>Redux</li></ul>',
            alternate_url: 'https://hh.ru/vacancy/7'
        },
        {
            id: '8',
            name: 'TypeScript Developer',
            salary: { from: 180000, to: 250000 },
            experience: { id: 'between3And6', name: 'От 3 до 6 лет' },
            employer: { id: '8', name: 'ООО "ИТ Решения"' },
            address: { city: 'Санкт-Петербург', id: '2' },
            schedule: { id: 'remote', name: 'Удаленная работа' },
            snippet: {
                requirement: 'Глубокое знание TypeScript, опыт с React',
                responsibility: 'Архитектура приложений, код-ревью'
            },
            description: 'Ищем эксперта в TypeScript',
            alternate_url: 'https://hh.ru/vacancy/8'
        },
        {
            id: '9',
            name: 'Redux Specialist',
            salary: { from: 130000, to: 170000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '9', name: 'Стартап Техно' },
            address: { city: 'Москва', id: '1' },
            schedule: { id: 'hybrid', name: 'Гибридный формат' },
            snippet: {
                requirement: 'Опыт с Redux Toolkit, RTK Query',
                responsibility: 'Оптимизация состояния приложения'
            },
            description: 'Присоединяйтесь к нашей команде',
            alternate_url: 'https://hh.ru/vacancy/9'
        },
        {
            id: '10',
            name: 'Frontend Developer React',
            salary: { from: 150000, to: 200000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '10', name: 'ООО "ТехноЛид"' },
            address: { city: 'Москва', id: '1', street: 'Тверская', building: '15' },
            schedule: { id: 'fullDay', name: 'Полный день' },
            snippet: {
                requirement: 'Опыт работы с React от 2 лет, знание TypeScript, Redux',
                responsibility: 'Разработка новых функций, поддержка существующего кода'
            },
            description: '<p>Мы ищем талантливого Frontend разработчика</p><p>Требования:</p><ul><li>React</li><li>TypeScript</li><li>Redux</li></ul>',
            alternate_url: 'https://hh.ru/vacancy/10'
        },
        {
            id: '11',
            name: 'TypeScript Developer',
            salary: { from: 180000, to: 250000 },
            experience: { id: 'between3And6', name: 'От 3 до 6 лет' },
            employer: { id: '11', name: 'ООО "ИТ Решения"' },
            address: { city: 'Санкт-Петербург', id: '2' },
            schedule: { id: 'remote', name: 'Удаленная работа' },
            snippet: {
                requirement: 'Глубокое знание TypeScript, опыт с React',
                responsibility: 'Архитектура приложений, код-ревью'
            },
            description: 'Ищем эксперта в TypeScript',
            alternate_url: 'https://hh.ru/vacancy/11'
        },
        {
            id: '12',
            name: 'Redux Specialist',
            salary: { from: 130000, to: 170000 },
            experience: { id: 'between1And3', name: 'От 1 года до 3 лет' },
            employer: { id: '12', name: 'Стартап Техно' },
            address: { city: 'Москва', id: '1' },
            schedule: { id: 'hybrid', name: 'Гибридный формат' },
            snippet: {
                requirement: 'Опыт с Redux Toolkit, RTK Query',
                responsibility: 'Оптимизация состояния приложения'
            },
            description: 'Присоединяйтесь к нашей команде',
            alternate_url: 'https://hh.ru/vacancy/12'
        }
    ],
    found: 12,
    pages: 2,
    page: 0,
    per_page: 10
};

// ID городов для HH API
const CITY_IDS = {
    moscow: 1,
    petersburg: 2,
};

export const vacancyApi = createApi({
    reducerPath: "vacancyApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getVacancies: builder.query({
            queryFn: async (params) => {
                // Фильтруем вакансии по городу
                let filteredItems = [...mockVacancies.items];

                // Фильтрация по городу
                if (params?.area === CITY_IDS.moscow) {
                    filteredItems = filteredItems.filter(item => item.address.city === 'Москва');
                } else if (params?.area === CITY_IDS.petersburg) {
                    filteredItems = filteredItems.filter(item => item.address.city === 'Санкт-Петербург');
                }

                // Фильтрация по поисковому тексту
                if (params?.text) {
                    const searchText = params.text.toLowerCase();
                    filteredItems = filteredItems.filter(item =>
                        item.name.toLowerCase().includes(searchText) ||
                        item.snippet?.requirement?.toLowerCase().includes(searchText) ||
                        item.description?.toLowerCase().includes(searchText)
                    );
                }

                // Фильтрация по навыкам
                if (params?.skill_set && params.skill_set.length > 0) {
                    filteredItems = filteredItems.filter(item => {
                        const itemText = `${item.name} ${item.snippet?.requirement} ${item.description}`.toLowerCase();
                        return params.skill_set.some((skill: string) =>
                            itemText.includes(skill.toLowerCase())
                        );
                    });
                }

                // Пагинация
                const page = params?.page || 0;
                const per_page = params?.per_page || 10;
                const start = page * per_page;
                const end = start + per_page;
                const paginatedItems = filteredItems.slice(start, end);

                return {
                    data: {
                        items: paginatedItems,
                        found: filteredItems.length,
                        pages: Math.ceil(filteredItems.length / per_page),
                        page: page,
                        per_page: per_page,
                    }
                };
            },
        }),
        getVacancyById: builder.query({
            queryFn: async (id) => {
                const vacancy = mockVacancies.items.find(v => v.id === id);
                if (vacancy) {
                    return { data: vacancy };
                }
                return { error: { status: 404, data: 'Vacancy not found' } };
            },
        }),
    }),
});

export const { useGetVacanciesQuery, useGetVacancyByIdQuery } = vacancyApi;