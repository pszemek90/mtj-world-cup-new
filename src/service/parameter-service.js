import {SSMClient, GetParameterCommand} from '@aws-sdk/client-ssm'
import {CognitoIdentityClient, GetOpenIdTokenCommand} from "@aws-sdk/client-cognito-identity";
import {STSClient, AssumeRoleWithWebIdentityCommand} from "@aws-sdk/client-sts";

const REGION = 'eu-central-1'

const identityClient = new CognitoIdentityClient({region: REGION})
const id = 'eu-central-1:e3f84ce9-d2f8-4248-953b-f210bb20cd12'
const getOpenIdTokenCommand = new GetOpenIdTokenCommand({
    IdentityId: id
})
const token = await identityClient.send(getOpenIdTokenCommand)
const stsClient = new STSClient({region: REGION})
const stsInput = {
    RoleArn: "arn:aws:iam::249702782898:role/service-role/mtj-cognito-unauth-identity-role", // required
    RoleSessionName: "unauth-session", // required
    WebIdentityToken: token.Token, // required
    Policy: "{\n" +
        "    \"Version\": \"2012-10-17\",\n" +
        "    \"Statement\": [\n" +
        "        {\n" +
        "            \"Sid\": \"VisualEditor0\",\n" +
        "            \"Effect\": \"Allow\",\n" +
        "            \"Action\": \"ssm:GetParameter\",\n" +
        "            \"Resource\": \"*\"\n" +
        "        }\n" +
        "    ]\n" +
        "}",
    DurationSeconds: 900,
};
const stsCredentials = await stsClient.send(new AssumeRoleWithWebIdentityCommand(stsInput));
const client = new SSMClient({
    region: REGION,
    credentials: {
        accessKeyId: stsCredentials.Credentials.AccessKeyId,
        secretAccessKey: stsCredentials.Credentials.SecretAccessKey,
        sessionToken: stsCredentials.Credentials.SessionToken
    }
})

class ParameterService {
    async getParameter(parameterName) {
        const input = {
            Name: parameterName,
            WithDecryption: false
        }
        const command = new GetParameterCommand(input)
        const response = await client.send(command)
        return response.Parameter.Value
    }
}

export default new ParameterService()