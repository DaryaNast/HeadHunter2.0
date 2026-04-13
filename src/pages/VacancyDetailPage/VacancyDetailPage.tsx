import {useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Text, Title, Stack, Badge, Group, Button, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useGetVacancyByIdQuery } from '../../api/api.ts';
import { Header } from '../../components/Header/Header.tsx';
import classes from './VacancyDetailPage.module.css';

export function VacancyDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: vacancy, isLoading, isError } = useGetVacancyByIdQuery(id!);

    const getCity = () => {
        if (vacancy?.address?.city) {
            return vacancy.address.city;
        }
        return 'Город не указан';
    }

    const formatSalary = () => {
        if (!vacancy?.salary) return "Зарплата не указана";
        const { from, to } = vacancy.salary;
        if (from && to) {
            return `${from.toLocaleString()} - ${to.toLocaleString()} ₽`;
        } else if (from) {
            return `от ${from.toLocaleString()} ₽`;
        } else if (to) {
            return `до ${to.toLocaleString()} ₽`;
        }
        return 'Зарплата не указана';
    };

    const getScheduleBadge = () => {
        switch (vacancy?.schedule.id) {
            case 'remote':
                return <Badge color="blue">Можно удалённо</Badge>;
            case 'fullDay':
                return <Badge color="gray">Офис</Badge>;
            case 'hybrid':
                return <Badge color="black">Гибрид</Badge>;
            default:
                return null;
        }
    }

    const stripHtml = (html?: string) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '');
    };

    const formatDescription = (description?: string) => {
        if (!description) return '';
        let text = stripHtml(description);
        text = text.replace(/\n\s*\n/g, '\n\n');
        return text;
    };

    if (isLoading) {
        return (
            <>
                <Header />
                <Center h="70vh">
                    <Loader size="xl" />
                </Center>
            </>
        );
    }

    if (isError || !vacancy) {
        return (
            <>
                <Header />
                <Container size="md" py="xl">
                    <Card withBorder padding="xl" radius="md">
                        <Center>
                            <Stack align="center">
                                <Text c="red" size="lg">Ошибка при загрузке вакансии</Text>
                                <Button onClick={() => navigate('/vacancies')} variant="light">
                                    Вернуться к списку
                                </Button>
                            </Stack>
                        </Center>
                    </Card>
                </Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container size="md" py="xl">
                <Button
                    variant="subtle"
                    leftSection={<IconArrowLeft size={20} />}
                    onClick={() => navigate('/vacancies')}
                    mb="md"
                >
                    Назад к вакансиям
                </Button>
                <Card mb="xl">
                    <Title order={3} className={classes.vacancyTitle} c='#364FC7'>
                        {vacancy.name}
                    </Title>

                    <Group>
                        <Text>{formatSalary()}</Text>
                        <Text c='#0F0F1080'>{vacancy.experience.name}</Text>
                    </Group>

                    <Stack gap={8}>
                        <Text c='#0F0F1080'>{vacancy.employer.name}</Text>
                        {getScheduleBadge()}
                        <Text>{getCity()}</Text>
                    </Stack>
                    <Group justify="space-between" wrap="wrap">
                        <Button
                            component="a"
                            href={ vacancy.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            color="black"
                            mt={16}
                        >
                            Откликнуться на hh.ru
                        </Button>
                    </Group>
                </Card>

                <Card radius="md">
                    {vacancy.description && (
                        <Stack gap="md">
                            <Title order={3}>Описание вакансии</Title>
                            <Text className={classes.description} style={{ whiteSpace: 'pre-wrap' }}>
                                {formatDescription(vacancy.description)}
                            </Text>
                        </Stack>
                    )}

                    {/* Если нет description, проверяем snippet как запасной вариант */}
                    {!vacancy.description && (vacancy.snippet?.requirement || vacancy.snippet?.responsibility) && (
                        <Stack gap="md">
                            <Title order={3}>Компания</Title>

                            {vacancy.snippet?.requirement && (
                                <Stack gap="xs">
                                    <Text fw={500} size="lg">Требования:</Text>
                                    <Text className={classes.description}>
                                        {stripHtml(vacancy.snippet.requirement)}
                                    </Text>
                                </Stack>
                            )}

                            {vacancy.snippet?.responsibility && (
                                <Stack gap="xs">
                                    <Text fw={500} size="lg">Обязанности:</Text>
                                    <Text className={classes.description}>
                                        {stripHtml(vacancy.snippet.responsibility)}
                                    </Text>
                                </Stack>
                            )}
                        </Stack>
                    )}
                </Card>
            </Container>
        </>
    );
}

