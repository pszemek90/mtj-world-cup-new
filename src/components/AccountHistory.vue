<template>
	<div class="border border-dark dark:border-light rounded-lg relative m-4 mb-0 p-1">
		<table class="w-full">
			<tr class="grid grid-cols-6 border-b border-dark dark:border-light">
				<th class="col-span-5">Zdarzenie</th>
				<th>Zmiana</th>
			</tr>
			<tr v-for="entry in history" :key="entry.timestamp"
			    class="grid grid-cols-6 text-center border-b border-dark dark:border-light last:border-b-0">
				<td class="col-span-5 grid grid-cols-6">
					<span>{{entry.timestamp}}</span>
					<span class="col-span-5 text-left">{{entry.message}}</span>
				</td>
				<td>
					<span>{{entry.difference}}</span>
				</td>
			</tr>
		</table>
	</div>
	<div class="absolute right-0 flex mr-4">
		<ChevronLeftIcon @click="previousPage"
			class="h-6 w-6 border border-dark rounded dark:border-light m-0.5 cursor-pointer"/>
		<button v-if="firstPage < currentPage" @click="goToPage($event)"
		        class="h-6 w-6 min-w-fit border border-dark rounded text-dark dark:text-light dark:bg-dark dark:border-light m-0.5">
			{{ firstPage }}
		</button>
		<button v-if="currentPage - firstPage > 2"
		        class="h-6 w-6 min-w-fit  rounded text-dark dark:text-light dark:bg-dark m-0.5 cursor-default">
			...
		</button>
		<button v-if="currentPage - 1 > firstPage" @click="goToPage($event)"
		        class="h-6 w-6 min-w-fit  border border-dark rounded text-dark dark:text-light dark:bg-dark dark:border-light m-0.5">
			{{ currentPage - 1}}
		</button>
		<button class="h-6 w-6 min-w-fit border border-dark rounded text-light bg-dark dark:text-dark dark:bg-light dark:border-light m-0.5">
			{{ currentPage }}
		</button>
		<button v-if="currentPage + 1 < lastPage" @click="goToPage($event)"
		        class="h-6 w-6 min-w-fit border border-dark rounded text-dark dark:text-light dark:bg-dark dark:border-light m-0.5">
			{{ currentPage + 1 }}
		</button>
		<button v-if="lastPage - currentPage > 2"
		        class="h-6 w-6 min-w-fit rounded text-dark dark:text-light dark:bg-dark m-0.5 cursor-default">
			...
		</button>
		<button v-if="lastPage > currentPage" @click="goToPage($event)"
		        class="h-6 w-6 min-w-fit border border-dark rounded text-dark dark:text-light dark:bg-dark dark:border-light m-0.5">
			{{ lastPage }}
		</button>
		<ChevronRightIcon @click="nextPage"
			class="h-6 w-6 border border-dark rounded dark:border-light m-0.5 cursor-pointer"/>
	</div>
</template>

<script setup>
import axios from 'axios'
import authHeader from "@/service/auth-header";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/24/outline'
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const firstPage = ref(1)
const currentPage = ref(1)
const history = ref([])
const errorMessage = ref('')
const total = ref(100)
const store = useStore()
const lastPage = computed(() => {
	return Math.floor(total.value / 10) + 1
})
function getUserHistory() {
	errorMessage.value = ''
	history.value = []
	axios.get(store.state.origin + ':8080/users/history',{
		params: {
			userId: store.state.auth.user.id,
			pageNumber: currentPage.value
		},
		headers: authHeader()
	}).then((response) => {
		history.value = response.data.history
		total.value = response.data.total
	}).catch((error) => {
		errorMessage.value = 'Nie udało się pobrać historii użytkownika.'
	})
}
function nextPage() {
	currentPage.value < lastPage.value
		? currentPage.value = currentPage.value + 1
		: currentPage.value = lastPage.value
	getUserHistory()
}
function previousPage() {
	currentPage.value > firstPage.value
		? currentPage.value = currentPage.value - 1
		: currentPage.value = firstPage.value
	getUserHistory()
}
function goToPage(event) {
	currentPage.value = parseInt(event.srcElement.innerText)
	getUserHistory()
}
onMounted(() => {
	getUserHistory()
})
</script>

<style scoped></style>