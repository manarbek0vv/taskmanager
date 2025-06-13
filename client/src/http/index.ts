import axios, { AxiosError } from "axios";
import { AuthResponseDto } from "../dto/index.dto";

const API_URL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error instanceof AxiosError) {
        const originalRequest = error.request;
        let isRetry = false;

        if (!originalRequest || isRetry || error.response?.status !== 401) throw error;

        try {
            isRetry = true;
            const response = await axios.post<AuthResponseDto>(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);
            return $api.request(originalRequest)
        } catch (error) {
            throw error;
        }
    }
    throw error;
})