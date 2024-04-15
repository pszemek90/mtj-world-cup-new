import { defineStore } from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const initialUser = JSON.parse(localStorage.getItem('user'))
    const emptyUser = {
        isLoggedIn: false,
        email: '',
        idToken: '',
        username: 'nieznajomy'
    }
    const user = ref(initialUser || emptyUser)

    function login(userToLog) {
        user.value = userToLog
        localStorage.setItem('user', JSON.stringify(userToLog))
    }
    function logout() {
        localStorage.removeItem('user')
        user.value = emptyUser
    }

    function test() {
        console.log('test')
    }

    return {
        user,
        test,
        login,
        logout
    }
})