import axios from 'axios';

const API_URL = this.$store.state.origin + ':8080/auth/';

class AuthService {
    login(user) {
        console.log('user ' + user)
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