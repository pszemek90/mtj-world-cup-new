<template>
	<div class="table-container">
		<ui-table class="table" :data="history" :thead="head" :tbody="body">
			<template #message="{ data }">
				<div class="message-cell">{{ data.message }}</div>
			</template>
			<ui-pagination v-model="page" show-total :total="total" @update:model-value="getUserHistory">
			</ui-pagination>
		</ui-table>
	</div>
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
					userId: this.$store.state.auth.user.id,
					pageNumber: this.page
				},
				headers: authHeader()
			}).then((response) => {
				this.history = response.data.history
				this.total = response.data.total
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