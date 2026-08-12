import api from "./api";

export const addToBasket = async (cakeId, quantity) => {
    const response = await api.post("/orders/basket", {
        cakeId,
        quantity
    });

    return response.data;
};

export const getBasket = async () => {
    const response = await api.get("/orders/basket");
    return response.data;
};

export const updateBasket = async (basketId, quantity) => {
    const response = await api.put(
        `/orders/basket/${basketId}`,
        {
            quantity
        }
    );

    return response.data;
};

export const removeFromBasket = async (basketId) => {
    const response = await api.delete(
        `/orders/basket/${basketId}`
    );

    return response.data;
};

export const clearBasket = async () => {
    const response = await api.delete(
        "/orders/basket"
    );

    return response.data;
};

export const checkout = async (customerData) => {
    const response = await api.post(
        "/orders/checkout",
        customerData
    );

    return response.data;
};

export const getOrders = async () => {
    const response = await api.get("/orders");
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(
        `/orders/${orderId}`
    );

    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(
        `/orders/${orderId}/status`,
        {
            status
        }
    );

    return response.data;
};