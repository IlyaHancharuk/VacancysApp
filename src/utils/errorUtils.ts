import { isAxiosError } from "axios"
import { showErrorNotification } from "./notificationUtils";

export const handleError = (error: unknown, errorTitle = 'Что-то не так...') => {
    if (isAxiosError(error) || error instanceof Error) {
        showErrorNotification(error.message, errorTitle)
    } else {
        showErrorNotification('Неизвестная ошибка')
        console.error(error)
    }
}
