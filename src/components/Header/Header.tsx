import classes from "./Header.module.css";
import {Avatar, Container, Group, Title, Indicator} from "@mantine/core";
import imageHH from '../../../public/imageHH.png'
import {NavLink, useLocation} from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Container size="lg" py="xl" className={classes.container} pb={24}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                justifyItems: 'start',
            }}>
                <Group gap={10} wrap="nowrap">
                    <img src={imageHH} width={30} height={30} />
                    <Title size={16}>.FrontEnd</Title>
                </Group>

                <Group justify="center" gap={24}>
                    <Group gap={10}>
                        <NavLink
                            to='/vacancies'
                            className={({ isActive }) => isActive ? classes.activeLink : classes.link }
                        >
                            Вакансии FE
                        </NavLink>

                        {currentPath.includes('/vacancies') && (
                            <Indicator position="middle-center" size={6} color='#4263EB'/>
                        )}
                    </Group>
                    <Group gap="xs">
                        <Avatar variant='white' size="md" />
                        <NavLink
                            to='/about'
                            className={({ isActive }) => isActive ? classes.activeLink : classes.link}
                        >
                            Обо мне
                        </NavLink>
                        {currentPath.includes('/about') && (
                            <Indicator position="middle-center" size={6} color='#4263EB'/>
                        )}
                    </Group>
                </Group>

                <div></div>
            </div>
        </Container>
    );
};