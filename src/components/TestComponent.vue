<template>
	<div v-for="match in matches">
		<div>{{match.homeTeam}}</div>
	</div>
	<input type="text" v-model="username"/>
	<input type="password" v-model="pass"/>
	<button @click="login">Login</button>
	<button @click.prevent="getMatches">Get Matches</button>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import {fromCognitoIdentityPool} from '@aws-sdk/credential-providers';

const name = 'TestComponent'
const matches = ref([])
const token = ref('')
const username = ref('')
const pass = ref('')
const REGION = 'eu-central-1'

async function getMatches() {
	axios.get('https://d3r1f197x306df.cloudfront.net/matches', {
		headers: {
			Authorization: 'Bearer ' + token.value
		}
	})
		.then((response) => {
			matches.value = response.data
		})
}

async function login() {
	const client = new CognitoIdentityProviderClient({
		region: REGION,
		credentials: fromCognitoIdentityPool({
			clientConfig: {region: REGION},
			identityPoolId: 'eu-central-1:b0882b74-ef50-420a-8a22-9c3db676d322'
		})
	})
	const input = { // InitiateAuthRequest
		AuthFlow: "USER_PASSWORD_AUTH", // required
		AuthParameters: {
			"PASSWORD": pass.value,
			"USERNAME": username.value
		},
		ClientId: "ue9kvl53mbn4ni52bqgcpatn2" // required
	};
	const command = new InitiateAuthCommand(input);
	const response = await client.send(command);
	console.log('response', response)
	token.value = response.AuthenticationResult.IdToken
	console.log('token: ', token.value)
}

</script>

<style scoped>

</style>