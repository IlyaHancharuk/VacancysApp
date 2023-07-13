import { demoVacanciesAPI, vacancyAPI } from "../../APITools/APITools";
import { DemoGetVacanciesResponseType, FilterParamsType, Vacancy } from "../../types";
import { Dispatch } from "redux";
import { setAppStatusAC } from "./appReducer";
import { handleError, handleServerError } from "../../utils/errorUtils";
import { useAppSelector } from "../store";

type FavoriteVacanciesStateType = {
    [id: number]: Vacancy
}

type VacansiesStateType = {
    vacancies: Vacancy[]
    MAX_VACANCIES_IN_PAGE: number
    currentPage: number
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
    currentPage: 1,
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
        case "UPDATE-PAGE":
            return {
                ...state, 
                currentPage: action.page
            }
        default:
            return state
    }
}

export type VacanciesActionType = ReturnType<typeof setVacansiesAC>
    | ReturnType<typeof updateVacansyFavoriteStatusAC>
    | ReturnType<typeof updateVacansiecPageAC>

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
export const updateVacansiecPageAC = (page: number) => {
    return {
        type: "UPDATE-PAGE",
        page
    } as const
}

export const getVacancies = (
    favoriteVacancies: Vacancy[],
    params = defaultFilterParams,
    page = 1, count = 4
) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await demoVacanciesAPI.getVacancies(params, page, count) as DemoGetVacanciesResponseType
        if (res.status === 200) {
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
            dispatch(setAppStatusAC('successed'))
        } else {
            // @ts-ignore
            handleServerError(res)
            dispatch(setAppStatusAC('failed'))
        }
    } catch (error) {
        handleError(error, 'Ошибка запроса')
        dispatch(setAppStatusAC('failed'))
    }
}
