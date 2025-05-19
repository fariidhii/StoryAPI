export const API_BASE_URL = 'https://story-api.dicoding.dev/v1';

class DataCerita {
    constructor() {
        this._token = localStorage.getItem('token');
    }

    async login({ email, password }) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const responseJson = await response.json();
            if (responseJson.error) {
                throw new Error(responseJson.message);
            }
            
            this._token = responseJson.loginResult.token;
            localStorage.setItem('token', this._token);
            return responseJson.loginResult;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async register({ name, email, password }) {
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const responseJson = await response.json();
            if (responseJson.error) {
                throw new Error(responseJson.message);
            }
            return responseJson;
        } catch (error) {
            console.error('Error registering:', error);
            throw error;
        }
    }

    isLoggedIn() {
        return !!this._token;
    }

    logout() {
        this._token = null;
        localStorage.removeItem('token');
    }
    async getStories() {
        try {
            const response = await fetch(`${API_BASE_URL}/stories`, {
                headers: {
                    'Authorization': `Bearer ${this._token}`
                }
            });
            const responseJson = await response.json();
            if (responseJson.error) {
                throw new Error(responseJson.message);
            }
            return responseJson.listStory;
        } catch (error) {
            console.error('Error fetching stories:', error);
            throw error;
        }
    }

    async addStory({ description, photo, lat, lon }) {
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('photo', photo);
            if (lat) formData.append('lat', lat);
            if (lon) formData.append('lon', lon);

            const response = await fetch(`${API_BASE_URL}/stories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this._token}`
                },
                body: formData
            });

            const responseJson = await response.json();
            if (responseJson.error) {
                throw new Error(responseJson.message);
            }
            return responseJson;
        } catch (error) {
            console.error('Error adding story:', error);
            throw error;
        }
    }

}

export default DataCerita; 