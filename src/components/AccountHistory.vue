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

<script>
import axios from 'axios'
import authHeader from "@/service/auth-header";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/vue/24/outline'

export default {
	name: "AccountHistory",
	components: {
		ChevronLeftIcon,
		ChevronRightIcon
	},
	data() {
		return {
			firstPage: 1,
			currentPage: 1,
			history: [],
			errorMessage: '',
			page: 1,
			total: 100
		}
	},
	computed: {
		lastPage() {
			return Math.floor(this.total / 10) + 1;
		}
	},
	methods: {
		getUserHistory() {
			this.errorMessage = ''
			this.history = []
			axios.get(this.$store.state.origin + ':8080/users/history',{
				params: {
					userId: this.$store.state.auth.user.id,
					pageNumber: this.currentPage
				},
				headers: authHeader()
			}).then((response) => {
				this.history = response.data.history
				this.total = response.data.total
			}).catch((error) => {
				this.errorMessage = 'Nie udało się pobrać historii użytkownika.'
			})
		},
		nextPage() {
			this.currentPage < this.lastPage
				? this.currentPage = this.currentPage + 1
				: this.currentPage = this.lastPage
			this.getUserHistory()
		},
		previousPage() {
			this.currentPage > this.firstPage
				? this.currentPage = this.currentPage - 1
				: this.currentPage = this.firstPage
			this.getUserHistory()
		},
		goToPage(event) {
			this.currentPage = parseInt(event.srcElement.innerText)
			this.getUserHistory()
		}
	},
	mounted() {
		this.getUserHistory()
	}
}
</script>

<style scoped>
.table-container {
	margin: 20px;
}
.table {
	width: 100%;
}
.message-cell {
	width: 100%;
	white-space: normal;
	min-width: 200px;
}
</style>