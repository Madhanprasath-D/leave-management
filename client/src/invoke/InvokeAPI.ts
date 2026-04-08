import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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

export const UserLogin = async (data: any) => {
    try {
        const response = await api.post('/auth/login', data);
        return response
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to fetch leaves");
    }
}


export const UserSignUp = async (data: any) => {
    try {
        const response = await api.post('/auth/signup', data);
        return response
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to fetch leaves");
    }
}

export const GetLeaves = async (path: string) => {
    try {
        const res = await api.get(path);
        return res.data;
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Failed to fetch leaves");
    }
};

export const ApplyLeave = async (data: any) => {
  try {
    const res = await api.post('/leaves/apply', data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Apply failed");
  }
};


export const CancelLeave = async (path:string) => {
  try {
    const res = await api.delete(path);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Cancel failed");
  }
};


export const GetUsers = async (path:string) => {
  try {
    const res = await api.get(path);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Cancel failed");
  }
};

export const UpdateStatus = async (path:string, data: any) => {
  try {
    const res = await api.patch(path, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Cancel failed");
  }
};

export const GetMetadata = async (path:string) => {
  try {
    const res = await api.get(path);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Cancel failed");
  }
};


