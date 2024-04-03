import axios from 'axios'
import {useUserStore} from "@/store/userStore"
import {config} from '@/config/config'

const baseUrl = config.baseUrl

class RequestService {

    async get(url) {
        const userStore = useUserStore()
        return await axios.get(baseUrl + url, {
            headers: {
                Authorization: 'Bearer ' + userStore.user.idToken
            }
        })
    }

    async post(url, body) {
        const userStore = useUserStore()
        return await axios.post(baseUrl + url, body, {
            headers: {
                Authorization: 'Bearer ' + userStore.user.idToken
            }
        })
    }
}

export const requestService = new RequestService()