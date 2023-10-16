import { defineStore } from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
    const initialUser = JSON.parse(localStorage.getItem('user'))
    const user = ref(initialUser || {
        isLoggedIn: false,
        email: '',
        idToken: ''
    })

    function login(userToLog) {
        user.value = userToLog
    }
    function logout() {
        user.value = null
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