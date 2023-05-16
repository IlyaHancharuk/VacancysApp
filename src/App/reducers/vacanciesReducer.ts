import { Vacancy } from "../../types";

const initialState: Vacancy[] = []

export const vacanciesReducer = (state = initialState, action: VacanciesActionType): Vacancy[] => {
    switch (action.type) {
        case "SET-VACANCIES":
            return [...state, ...action.vacansies]
        default:
            return state
    }
}

export type VacanciesActionType = SetVacansiesActionType

export type SetVacansiesActionType = ReturnType<typeof setVacansies>
export const setVacansies = (vacansies: Vacancy[]) => {
    return {
        type: "SET-VACANCIES",
        vacansies
    } as const
}