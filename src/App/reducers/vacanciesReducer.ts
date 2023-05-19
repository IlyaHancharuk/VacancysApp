import { vacancyAPI } from "../../APITools/APITools";
import { Vacancy } from "../../types";
import { Dispatch } from "redux";

type FavoriteVacanciesStateType = {
    [id: number]: Vacancy
}

const initialState: Vacancy[] = []

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

export const getVacancies = (favoriteVacancies: Vacancy[]) => async (dispatch: Dispatch) => {
    const res = await vacancyAPI.getVacancies()
    const vacancies = res.data.objects.map(v => ({
        isFavorite: false,
        id :v.id,
        payment_from: v.payment_from,
        payment_to: v.payment_to,
        currency: v.currency,
        profession: v.profession,
        type_of_work: v.type_of_work,
        town: v.town,
        firm_name: v.firm_name,
        vacancyRichText: v.vacancyRichText
    }))
    dispatch(setVacansiesAC(vacancies, favoriteVacancies))
}
