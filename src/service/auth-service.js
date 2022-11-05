import axios from 'axios';

const origin = window.location.origin;
const colonCount = origin.match(/:/g).length;
const originWOPortNo = colonCount == 1 
    ? origin
    : origin.slice(0, origin.lastIndexOf(':'));
const API_URL = originWOPortNo + ':8080/auth/';

class AuthService {
    login(user) {
        return axios.post(API_URL + 'signin', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            if(response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();