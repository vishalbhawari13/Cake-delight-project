import api from "./api";

export const getNotifications = async () => {
    const response = await api.get(
        "/notifications"
    );

    return response.data;
};

export const getNotificationsByOrder = async (orderId) => {
    const response = await api.get(
        `/notifications/order/${orderId}`
    );

    return response.data;
};