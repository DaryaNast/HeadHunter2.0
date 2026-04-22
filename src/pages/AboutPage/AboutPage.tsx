import {Card, Stack, Text, Title} from "@mantine/core";

export function AboutPage() {
    return (
            <Stack display='flex' justify='center'>
                <Card radius='md' padding='xl' w={610}>
                    <Title p={16}>
                        Дарья Настенко
                    </Title>
                    <Text>
                        Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.
                    </Text>
                </Card>
            </Stack>
    )
}