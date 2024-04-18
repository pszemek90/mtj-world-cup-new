<template>
	<div class="text-2xl text-center m-4">
		Stan konta: {{ balance }} zł
	</div>
	<!-- <AccountHistory /> -->
</template>

<script setup>
import AccountHistory from "@/components/AccountHistory.vue";
import { requestService } from "@/service/request-service";
import { onMounted, ref } from "vue";

const balance = ref(0)
const oldPassword = ref('')
const newPassword = ref('')
const retypePassword = ref('')
const message = ref('')
const isOpen = ref(false)

function getUserBalance() {
	requestService.get('/user-profile')
		.then((response) => {
			balance.value = response.data
		})
}

onMounted(() => {
	getUserBalance()
})

</script>

<style scoped></style>