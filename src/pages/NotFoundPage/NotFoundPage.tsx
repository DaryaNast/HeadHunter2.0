import {useNavigate} from "react-router-dom";
import {Button, Group, Title, Text, Card} from "@mantine/core";
import classes from './NotFoundPage.module.css'

export function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <>
                <Card className={classes.card} radius='md'>
                    <Group display='flex' wrap='nowrap'>
                        <Group w={508}>
                            <Title order={1} className={classes.title}>
                                Упс! Такой страницы не существует
                            </Title>
                            <br/>
                            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                                Давайте перейдём к началу.
                            </Text>
                        </Group>
                        <Button
                            onClick={() => navigate('/vacancies')}
                            size="lg"
                            h={42}
                            w={135}
                            p={0}
                            bg='#4263EB'
                        >
                            На главную
                        </Button>
                    </Group>

                    <div className="tenor-gif-embed" data-postid="4138822033792608878" data-share-method="host"
                         data-aspect-ratio="1" data-width="100%"><a
                        href="https://tenor.com/view/dog-scroll-crying-depression-doomscrolling-gif-4138822033792608878">Dog
                        Scroll GIF</a>from <a href="https://tenor.com/search/dog-gifs">Dog GIFs</a></div>
                    <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                </Card>
        </>
    )
}