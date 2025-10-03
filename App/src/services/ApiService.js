const baseURL = import.meta.env.VITE_API_URL;

class ApiService {
    constructor() {
        this.baseURL = baseURL;
    }

    async get(endpoint, options = {}) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options,
        });
        return response.json();
    }

    async post(endpoint, data, options = {}) {
        let fetchOptions = {
            method: 'POST',
            headers: { ...options.headers },
            ...options,
        };

        if (data instanceof FormData) {
            fetchOptions.body = data;
        } else {
            fetchOptions.headers['Content-Type'] = 'application/json';
            fetchOptions.body = JSON.stringify(data);
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, fetchOptions);
        return response.json();
    }

    async postRaw(path, options = {}) {
        const url = `${this.baseURL}${path.startsWith('/') ? '' : '/'}${path}`;
        return fetch(url, { method: 'POST', ...(options || {}) });
    }
}

export default new ApiService();