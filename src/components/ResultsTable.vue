<template>
	<div v-for="(typingsFromDate, key) in typings" :key="key" class="my-1">
		<button @click="toggleTypings(typingsFromDate)"
		        class="flex align-baseline my-auto m-2 border-2 border-dark dark:border-light max-w-fit rounded-lg p-1
						transition ease-in-out duration-500 hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark">
			<ChevronRightIcon v-if="!typingsFromDate.isShown" class="h-5 w-5"/>
			<ChevronDownIcon v-else class="h-5 w-5"/>
			<span>{{key}}</span>
		</button>
		<table class="m-1 ml-6" v-if="typingsFromDate.isShown">
			<tr class="border border-dark dark:border-light">
				<th class="p-1">Mecz</th>
				<th class="p-1" v-if="props.type === 'typings'">Status</th>
				<th class="p-1" v-if="props.type === 'results'">Trafione</th>
			</tr>
			<tr v-for="typing in typingsFromDate" class="border border-dark dark:border-light">
				<td class="p-1 flex text-center items-center">
					<span class="max-w-48">{{typing.homeTeam}}</span>
					<div class="w-12">{{typing.result}}</div>
					<span class="max-w-48">{{typing.awayTeam}}</span>
				</td>
				<td class="p-1" v-if="props.type === 'typings'">
					<CheckIcon v-if="typing.status === 'CORRECT'" class="h-6 w-6 mx-auto"/>
					<XMarkIcon v-else-if="typing.status === 'INCORRECT'" class="h-6 w-6 mx-auto"/>
					<QuestionMarkCircleIcon v-else class="h-6 w-6 mx-auto"/>
				</td>
				<td class="p-1" v-if="props.type === 'results'">
					<div class="text-center">{{typing.correctTypings}}</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
import {ref} from 'vue'
import {ChevronRightIcon, ChevronDownIcon, QuestionMarkCircleIcon} from '@heroicons/vue/24/outline'
import {CheckIcon, XMarkIcon, } from '@heroicons/vue/24/solid'
import axios from "axios";
import authHeader from "@/service/auth-header";
import {onMounted} from "vue";
import {useStore} from "vuex";
import {requestService} from "@/service/request-service"

const props = defineProps({
	type: String
})

const store = useStore()
const typings = ref(null)

function toggleTypings(typing) {
	typing.isShown = !typing.isShown
}

function getTypingsForUser() {
	requestService.get('/typings')
	.then((response) => {
		console.log('Typings returned: ', response.data)
		typings.value = response.data
	})
}

function getFinishedMatches() {
	requestService.get('/results')
	.then((response) => {
		console.log('Results returned: ', response.data)
		typings.value = response.data
	})
}


onMounted(async () => {
	if(props.type === 'typings'){
		getTypingsForUser()
	} else if (props.type === 'results') {
		getFinishedMatches()
	}
})
</script>

<style scoped>

</style>