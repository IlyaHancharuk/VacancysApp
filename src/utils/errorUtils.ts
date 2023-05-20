import { Dispatch } from "redux";
import { isAxiosError } from "axios"
import { showErrorNotification } from "./notificationUtils";

export const handleError = (error: unknown, dispatch: Dispatch) => {
    if (isAxiosError(error) || error instanceof Error) {
        showErrorNotification(error.message)
    } else {
        showErrorNotification('Some error occurred')
        console.error(error)
    }
}
