import api from "./api";

export const getNotifications = async () => {
    const response = await api.get(
        "/api/notifications"
    );

    return response.data;
};

export const getNotificationsByOrder = async (orderId) => {
    const response = await api.get(
        `/api/notifications/order/${orderId}`
    );

    return response.data;
};