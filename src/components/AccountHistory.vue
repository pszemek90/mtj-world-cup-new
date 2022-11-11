<template>
	<ui-table class="table" :data="history" :thead="head" :tbody="body">
		<template #message="{ data }">
			<div class="message-cell">{{ data.message }}</div>
		</template>
		<ui-pagination v-model="page" show-total :total="total" mini>
		</ui-pagination>
	</ui-table>
</template>

<script>
import BalmUI from 'balm-ui'
import axios from 'axios'
import authHeader from "@/service/auth-header";

export default {
	name: "AccountHistory",
	data() {
		return {
			history: [],
			head: [{
				value: 'Zdarzenie',
				colspan: 2,
				align: 'center'
			},{
				value: 'Zmiana',
				align: 'center'
			}],
			body: [{
				field: 'timestamp',
				align: 'left'
			}, {
				slot: 'message',
				align: 'left'
			}, {
				field: 'difference',
				align: 'center'
			}],
			errorMessage: '',
			page: 1,
			total: 100
		}
	},
	methods: {
		getUserHistory() {
			this.errorMessage = ''
			axios.get(this.$store.state.origin + ':8080/users/history',{
				params: {
					userId: this.$store.state.auth.user.id
				},
				headers: authHeader()
			}).then((response) => {
				this.history = response.data
			}).catch((error) => {
				this.errorMessage = 'Nie udało się pobrać historii użytkownika.'
			})
		}
	},
	mounted() {
		this.getUserHistory()
	}
}
</script>

<style scoped>
.table {
	box-sizing: border-box;
	margin: 20px;
}
.message-cell {
	width: 100%;
	white-space: normal;
	min-width: 200px;
}
</style>