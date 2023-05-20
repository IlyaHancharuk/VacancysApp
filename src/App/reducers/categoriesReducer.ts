import { vacancyAPI } from "../../APITools/APITools";
import { Category } from "../../types";
import { Dispatch } from "redux";
import { setAppStatusAC } from "./appReducer";
import { handleError } from "../../utils/errorUtils";

const initialState: Category[] = []

export const categoriesReducer = (state = initialState, action: CategoriesActionType): Category[] => {
    switch (action.type) {
        case "SET-CATEGORIES":
            return [ ...state, ...action.categories ]
        default:
            return state
    }
}

export type CategoriesActionType = ReturnType<typeof setCategoriesAC>
export const setCategoriesAC = (categories: Category[]) => {
    return {
        type: "SET-CATEGORIES",
        categories,
    } as const
}

export const getCaregories = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await vacancyAPI.getCategories()
        const categories = res.data.map(c => ({
            key: c.key,
            title_rus: c.title_rus,
            title_trimmed: c.title_trimmed
        }))
        dispatch(setCategoriesAC(categories))
        dispatch(setAppStatusAC('successed'))
    } catch (error) {
        handleError(error, 'Ошибка запроса')
        dispatch(setAppStatusAC('failed'))
    }
}
