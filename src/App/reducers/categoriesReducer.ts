import { vacancyAPI } from "../../APITools/APITools";
import { Category } from "../../types";
import { Dispatch } from "redux";

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
    const res = await vacancyAPI.getCategories()
    const categories = res.data.map(c => ({ key: c.key, title_rus: c.title_rus }))
    dispatch(setCategoriesAC(categories)) 
}
