import axios from 'axios'
import {useUserStore} from "@/store/userStore"
import {config} from '@/config/config'

const baseUrl = config.baseUrl

class RequestService {
    async get(url) {
        const userStore = useUserStore()
        return await axios.get(baseUrl + "/prod/api" + url, {
            headers: {
                Authorization: 'Bearer ' + userStore.user.idToken
            }
        })
    }
}

export const requestService = new RequestService()