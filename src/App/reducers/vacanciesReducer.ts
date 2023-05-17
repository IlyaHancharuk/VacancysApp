import { Vacancy } from "../../types";

const initialState: Vacancy[] = []

export const vacanciesReducer = (state = initialState, action: VacanciesActionType): Vacancy[] => {
    switch (action.type) {
        case "SET-VACANCIES":
            action.vacansies.forEach(v => v.isFavorite = false)
            return [ ...state, ...action.vacansies ]
        case "UPDATE-FAVORITE-STATUS":
            return state.map(v =>
                v.id === action.id
                    ? {...v, isFavorite: action.isFavorite}
                    : v)
        default:
            return state
    }
}

export type VacanciesActionType = ReturnType<typeof setVacansies>
    | ReturnType<typeof updateVacansyFavoriteStatus>

export type SetVacansiesActionType = ReturnType<typeof setVacansies>
export const setVacansies = (vacansies: Vacancy[]) => {
    return {
        type: "SET-VACANCIES",
        vacansies
    } as const
}

export const updateVacansyFavoriteStatus = (id: number, isFavorite: boolean) => {
    return {
        type: "UPDATE-FAVORITE-STATUS",
        id,
        isFavorite
    } as const
}