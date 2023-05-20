import { notifications } from "@mantine/notifications";

export const showErrorNotification = (errorMessage: string | null, errorTitle = 'Что-то не так...') => {
    if (errorMessage) {
        notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: errorTitle,
            message: errorMessage,
            color: 'red',
            style: { backgroundColor: 'white' },
            sx: { backgroundColor: 'red' },
            loading: false,
          });
    }
}
