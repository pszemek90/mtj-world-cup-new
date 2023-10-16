import axios from 'axios';
import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand
} from "@aws-sdk/client-cognito-identity-provider";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import {useUserStore} from "@/store/userStore";

const origin = window.location.origin;
const colonCount = origin.match(/:/g).length;
const originWOPortNo = colonCount == 1 
    ? origin
    : origin.slice(0, origin.lastIndexOf(':'));
const API_URL = originWOPortNo + ':8080/auth/';
const REGION = 'eu-central-1'
const client = new CognitoIdentityProviderClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
        clientConfig: {region: REGION},
        identityPoolId: 'eu-central-1:b0882b74-ef50-420a-8a22-9c3db676d322'
    })
})
const clientId = 'ue9kvl53mbn4ni52bqgcpatn2'

class AuthService {

    async login(user) {
        const input = { // InitiateAuthRequest
            AuthFlow: "USER_PASSWORD_AUTH", // required
            AuthParameters: {
                "USERNAME": user.email,
                "PASSWORD": user.password
            },
            ClientId: clientId  // required
        };
        const command = new InitiateAuthCommand(input);
        return client.send(command)
    }
    

    logout() {
        localStorage.removeItem('user');
    }

    respondToNewPasswordChallenge(authResponse, username, newPassword) {
        console.log('authResponse: ', authResponse)
        console.log('authResponse session: ', authResponse.Session)
        console.log('username: ', username)
        console.log('newPassword', newPassword)
        const input = {
            ClientId: clientId,
            ChallengeName: 'NEW_PASSWORD_REQUIRED',
            ChallengeResponses: {
                'USERNAME': username,
                'NEW_PASSWORD': newPassword
            },
            Session: authResponse.Session
        }
        const command = new RespondToAuthChallengeCommand(input)
        return client.send(command)
    }
}

export const authService = new AuthService()


export default new AuthService();