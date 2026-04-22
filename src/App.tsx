// src/App.tsx
import '@mantine/core/styles.css';
import { Routes, Route } from 'react-router-dom';
import { VacanciesPage } from './pages/VacanciesPage/VacanciesPage.tsx';
import { VacancyDetailPage } from './pages/VacancyDetailPage/VacancyDetailPage.tsx';
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.tsx";
import { AboutPage } from "./pages/AboutPage/AboutPage.tsx";
import { Layout } from "./components/Layout/Layout.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<VacanciesPage />} />
                <Route path="vacancies" element={<VacanciesPage />} />
                <Route path="vacancies/moscow" element={<VacanciesPage />} />
                <Route path="vacancies/petersburg" element={<VacanciesPage />} />
                <Route path="vacancies/:id" element={<VacancyDetailPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default App
