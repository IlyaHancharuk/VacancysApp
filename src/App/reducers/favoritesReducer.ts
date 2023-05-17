import { Vacancy } from "../../types";
import { updateVacansyFavoriteStatus } from "./vacanciesReducer";

const initialState: Vacancy[] = []

export const favoriteReducer = (state = initialState, action: VacanciesActionType): Vacancy[] => {
    switch (action.type) {
        case "SET-FAVORITE-VACANCIES":
            return [ ...state, ...action.vacancies ]
        case "ADD-FAVORITE-VACANCIES":
            return [ { ...action.vacancy, isFavorite: true }, ...state ]
        case "REMOVE-FAVORITE-VACANCIES":
            return state.filter(v => v.id !== action.id)
        default:
            return state
    }
}

export type VacanciesActionType = ReturnType<typeof setFavoriteVacancies>
    | ReturnType<typeof addFavoriteVacancy>
    | ReturnType<typeof removeFavoriteVacancy>
    | ReturnType<typeof updateVacansyFavoriteStatus>

export const setFavoriteVacancies = (vacancies: Vacancy[]) => {
    return {
        type: "SET-FAVORITE-VACANCIES",
        vacancies
    } as const
}
export const addFavoriteVacancy = (vacancy: Vacancy) => {
    return {
        type: "ADD-FAVORITE-VACANCIES",
        vacancy
    } as const
}
export const removeFavoriteVacancy = (id: number) => {
    return {
        type: "REMOVE-FAVORITE-VACANCIES",
        id
    } as const
}