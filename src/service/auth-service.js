import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand,
    GetUserCommand,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand
} from "@aws-sdk/client-cognito-identity-provider";
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";

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

    async getUser(token) {
        const input = {
            "AccessToken": token
        }
        const command = new GetUserCommand(input)
        return await client.send(command)
    }

    async confirmResetPassword(email, verificationCode, newPassword) {
        const input = {
            ClientId: clientId,
            ConfirmationCode: verificationCode,
            Username: email,
            Password: newPassword
        }
        const command = new ConfirmForgotPasswordCommand(input)
        return client.send(command)
    }

    async resetPassword(email) {
        const input = {
            ClientId: clientId,
            Username: email
        }
        const command = new ForgotPasswordCommand(input)
        return client.send(command)
    }

    respondToNewPasswordChallenge(authResponse, username, newPassword) {
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

    async refreshToken(refreshToken) {
        const input = { // InitiateAuthRequest
            AuthFlow: "REFRESH_TOKEN_AUTH", // required
            AuthParameters: {
                "REFRESH_TOKEN": refreshToken,
            },
            ClientId: clientId  // required
        };
        const command = new InitiateAuthCommand(input);
        return client.send(command)
    }
}

export const authService = new AuthService()


export default new AuthService();