import { FilterParamsType, FiltersFormValuesType } from "../../types";

const initialState: FilterParamsType = {
    keyword: '',
    payment_from: '',
    payment_to: '',
    category: ''
}

export const filterParamsReducer = (state = initialState, action: FilterParamsActionType): FilterParamsType => {
    switch (action.type) {
        case "SET-FORM-PARAMS":
            return { ...state,
                    category: action.formParams.category,
                    payment_from: action.formParams.payment_from,
                    payment_to: action.formParams.payment_to
                }
        case "SET-SEARCH-PARAMS":
            return { ...state, keyword: action.keyword }
        default:
            return state
    }
}

export type FilterParamsActionType = ReturnType<typeof setFormParamsAC>
    | ReturnType<typeof setSearchParamsAC>

export const setFormParamsAC = (formParams: FiltersFormValuesType) => {
    return {
        type: "SET-FORM-PARAMS",
        formParams,
    } as const
}

export const setSearchParamsAC = (keyword: string) => {
    return {
        type: "SET-SEARCH-PARAMS",
        keyword,
    } as const
}
