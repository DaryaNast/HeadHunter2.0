import { useState, useEffect } from "react";
import {Group, Text, Pill, PillsInput, Select, Box, Card, ActionIcon, Flex} from "@mantine/core";
import { IconPlus, IconMapPin } from "@tabler/icons-react";
import classes from "./VacancyFilters.module.css";

interface VacancyFiltersProps {
    onAreaChange: (area: string) => void;
    onSkillsChange: (skills: string[]) => void;
    initialSkills?: string[];
}

export const VacancyFilters = ({
                                   onAreaChange,
                                   onSkillsChange,
                                   initialSkills = ['TypeScript', 'React', 'Redux']
                               }: VacancyFiltersProps) => {
    const [skills, setSkills] = useState<string[]>(initialSkills);
    const [newSkill, setNewSkill] = useState('');
    const [selectedArea, setSelectedArea] = useState<string | null>(null);

    useEffect(() => {
        onSkillsChange(initialSkills);
    }, []);

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            const updatedSkills = [...skills, newSkill.trim()];
            setSkills(updatedSkills);
            onSkillsChange(updatedSkills);
            setNewSkill('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        const updatedSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(updatedSkills);
        onSkillsChange(updatedSkills);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleAreaSelect = (value: string | null) => {
        setSelectedArea(value);
        onAreaChange(value || '');
    };

    return (
        <Box className={classes.filtersContainer} >
            {/* Секция с фильтрами */}
            <Group gap="md" align="flex-start" className={classes.filtersSection} >
                {/* Блок навыков */}
                <Card withBorder radius="md" padding="md" className={classes.skillsCard} w={317} p={24}>
                    <Text fw={500} size="sm" mb="xs">
                        Ключевые навыки
                    </Text>
                    <Flex gap={8} pb={12} align='center'>
                        <PillsInput size='xs' radius='md' w={227}>
                            <PillsInput.Field
                                placeholder="Добавить навык..."
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </PillsInput>

                        <ActionIcon
                            radius='md'
                            variant='filled'
                            w={34}
                            h={30}
                            onClick={handleAddSkill}
                        >
                            {<IconPlus size={26}/>}
                        </ActionIcon>
                    </Flex>

                    <Pill.Group>
                    {skills.map((skill) => (
                        <Pill
                            key={skill}
                            withRemoveButton
                            onRemove={() => handleRemoveSkill(skill)}
                            size="md"
                        >
                            {skill}
                        </Pill>
                    ))}
                    </Pill.Group>
                </Card>

                {/* Блок выбора города */}
                <Card withBorder radius="md" padding="md" className={classes.cityCard} w={317} p={24}>
                    <Select
                        placeholder="Все города"
                        data={[
                            { value: '', label: 'Все города' },
                            { value: '1', label: 'Москва' },
                            { value: '2', label: 'Санкт-Петербург' },
                        ]}
                        value={selectedArea}
                        onChange={handleAreaSelect}
                        leftSection={<IconMapPin size={16} />}
                        clearable
                        className={classes.citySelect}
                    />
                </Card>
            </Group>
        </Box>
    );
};