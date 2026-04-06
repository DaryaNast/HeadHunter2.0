import classes from "./Header.module.css";
import {Avatar, Container, Group, Title, Text, Indicator } from "@mantine/core";
import iconHH from '../../../public/imageHH.png'


export const Header = () => {
    return (
        <Container size="lg" py="xl" className={classes.container}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                justifyItems: 'start',
            }}>
                <Group gap={10} wrap="nowrap">
                    <img src={iconHH} width={30} height={30} />
                    <Title size={16}>.FrontEnd</Title>
                </Group>

                <Group justify="center" gap={24}>
                    <Group gap={10}>
                        <Text component="a" href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Вакансии FE
                        </Text>
                        <Indicator position="middle-center" size={6} color='#4263EB'/>
                    </Group>
                    <Group gap="xs">
                        <Avatar variant='white' size="md" />
                        <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Обо мне
                        </a>
                    </Group>
                </Group>

                <div></div>
            </div>
        </Container>
    );
};