import { Vacancy } from "../../types";
import { Dispatch } from "redux";
import { updateVacansyFavoriteStatusAC } from "./vacanciesReducer";
import { AppRootStateType } from "../store";
import { favoriteVacanciesAPI } from "../../APITools/APITools";

const initialState: Vacancy[] = []

export const favoriteReducer = (state = initialState, action: FavoriteActionType): Vacancy[] => {
    switch (action.type) {
        case "SET-FAVORITE-VACANCIES":
            return [ ...state, ...action.vacancies ]
        case "ADD-FAVORITE-VACANCY":
            return [ { ...action.vacancy, isFavorite: true }, ...state ]
        case "REMOVE-FAVORITE-VACANCY":
            return state.filter(v => v.id !== action.id)
        default:
            return state
    }
}

export type FavoriteActionType = ReturnType<typeof setFavoriteVacanciesAC>
    | ReturnType<typeof addFavoriteVacancyAC>
    | ReturnType<typeof removeFavoriteVacancyAC>

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

export const getFavoriteVacancies = () => (dispatch: Dispatch) => {
    const favoriteVacancies = favoriteVacanciesAPI.getFavoriteVacancies()
    if(favoriteVacancies) {
        dispatch(setFavoriteVacanciesAC(favoriteVacancies))
    }
}

export const addFavoriteVacancy = (vacancy: Vacancy) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    favoriteVacanciesAPI.addFavoriteVacancies(vacancy)
    dispatch(updateVacansyFavoriteStatusAC(vacancy.id, true))
    dispatch(addFavoriteVacancyAC(vacancy))
}

export const removeFavoriteVacancy = (vacancyId: number) => (
    dispatch: Dispatch,
    getState: () => AppRootStateType
) => {
    favoriteVacanciesAPI.removeFavoriteVacancies(vacancyId)
    dispatch(updateVacansyFavoriteStatusAC(vacancyId, false))
    dispatch(removeFavoriteVacancyAC(vacancyId))
}





