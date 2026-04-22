import {useLocation, useNavigate} from "react-router-dom";
import {Tabs} from "@mantine/core";

export function CityTabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const getActiveTab = () => {
        if (location.pathname.includes('/vacancies/moscow')) return 'moscow';
        if (location.pathname.includes('/vacancies/petersburg')) return 'petersburg';
        return 'moscow'; // значение по умолчанию
    };

    const activeTab = getActiveTab();

    const handleChangeTab = (value: string | null) => {
        if (value === 'moscow') {
            navigate('/vacancies/moscow');
        } else if (value === 'petersburg') {
            navigate('/vacancies/petersburg');
        }
    }

    return (
        <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tabs.List>
                <Tabs.Tab value='moscow'>Москва</Tabs.Tab>
                <Tabs.Tab value='petersburg'>Санкт-Петербург</Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}