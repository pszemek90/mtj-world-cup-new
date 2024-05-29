<template>
	<LoadingTable v-if="loading"/>
	<div v-else class="mx-auto border border-dark dark:border-light rounded-lg w-fit">
		<table class="m-1 border-collapse">
			<tr class="border-b border-dark dark:border-light">
				<th class="p-1">Użytkownik</th>
				<th class="p-1">Trafione</th>
				<th class="p-1">Saldo</th>
			</tr>
			<tr v-for="typer in typers" class="border-b border-dark dark:border-light last:border-b-0">
				<td class="p-1 text-center items-center">{{typer.username}}</td>
				<td class="p-1 text-center items-center">{{typer.correctTypings}}</td>
				<td class="p-1 text-center items-center">{{typer.balance}}</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {requestService} from "../service/request-service";
import LoadingTable from "./loading/LoadingTable.vue";

const typers = ref([])
const loading = ref(true)

function getTypers() {
	requestService.get('/typers')
	.then((response) => {
		loading.value = false
		typers.value = response.data
	})
	.catch((error) => {
		loading.value = false
		console.log('Error while fetching typers: ', error)
	})
}
onMounted(() => {
	getTypers()
})
</script>

<style scoped>

</style>