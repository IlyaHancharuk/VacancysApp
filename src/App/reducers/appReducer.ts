import { Dispatch } from "redux";
import { demoVacanciesAPI, vacancyAPI } from "../../APITools/APITools";
import { handleError } from "../../utils/errorUtils";
import { AuthResponseType } from "../../types";
import { notifications } from "@mantine/notifications";

type RequestStatusType = 'loading' | 'successed' | 'failed';
type AppStateType = {
    status: RequestStatusType ;
    error: string | null;
};

const initialState: AppStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status };
        case 'APP/SET-ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
}

export type AppActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}

export const getAuth = () => async (dispatch: Dispatch) => {
    try {
        const authDataStr = localStorage.getItem('joboredAuthData')
        if (authDataStr) {
            const authData: AuthResponseType = JSON.parse(authDataStr)
            if (Date.now() / 1000 > authData.ttl) {
                const res = await vacancyAPI.refreshToken(authData.refresh_token)
                localStorage.setItem('joboredAuthData', JSON.stringify(res.data))
            }
        } else {
            const res = await vacancyAPI.getAuth()
            localStorage.setItem('joboredAuthData', JSON.stringify(res.data))
        }
    } catch (error) {
        handleError(error, 'Ошибка аутентификации')
    }
}

export const getDemoAuth = () => async (dispatch: Dispatch) => {
    try {
        const authDataStr = localStorage.getItem('_DEMO_joboredAuthData')
        if (authDataStr) {
            notifications.show({
                withCloseButton: true,
                autoClose: 2000,
                title: 'Aутентификация',
                message: authDataStr,
                color: 'green',
                style: { backgroundColor: 'white' },
                sx: { backgroundColor: 'green' },
                loading: false,
            });
        } else {
            const res = await demoVacanciesAPI.getAuth() as string
            localStorage.setItem('_DEMO_joboredAuthData', JSON.stringify(res))
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                title: 'Aутентификация',
                message: res,
                color: 'green',
                style: { backgroundColor: 'white' },
                sx: { backgroundColor: 'green' },
                loading: false,
            });
        }
    } catch (error) {
        handleError(error, 'Ошибка аутентификации')
    }
}
