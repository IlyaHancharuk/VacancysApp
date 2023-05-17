import { Vacancy } from "../../types";

const initialState: Vacancy[] = []
type FavoriteVacanciesStateType = {
    [id: number]: Vacancy
}
export const vacanciesReducer = (state = initialState, action: VacanciesActionType): Vacancy[] => {
    switch (action.type) {
        case "SET-VACANCIES":
            const obj: FavoriteVacanciesStateType = {}
            action.favoriteVacancies.forEach(fv => obj[fv.id] = fv)

            action.vacansies.forEach(v => {
                obj[v.id]
                    ? v.isFavorite = true
                    : v.isFavorite = false
            })
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

export type VacanciesActionType = ReturnType<typeof setVacansiesAC>
    | ReturnType<typeof updateVacansyFavoriteStatusAC>

export type SetVacansiesActionType = ReturnType<typeof setVacansiesAC>
export const setVacansiesAC = (vacansies: Vacancy[], favoriteVacancies: Vacancy[]) => {
    return {
        type: "SET-VACANCIES",
        vacansies,
        favoriteVacancies
    } as const
}

export const updateVacansyFavoriteStatusAC = (id: number, isFavorite: boolean) => {
    return {
        type: "UPDATE-FAVORITE-STATUS",
        id,
        isFavorite
    } as const
}