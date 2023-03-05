<template>
    <div class="text-2xl text-center" v-show="isToday">Dzisiejsza pula: {{overallPool}}</div>
	<div class="mx-auto my-2 w-fit">
		<vue-tailwind-datepicker v-model="dateValue" as-single :formatter="formatter"
			class="text-center"/>
	</div>
	<form>
		<div v-if="matches.length > 0" class="text-center text-xl">Mecze</div>
		<div v-for="match in matches" :key="match.id"
			class="flex justify-center items-center my-1">
			<input type="checkbox" class="form-checkbox" v-model="match.chosen" :disabled="match.disabled"/>
			<span class="text-center w-24">{{ match.homeTeam }}</span>
			<input v-model="match.homeScore" v-show="!match.disabled" @input="match.chosen = true"
			       type="number" class="form-input text-center mx-2 border border-dark rounded-md w-16"/>
			-
			<input v-model="match.awayScore" v-show="!match.disabled" @input="match.chosen = true"
			       type="number" class="form-input text-center mx-2 border border-dark rounded-md w-16"/>
			<span class="text-center w-24">{{ match.awayTeam }}</span>
			<div>
				<p>g. {{matchTime(match)}}</p>
				<p v-show="match.disabled">pula: {{match.pool}}</p>
			</div>
		</div>
		<div v-show="wrongTypings" class="text-center text-red-600 my-2">{{ wrongTypings }}</div>
		<button @click.prevent="showSendTypingModal"
			class="rounded flex mx-auto p-2 bg-dark text-light dark:bg-light dark:text-dark transition ease-in-out
					duration-500 hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light">
			Wyślij
		</button>
	</form>
	<SendTypingsModal :show-modal="sendTypingsModalOpened" :typings="sentMatches"/>
</template>

<script setup>
import axios from "axios"
import authHeader from "@/service/auth-header";
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import dayjs from 'dayjs'
import {computed, ref, watch} from 'vue'
import {useStore} from "vuex";
import SendTypingsModal from "@/components/SendTypingsModal.vue";

const dateValue = ref(dayjs().format('YYYY-MM-DD'))
const formatter = {
	date: 'YYYY-MM-DD',
	month: 'MMM'
}
const matches = ref([])
const errorMessage = ref('')
const overallPool = ref('')
const wrongTypings = ref('')
const sentMatches = ref([])
const sendTypingsModalOpened = ref(false)
const store = useStore()

const chosenMatches = computed(() => {
	return matches.value.filter(match => match.chosen)
})

function markPastMatches() {
	for (let i = 0; i < matches.value.length; i++) {
		let matchDate = new Date(matches.value[i].date).getTime()
		let now = Date.now()
		if (matchDate < now) {
			matches.value[i].disabled = true
		} else {
			matches.value[i].disabled = false
		}
	}
}

function getMatches() {
	axios.get(store.state.origin + ':8080/matches/today', {
		params: {
			date: dateValue.value
		},
		headers: authHeader()
	})
		.then((response) => {
			matches.value = response.data
			matches.value.forEach(match => match.homeScore = '')
			matches.value.forEach(match => match.awayScore = '')
			markPastMatches()
			errorMessage.value = ''
		})
		.catch((error) => {
			errorMessage.value = error.message
		})
}

const isToday = computed(() => {
	let rawCalendarDate = new Date(dateValue.value)
	let calendarDate = rawCalendarDate.getFullYear() + '-' + rawCalendarDate.getMonth() + '-' + rawCalendarDate.getDate()
	let rawToday = new Date()
	let today = rawToday.getFullYear() + '-' + rawToday.getMonth() + '-' + rawToday.getDate()
	return calendarDate === today
})

function getOverallPool() {
	axios.get(store.state.origin + ':8080/overallPool', {
		headers: authHeader()
	}).then((response) => {
		overallPool.value = response.data.overallPool + ' zł'
	}).catch((error) => {
		overallPool.value = 'Nie udało się pobrać puli'
	})
}

function matchTime(match) {
  function padTo2Digits(num) {
    return String(num).padStart(2, '0')
  }
  let date = new Date(match.date)
 return padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes());
}

function showSendTypingModal() {
	wrongTypings.value = ''
	if (chosenMatches.value.length === 0) {
		wrongTypings.value = 'Musisz wysłać przynajmniej jeden mecz.'
	} else if (chosenMatches.value.filter(match => match.homeScore === '').length > 0
		|| chosenMatches.value.filter(match => match.awayScore === '').length > 0) {
		wrongTypings.value = 'Nie możesz wysłać pustego wyniku'
	} else {
		sentMatches.value = chosenMatches.value.filter(match => Date.parse(match.date) > Date.now())
		sendTypingsModalOpened.value = true
	}
}

watch(dateValue, () => {
	if (isToday) {
		getOverallPool()
	}
	getMatches()
})
</script>

<style scoped>
/*Remove arrows and spinners from input fields*/
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
/* Firefox */
input[type=number] {
	-moz-appearance: textfield;
}
</style>
