import { Stack, Center, Pagination, Loader, Text, Box } from '@mantine/core';
import { SearchInput } from "../../components/SearchInput/SearchInput.tsx";
import { VacancyFilters } from "../../components/VacancyFilters/VacancyFilters.tsx";
import { VacancyCard } from "../../components/VacancyCard/VacancyCard.tsx";
import { useGetVacanciesQuery } from "../../api/api.ts";
import { useVacancyFilters } from "../../hooks/useVacancyFilters";
import classes from './VacanciesPage.module.css';
import {CityTabs} from "../../components/CityTabs/CityTabs.tsx";

export function VacanciesPage() {
    const {
        params,
        setSearchText,
        setSkills,
        setPage,
    } = useVacancyFilters();

    const { data, isLoading } = useGetVacanciesQuery(params);

    const handleSearch = (text: string) => {
        setSearchText(text);
    }

    const handleSkillsChange = (skills: string[]) => {
        setSkills(skills);
    };

    const handlePageChange = (page: number) => {
        setPage(page - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <SearchInput
                onSearch={handleSearch}
                initialValue={params.text || ''}
            />
            <div className={classes.filterCard}>
                <VacancyFilters
                    onSkillsChange={handleSkillsChange}
                    initialSkills={params.skill_set || []}
                />

                <Box className={classes.contentWrapper}>
                    <CityTabs />
                        <Box className={classes.vacanciesList} pt={24}>
                            {isLoading && (
                                <Center mt="xl">
                                    <Loader size="lg" />
                                </Center>
                            )}

                            {data && data.items.length === 0 && !isLoading && (
                                <Center mt="xl">
                                    <Text>Ничего не найдено. Попробуйте изменить параметры поиска.</Text>
                                </Center>
                            )}

                            {data && data.items.length > 0 && (
                                <Stack gap="md">
                                    {data.items.map((vacancy) => (
                                        <VacancyCard key={vacancy.id} vacancy={vacancy} />
                                    ))}
                                </Stack>
                            )}
                        </Box>

                        {data && data.pages > 1 && (
                            <Box className={classes.paginationWrapper}>
                                <Center>
                                    <Pagination
                                        total={data.pages}
                                        value={params.page! + 1}
                                        onChange={handlePageChange}
                                        size="lg"
                                        className={classes.pagination}
                                    />
                                </Center>
                            </Box>
                        )}
                    </Box>
                </div>
        </>
    );
}