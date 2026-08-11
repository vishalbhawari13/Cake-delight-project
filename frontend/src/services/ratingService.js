import api from "./api";

export const createRating = async (ratingData) => {
    const response = await api.post(
        "/api/ratings",
        ratingData
    );

    return response.data;
};

export const getCakeRatings = async (cakeId) => {
    const response = await api.get(
        `/api/ratings/cake/${cakeId}`
    );

    return response.data;
};

export const getAverageRating = async (cakeId) => {
    const response = await api.get(
        `/api/ratings/cake/${cakeId}/average`
    );

    return response.data;
};

export const getRatingById = async (ratingId) => {
    const response = await api.get(
        `/api/ratings/${ratingId}`
    );

    return response.data;
};

export const updateRating = async (ratingId, data) => {
    const response = await api.put(
        `/api/ratings/${ratingId}`,
        data
    );

    return response.data;
};

export const deleteRating = async (ratingId) => {
    const response = await api.delete(
        `/api/ratings/${ratingId}`
    );

    return response.data;
};