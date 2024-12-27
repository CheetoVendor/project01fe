import axios from 'axios'

class AuthService {
    login(credentials) {
        return axios.post('http://localhost:8080/api/login', credentials);
    }
}

export default new AuthService();