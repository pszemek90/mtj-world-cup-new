export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('user in auth header: ' + user)
    if(user && user.token) {
        console.log('user token in auth header: ' + user.token)
        return { Authorization: 'Bearer ' + user.token};
    } else {
        return {};
    }
}