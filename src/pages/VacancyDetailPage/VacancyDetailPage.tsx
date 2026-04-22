import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Text, Title, Stack, Badge, Group, Button, Loader, Center } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useGetVacancyByIdQuery } from '../../api/api.ts';
import { Header } from '../../components/Header/Header.tsx';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage.tsx';
import classes from './VacancyDetailPage.module.css';

export function VacancyDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: vacancy, isLoading, isError, error } = useGetVacancyByIdQuery(id!);

    const isNotFoundError = error && 'status' in error && error.status === 404;

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
        if (!vacancy?.schedule) return null;

        switch (vacancy.schedule.id) {
            case 'remote':
                return <Badge color="blue">Можно удалённо</Badge>;
            case 'fullDay':
                return <Badge color="gray">Офис</Badge>;
            case 'hybrid':
                return <Badge color="black">Гибрид</Badge>;
            default:
                return <Badge color="gray">{vacancy.schedule.name}</Badge>;
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

    if (isNotFoundError || (isError && !vacancy)) {
        return <NotFoundPage />;
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
                                <Text c="dimmed" size="sm">Пожалуйста, попробуйте позже</Text>
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

                <Card mb="xl" withBorder padding="xl" radius="md">
                    <Title order={2} className={classes.vacancyTitle} c='#364FC7'>
                        {vacancy.name}
                    </Title>

                    <Group gap="md" mt="md">
                        <Text size="xl" fw={600} c="green">
                            {formatSalary()}
                        </Text>
                        <Text c="dimmed" size="lg">•</Text>
                        <Text size="lg">
                            {vacancy.experience?.name || 'Опыт не указан'}
                        </Text>
                    </Group>

                    <Stack gap={8} mt="sm">
                        <Text size="md" c='#0F0F1080'>
                            {vacancy.employer?.name || 'Компания не указана'}
                        </Text>
                        {getScheduleBadge()}
                        <Text size="md">
                            {getCity()}
                        </Text>
                    </Stack>

                    <Group justify="space-between" wrap="wrap" mt="lg">
                        <Button
                            component="a"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="lg"
                            color="black"
                        >
                            Откликнуться на hh.ru
                        </Button>
                    </Group>
                </Card>

                <Card withBorder padding="xl" radius="md">
                    {vacancy.description && (
                        <Stack gap="md">
                            <Title order={3}>Описание вакансии</Title>
                            <Text className={classes.description} style={{ whiteSpace: 'pre-wrap' }}>
                                {formatDescription(vacancy.description)}
                            </Text>
                        </Stack>
                    )}

                    {!vacancy.description && (vacancy.snippet?.requirement || vacancy.snippet?.responsibility) && (
                        <Stack gap="md">
                            <Title order={3}>Описание вакансии</Title>

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

                    {!vacancy.description && !vacancy.snippet?.requirement && !vacancy.snippet?.responsibility && (
                        <Stack gap="md">
                            <Title order={3}>Описание вакансии</Title>
                            <Text c="dimmed">Описание отсутствует</Text>
                        </Stack>
                    )}
                </Card>
            </Container>
        </>
    );
}

