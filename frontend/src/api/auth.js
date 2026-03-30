import { axiosInstance } from "./index";

const signupuser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/auth/register', userData);
        return response.data;

    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
};

const loginuser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', userData);
        return response.data;

    } catch (error) {
        return error.response?.data || { success: false, message: error.message };
    }
};

export { signupuser, loginuser };
