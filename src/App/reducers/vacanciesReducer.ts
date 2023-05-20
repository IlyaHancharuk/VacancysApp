import { vacancyAPI } from "../../APITools/APITools";
import { FilterParamsType, Vacancy } from "../../types";
import { Dispatch } from "redux";

type FavoriteVacanciesStateType = {
    [id: number]: Vacancy
}

type VacansiesStateType = {
    vacancies: Vacancy[]
    MAX_VACANCIES_IN_PAGE: number
    total: number
}
const MAX_VACANCIES_COUNT = 500
const defaultFilterParams: FilterParamsType = {
    keyword: '',
    payment_from: '',
    payment_to: '',
    category: ''
}

const initialState: VacansiesStateType = {
    vacancies: [],
    MAX_VACANCIES_IN_PAGE: 4,
    total: 0
}

export const vacanciesReducer = (state = initialState, action: VacanciesActionType): VacansiesStateType => {
    switch (action.type) {
        case "SET-VACANCIES":
            const obj: FavoriteVacanciesStateType = {}
            action.favoriteVacancies.forEach(fv => obj[fv.id] = fv)
            action.vacansies.forEach(v => {
                obj[v.id]
                    ? v.isFavorite = true
                    : v.isFavorite = false
            })
            return  {
                ...state,
                vacancies: [...action.vacansies],
                total: action.total < MAX_VACANCIES_COUNT ? action.total : MAX_VACANCIES_COUNT
            }
        case "UPDATE-FAVORITE-STATUS":
            return {
                ...state, 
                vacancies: state.vacancies.map(v =>
                    v.id === action.id
                        ? {...v, isFavorite: action.isFavorite}
                        : v)
            }
        default:
            return state
    }
}

export type VacanciesActionType = ReturnType<typeof setVacansiesAC>
    | ReturnType<typeof updateVacansyFavoriteStatusAC>

export const setVacansiesAC = (vacansies: Vacancy[], total: number, favoriteVacancies: Vacancy[]) => {
    return {
        type: "SET-VACANCIES",
        vacansies,
        total,
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

export const getVacancies = (
    favoriteVacancies: Vacancy[],
    params = defaultFilterParams,
    page = 1, count = 4
) => async (dispatch: Dispatch) => {
    const res = await vacancyAPI.getVacancies(params, page, count)
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
    const total = res.data.total
    dispatch(setVacansiesAC(vacancies, total, favoriteVacancies))
}
