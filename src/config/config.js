import parameterService from '@/service/parameter-service'

const environments = {
    local: {
        baseUrl: 'http://localhost:3000'
    },
    prod: {
        baseUrl: await parameterService.getParameter('mtj-url')
    }
}

export const config = environments[process.env.NODE_ENV || 'prod']