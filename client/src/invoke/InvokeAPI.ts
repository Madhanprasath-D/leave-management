import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export const UserLogin = async (path: string, data: any) => {
    const response = await api.post("/leaves", data);
    return response.data;
}

export const FetchLeaces = async (path: string) => {
    const response = await api.get("/leaves");
    return response.data;
}




