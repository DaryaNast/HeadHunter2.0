import '@mantine/core/styles.css';
import { Container, Stack, Center, Pagination, Loader, Text, Box } from '@mantine/core';
import { Header } from "./components/Header/Header.tsx";
import { SearchInput } from "./components/SearchInput/SearchInput.tsx";
import { VacancyFilters } from "./components/VacancyFilters/VacancyFilters.tsx";
import { VacancyCard } from "./components/VacancyCard/VacancyCard.tsx";
import { useState } from "react";
import { useGetVacanciesQuery } from "./api/api.ts";
import type { VacanciesParams } from "./types/types.ts";
import classes from './App.module.css';

function App() {
  const [params, setParams] = useState<VacanciesParams>({
    skill_set: ['TypeScript', 'React', 'Redux'],
    page: 0,
    per_page: 10,
  });

  const { data, isLoading, isError } = useGetVacanciesQuery(params);

  const handleSearch = (text: string) => {
    setParams((prev) => ({
      ...prev,
      text: text || undefined,
      search_field: text ? 'name' : undefined,
      page: 0
    }));
  }

  const handleAreaChange = (area: string) => {
    setParams((prev) => ({ ...prev, area: area || undefined, page: 0 }));
  }

  const handleSkillsChange = (skills: string[]) => {
    setParams((prev) => ({ ...prev, skill_set: skills, page: 0 }));
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page: page - 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <>
        <Header />
        <Container size="xl" className={classes.container} py="xl">
          <SearchInput
              onSearch={handleSearch}
          />
          <div className={classes.filterCard}>
            <VacancyFilters
                onAreaChange={handleAreaChange}
                onSkillsChange={handleSkillsChange}
                initialSkills={['TypeScript', 'React', 'Redux']}
            />

            <Box className={classes.contentWrapper}>
              <Box className={classes.vacanciesList}>
                {isLoading && (
                    <Center mt="xl">
                      <Loader size="lg" />
                    </Center>
                )}

                {isError && (
                    <Center mt="xl">
                      <Text c="red">Ошибка при загрузке вакансий</Text>
                    </Center>
                )}

                {data && (
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
        </Container>
      </>
  )
}

export default App
