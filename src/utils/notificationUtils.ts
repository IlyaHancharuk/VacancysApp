import { notifications } from "@mantine/notifications";

export const showErrorNotification = (errorMessage: string | null) => {
    if (errorMessage) {
        notifications.show({
            withCloseButton: true,
            autoClose: 5000,
            title: "Что-то не так...",
            message: `Текст ошибки: ${errorMessage}`,
            color: 'red',
            style: { backgroundColor: 'white' },
            sx: { backgroundColor: 'red' },
            loading: false,
          });
    }
}
