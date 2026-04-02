import {Card, Text, Button, Group, Title, Badge, Stack, Flex} from '@mantine/core';
import type {Vacancy} from "../../types/types.ts";
import classes from "./VacancyCard.module.css";

interface VacancyCardProps {
    vacancy: Vacancy;
}

export const VacancyCard = ({vacancy}: VacancyCardProps) => {
    const formatSalary = () => {
        if(!vacancy.salary) return "Зарплата не указана";

        const { from, to} = vacancy.salary;
        if (from && to) {
            return `${from} - ${to} ₽`;
        } else if (from) {
            return `от ${from} ₽`;
        } else if (to) {
            return `до ${to} ₽`;
        }
        return 'Зарплата не указана';
    }

    const getScheduleBadge = () => {
        switch (vacancy.schedule.id) {
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

    const getCity = () => {
        if (vacancy.address?.city) {
            return vacancy.address.city;
        }
        return 'Город не указан';
    }

    return (
        <Card withBorder padding={24} radius={12} className={classes.card}>
            <Stack>
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

                <Flex gap={12}>
                    <Button color="black" fullWidth radius="sm" w={172}>
                        <Text size='sm'>Смотреть вакансию</Text>
                    </Button>

                    <Button color="black" variant='light' radius="sm" w={131}>
                        <Text size='sm'>Откликнуться</Text>
                    </Button>
                </Flex>
            </Stack>
        </Card>
    );
}