import { AxiosResponse, isAxiosError } from "axios"
import { showErrorNotification } from "./notificationUtils";
import { ServerError } from "../types";

export const handleError = (error: unknown, errorTitle = 'Что-то не так...') => {
    if (isAxiosError(error) || error instanceof Error) {
        showErrorNotification(error.message, errorTitle)
    } else {
        showErrorNotification('Неизвестная ошибка')
        console.error(error)
    }
}

export const handleServerError = (response: AxiosResponse) => {
    const error = response.data.error as ServerError
    showErrorNotification(error.message, `Ошибка сервера. Код ошибки ${error.code}`)
}
