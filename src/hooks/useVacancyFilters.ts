import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { VacanciesParams } from '../types/types';

export function useVacancyFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo<VacanciesParams>(() => {
        const text = searchParams.get('text') || undefined;
        const area = searchParams.get('area') || undefined;
        const skillsParam = searchParams.get('skills');
        const skill_set = skillsParam ? skillsParam.split(',') : ['TypeScript', 'React', 'Redux'];
        const page = parseInt(searchParams.get('page') || '0');

        return {
            text,
            area: area ? Number(area) : undefined,
            skill_set,
            page: isNaN(page) ? 0 : page,
            per_page: 10,
            search_field: text ? 'name' : undefined,
        };
    }, [searchParams]);

    const updateFilters = useCallback((updates: Partial<VacanciesParams>) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);

            if (updates.text !== undefined) {
                if (updates.text) {
                    newParams.set('text', updates.text);
                } else {
                    newParams.delete('text');
                }
            }

            if (updates.area !== undefined) {
                if (updates.area) {
                    newParams.set('area', String(updates.area));
                } else {
                    newParams.delete('area');
                }
            }

            if (updates.skill_set !== undefined) {
                if (updates.skill_set.length > 0) {
                    newParams.set('skills', updates.skill_set.join(','));
                } else {
                    newParams.delete('skills');
                }
            }

            if (updates.page !== undefined) {
                newParams.set('page', String(updates.page));
            }

            return newParams;
        });
    }, [setSearchParams]);

    const setSearchText = useCallback((text: string) => {
        updateFilters({ text, page: 0, search_field: text ? 'name' : undefined });
    }, [updateFilters]);

    const setArea = useCallback((area: string) => {
        updateFilters({ area: area ? Number(area) : undefined, page: 0 });
    }, [updateFilters]);

    const setSkills = useCallback((skills: string[]) => {
        updateFilters({ skill_set: skills, page: 0 });
    }, [updateFilters]);

    const setPage = useCallback((page: number) => {
        updateFilters({ page });
    }, [updateFilters]);

    return {
        params,
        setSearchText,
        setArea,
        setSkills,
        setPage,
    };
}