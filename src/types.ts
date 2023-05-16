export type Vacancy = {
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
