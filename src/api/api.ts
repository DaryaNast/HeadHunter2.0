import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { VacanciesResponse, VacanciesParams } from "../types/types.ts";

const BASE_URL = 'https://api.hh.ru/'

export const vacancyApi = createApi({
    reducerPath: "vacancyApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('User-Agent', 'MyApp/1.0 (my-app-feedback@example.com)')
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getVacancies: builder.query<VacanciesResponse, VacanciesParams>({
            query: (params) => ({
                url: 'vacancies',
                params: {
                    ...params,
                    industry: 7,
                    professional_role: 96,
                    per_page: params.per_page || 10,
                    // skill_set: params.skill_set?.join(',')
                }
            })
        }),
    })
})

export const { useGetVacanciesQuery } = vacancyApi;