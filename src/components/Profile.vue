<template>
	<LoadingTable v-if="loading"/>
	<div v-else>
		<div class="text-2xl text-center m-4">
			Stan konta: {{ balance }} zł
		</div>
		<AccountHistory />
	</div>
</template>

<script setup>
import AccountHistory from "@/components/AccountHistory.vue";
import { requestService } from "@/service/request-service";
import { onMounted, ref } from "vue";
import LoadingTable from "./loading/LoadingTable.vue";

const balance = ref(0)
const loading = ref(true)

function getUserBalance() {
	requestService.get('/user-profile')
		.then((response) => {
			loading.value = false
			balance.value = response.data
		})
		.catch((error) => {
			loading.value = false
			console.log('Error while fetching user balance: ', error)
		})
}

onMounted(() => {
	getUserBalance()
})

</script>

<style scoped></style>