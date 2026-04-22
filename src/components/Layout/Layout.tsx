import { Header} from "../Header/Header.tsx";
import {Container} from "@mantine/core";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet/>
            </Container>
        </>
    )
}

export { Layout }