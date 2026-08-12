import api from "./api";

export const getAllCakes = async () => {
    const response = await api.get("/catalog/cakes");
    return response.data;
};

export const getCakeById = async (id) => {
    const response = await api.get(`/catalog/cakes/${id}`);
    return response.data;
};

export const searchCakes = async (name) => {
    const response = await api.get(
        `/catalog/search?name=${encodeURIComponent(name)}`
    );

    return response.data;
};