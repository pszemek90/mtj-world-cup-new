<template>
	<div v-for="(typingsFromDate, date) in typings" :key="date" class="my-1">
		<button @click="toggleTypings(typingsFromDate)"
		        class="flex align-baseline my-auto m-2 border-2 border-dark dark:border-light max-w-fit rounded-lg p-1
						transition ease-in-out duration-500 hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark">
			<ChevronRightIcon v-if="!typingsFromDate.isShown" class="h-5 w-5"/>
			<ChevronDownIcon v-else class="h-5 w-5"/>
			<span>{{date}}</span>
		</button>
		<div v-for="(userTypings, match) in typingsFromDate" :key="match" v-if="typingsFromDate.isShown">
			<button @click="toggleTypings(userTypings)" v-if="Array.isArray(userTypings)"
			        class="flex align-baseline my-auto m-2 ml-6 border-2 border-dark dark:border-light max-w-fit rounded-lg p-1
						transition ease-in-out duration-500 hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark">
				<ChevronRightIcon v-if="!userTypings.isShown" class="h-5 w-5"/>
				<ChevronDownIcon v-else class="h-5 w-5"/>
				<span>{{match}}</span>
			</button>
			<table class="m-1 ml-6" v-if="userTypings.isShown">
				<tr class="border border-dark dark:border-light">
					<th class="p-1">Użytkownik</th>
					<th class="p-1">Wynik</th>
				</tr>
				<tr v-for="typing in userTypings" class="border border-dark dark:border-light">
					<td class="p-1 text-center items-center">
						<span>{{typing.user}}</span>
					</td>
					<td class="p-1 flex">
						<span>{{typing.result}}</span>
						<CheckIcon v-if="typing.isCorrect === true" class="h-6 w-6 mx-auto"/>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script setup>

import {CheckIcon} from '@heroicons/vue/24/solid'
import {ChevronRightIcon, ChevronDownIcon} from '@heroicons/vue/24/outline'
import {onMounted, ref} from "vue";
import {requestService} from "@/service/request-service";

const typings = ref(null)

function getAllTypings() {
	requestService.get('/all-typings')
		.then((response) => {
			typings.value = response.data;
		})
}
function toggleTypings(typing) {
	typing.isShown = !typing.isShown
}
onMounted(() => {
	getAllTypings()
})
</script>

<style scoped></style>