import axios from 'axios'

const API_BASE_URL = "http://localhost:8080/api"

class AuthService {
    login(credentials) {
        return axios.post('http://localhost:8080/api/login', credentials);
    }
}

export default new AuthService();