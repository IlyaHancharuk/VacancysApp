import { Vacancy } from "../../types";
import { Dispatch } from "redux";
import { updateVacansyFavoriteStatusAC } from "./vacanciesReducer";
import { favoriteVacanciesAPI } from "../../APITools/APITools";
import { setAppStatusAC } from "./appReducer";
import { handleError } from "../../utils/errorUtils";

type FavoriteStateType = {
    allFavorite: Vacancy[]
    MAX_VACANCIES_IN_PAGE: number
    currentPage: number
    favoriteToView(): Vacancy[]
    totalPage(): number
}

const initialState: FavoriteStateType = {
    allFavorite: [],
    MAX_VACANCIES_IN_PAGE: 4,
    currentPage: 1,
    favoriteToView() {
        const endIndex = this.currentPage * this.MAX_VACANCIES_IN_PAGE
        const startIndex = endIndex - this.MAX_VACANCIES_IN_PAGE
        return this.allFavorite.slice(startIndex, endIndex)
    },
    totalPage() {
        return Math.ceil(this.allFavorite.length / this.MAX_VACANCIES_IN_PAGE) 
    }
}

export const favoriteReducer = (state = initialState, action: FavoriteActionType): FavoriteStateType => {
    switch (action.type) {
        case "SET-FAVORITE-VACANCIES":
            return {
                ...state,
                allFavorite: [ ...state.allFavorite, ...action.vacancies ],
            }
        case "ADD-FAVORITE-VACANCY":
            return {
                ...state,
                allFavorite: [{ ...action.vacancy, isFavorite: true }, ...state.allFavorite ],
            }
        case "REMOVE-FAVORITE-VACANCY":
            return {
                ...state,
                allFavorite: state.allFavorite.filter(v => v.id !== action.id),
            }
        case "CHANGE-FAVORITE-PAGE":
            return {
                ...state,
                currentPage: action.page
            }
        default:
            return state
    }
}

export type FavoriteActionType = ReturnType<typeof setFavoriteVacanciesAC>
    | ReturnType<typeof addFavoriteVacancyAC>
    | ReturnType<typeof removeFavoriteVacancyAC>
    | ReturnType<typeof changeFavoritePageAC>

export const setFavoriteVacanciesAC = (vacancies: Vacancy[]) => {
    return {
        type: "SET-FAVORITE-VACANCIES",
        vacancies
    } as const
}
export const addFavoriteVacancyAC = (vacancy: Vacancy) => {
    return {
        type: "ADD-FAVORITE-VACANCY",
        vacancy
    } as const
}
export const removeFavoriteVacancyAC = (id: number) => {
    return {
        type: "REMOVE-FAVORITE-VACANCY",
        id
    } as const
}
export const changeFavoritePageAC = (page: number) => {
    return {
        type: "CHANGE-FAVORITE-PAGE",
        page
    } as const
}

export const getFavoriteVacancies = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const favoriteVacancies = favoriteVacanciesAPI.getFavoriteVacancies()
            if(favoriteVacancies) {
                dispatch(setFavoriteVacanciesAC(favoriteVacancies))
                dispatch(setAppStatusAC('successed'))
            } else {
                dispatch(setAppStatusAC('failed'))
            }
    } catch (error) {
        handleError(error, 'Ошибка запроса')
        dispatch(setAppStatusAC('failed'))
    }
}

export const addFavoriteVacancy = (vacancy: Vacancy) => (
    dispatch: Dispatch,
) => {
    dispatch(setAppStatusAC('loading'))
    try {
        favoriteVacanciesAPI.addFavoriteVacancies(vacancy)
        dispatch(updateVacansyFavoriteStatusAC(vacancy.id, true))
        dispatch(addFavoriteVacancyAC(vacancy))
        dispatch(setAppStatusAC('successed'))
    } catch (error) {
        handleError(error, 'Ошибка запроса')
        dispatch(setAppStatusAC('failed'))
    }
}

export const removeFavoriteVacancy = (vacancyId: number) => (
    dispatch: Dispatch,
) => {
    dispatch(setAppStatusAC('loading'))
    try {
        favoriteVacanciesAPI.removeFavoriteVacancies(vacancyId)
        dispatch(updateVacansyFavoriteStatusAC(vacancyId, false))
        dispatch(removeFavoriteVacancyAC(vacancyId))
        dispatch(setAppStatusAC('successed'))
    } catch (error) {
        handleError(error, 'Ошибка запроса')
        dispatch(setAppStatusAC('failed'))
    }
}
