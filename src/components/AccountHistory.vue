<template>
	<div class="border border-dark dark:border-light rounded-lg relative m-4 mb-0 p-1">
		<table class="w-full">
			<tr class="grid grid-cols-6 border-b border-dark dark:border-light">
				<th class="col-span-5">Zdarzenie</th>
				<th>Wygrana</th>
			</tr>
			<tr v-for="entry in history" :key="entry.date"
			    class="grid grid-cols-6 text-center border-b border-dark dark:border-light last:border-b-0">
				<td class="col-span-5 grid grid-cols-6">
					<span>{{entry.date}}</span>
					<span class="col-span-5 text-left">
						{{entry.message}}
					</span>
				</td>
				<td>
					<span>{{entry.amount}} zł</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {requestService} from "@/service/request-service";

const history = ref([])
const errorMessage = ref('')

function getUserHistory() {
	errorMessage.value = ''
	history.value = []
	requestService.get('/user-history')
	.then((response) => {
		history.value = response.data
	}).catch((error) => {
		errorMessage.value = 'Nie udało się pobrać historii użytkownika.'
	})
}
onMounted(() => {
	getUserHistory()
})
</script>

<style scoped></style>