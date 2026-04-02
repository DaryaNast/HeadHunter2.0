import React, { useState } from "react";
import { Group, Button, Title, Text, Input, Box } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./SearchInput.module.css";

interface SearchInputProps {
    onSearch: (text: string) => void;
    initialSearchText?: string;
}

export const SearchInput = ({
                                onSearch,
                                initialSearchText = "",
                               }: SearchInputProps) => {
    const [searchText, setSearchText] = useState(initialSearchText);

    const handleSearchSubmit = () => {
        onSearch(searchText);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit();
        }
    };

    return (
        <Box className={classes.filtersContainer}>
            <Group justify="space-between" align="flex-end" className={classes.headerSection}>
                <Box>
                    <Title className={classes.mainTitle} size={26}>
                        Список вакансий
                    </Title>
                    <Text c="dimmed" size='xl' className={classes.subtitle} >
                        по профессии Frontend-разработчик
                    </Text>
                </Box>

                <Group gap="xs">
                    <Input
                        placeholder="Должность или название компании"
                        leftSection={<IconSearch size={16} />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={classes.searchInput}
                        size="md"
                        variant='unstyled'
                        radius='md'
                    />
                    <Button
                        onClick={handleSearchSubmit}
                        size="md"
                        className={classes.searchButton}
                    >
                        Найти
                    </Button>
                </Group>
            </Group>
        </Box>
    );
};