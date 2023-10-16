<template>	
	<button @click.prevent="getMatches">Get Matches</button>
</template>

<script setup>

import {inject, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/store/userStore";

const name = 'TestComponent'
const matches = ref([])
const baseUrl = inject('baseUrl')
const userStore = useUserStore()

async function getMatches() {
	axios.get(baseUrl + '/matches', {
		headers: {
			Authorization: 'Bearer ' + userStore.user.idToken
		}
	})
		.then((response) => {
			matches.value = response.data
		})
}
</script>

<style scoped>

</style>