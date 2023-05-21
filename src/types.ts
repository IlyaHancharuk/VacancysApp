export type AuthResponseType = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    reg_user_resumes_count: number;
    token_type: string;
    ttl: number;
}

export type GetVacanciesResponseType = {
    objects: Vacancy[]
    total: number,
    more: boolean
}

export type GetCategoriesResponseType = Category[]

export type ServerError = {
    code: number
    error: string
    message: string
}

export type Vacancy = {
    isFavorite: boolean
    id: number,
    payment_from: number,
    payment_to: number,
    currency: string,
    profession: string,
    type_of_work: {
        title: string
    },
    town: {
        title: string,
    },
    firm_name: string,
    vacancyRichText: string
}

export type FiltersFormValuesType = {
    payment_from: number | '',
    payment_to: number | '',
    category: string
}

export type FilterParamsType = FiltersFormValuesType & {
    keyword: string
}

export type Category = {
    key: number,
    title_rus: string
    title_trimmed: string
}
