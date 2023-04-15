import axios from 'axios';

const instance = axios.create();

const request = {
    get: async (url, config = {}) => {
        verifyToken();
        return await instance.get(url, {
            ...config,
            headers: {
                token: localStorage.getItem("token")
            }
        });
    },
    post: async (url, data, config = {}) => {
        verifyToken();
        return await instance.post(url, data, {
            ...config,
            headers: {
                token: localStorage.getItem("token")
            }
        });
    },
    put: async (url, data, config = {}) => {
        verifyToken();
        return await instance.put(url, data, {
            ...config,
            headers: {
                token: localStorage.getItem("token")
            }
        });
    },
    delete: async (url,config = {}) => {
        verifyToken();
        return await instance.delete(url, {
            ...config,
            headers: {
                token: localStorage.getItem("token")
            }
        });
    }
}

async function verifyToken() {
    const token = localStorage.getItem("token");
    await axios.post('/api/auth/verify', {
        token
    }).then(r => r.data)
        .then(data => {
            localStorage.setItem("token", data);
        });
}

export default request;