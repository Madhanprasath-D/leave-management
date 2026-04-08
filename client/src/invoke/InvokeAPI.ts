import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5005/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const UserLogin = async (path: string, data: any) => {
    const response = await api.post(path, data);
    return response
}

export const FetchLeaces = async (path: string) => {
    const response = await api.get("/leaves");
    return response.data;
}




