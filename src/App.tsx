import '@mantine/core/styles.css';
import {Routes, Route } from 'react-router-dom';
import { VacanciesPage } from './pages/VacanciesPage/VacanciesPage.tsx';
import { VacancyDetailPage } from './pages/VacancyDetailPage/VacancyDetailPage.tsx';

function App() {
  return (
        <Routes>
          <Route path="/" element={<VacanciesPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:id" element={<VacancyDetailPage />} />
        </Routes>
  )
}

export default App
