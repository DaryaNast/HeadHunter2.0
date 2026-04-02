export interface Vacancy {
    id: string;
    name: string;
    salary: Salary | null;
    experience: {
        id: string;
        name: string;
    }
    work_format: {
        id: string;
        name: string;
    }
    employer: {
        id: string;
        name: string;
    }
    address: {
        city: string;
        id: string;
    }
    schedule: {
        id: string;
        name: string;
    };
}

export interface Salary {
    to: number | null;
    from: number | null;
}

export interface VacanciesResponse {
    items: Vacancy[];
    found: number;
    pages: number;
    page: number;
    per_page: number;
}

export interface VacanciesParams {
    text?: string;
    area?: number | string;
    skill_set?: string[];
    page?: number;
    per_page?: number;
    search_field?: string;
    industry?: number;
    professional_role?: number;
}