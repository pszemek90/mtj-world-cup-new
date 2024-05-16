import axios from 'axios'
import { useUserStore } from "@/store/userStore"
import { config } from '@/config/config'
import { authService } from "@/service/auth-service";

const baseUrl = config.baseUrl

class RequestService {

    async get(url) {
        const userStore = useUserStore()
        return await axios.get(baseUrl + url, {
            headers: {
                Authorization: 'Bearer ' + userStore.user.idToken
            }
        }).catch(async error => {
            if(error.response.status === 401 && error.response.data.message === 'The incoming token has expired') {
                console.log('Token expired, refreshing...')
                let responseFromRefreshToken = await authService.refreshToken(userStore.user.refreshToken)
                userStore.updateToken(responseFromRefreshToken.AuthenticationResult.IdToken)
                return await axios.get(baseUrl + url, {
                    headers: {
                        Authorization: 'Bearer ' + userStore.user.idToken
                    }
                })
            }
        })
    }

    async post(url, body) {
        const userStore = useUserStore()
        return await axios.post(baseUrl + url, body, {
            headers: {
                Authorization: 'Bearer ' + userStore.user.idToken
            }
        }).catch(async error => {
            if (error.response.status === 401 && error.response.data.message === 'The incoming token has expired') {
                console.log('Token expired, refreshing...')
                let responseFromRefreshToken = await authService.refreshToken(userStore.user.refreshToken)
                userStore.updateToken(responseFromRefreshToken.AuthenticationResult.IdToken)
                return await axios.post(baseUrl + url, body, {
                    headers: {
                        Authorization: 'Bearer ' + userStore.user.idToken
                    }
                })
            }
        })
    }
}

export const requestService = new RequestService()