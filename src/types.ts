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

export type Category = {
    key: number,
    title_rus: string
    title_trimmed: string
}
