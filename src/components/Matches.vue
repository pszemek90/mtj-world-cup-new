<template>
	<div class="text-2xl text-center" v-show="isToday">Dzisiejsza pula: {{ todayPool }}</div>
	<div class="mx-auto my-2 w-fit">
		<vue-tailwind-datepicker v-model="dateValue" as-single :formatter="formatter" class="text-center" />
	</div>
	<form>
		<div class="text-center text-xl">{{ initialMessage }}</div>
		<div v-for="match in matches" :key="match.id" class="my-1">
			<div class="flex justify-center">
				<p class="mx-1">g. {{ matchTime(match) }}</p>
				<p class="mx-1" v-show="match.disabled">pula: {{ match.pool }}</p>
			</div>
			<div class="grid grid-cols-12 items-center">
				<span class="flex justify-center">
					<input type="checkbox" class="form-checkbox" v-model="match.chosen" v-show="!match.disabled" />
				</span>
				<div :class="match.disabled ? 'grid-cols-7' : 'grid-cols-11'" class="mx-2 col-span-10 grid justify-center items-center">
					<span class="text-center col-span-3">{{ match.homeTeam }}</span>
					<input v-model="match.homeScore" v-show="!match.disabled" @input="match.chosen = true" type="number"
						class="form-input text-center mx-2 border border-dark rounded-md col-span-2" />
					<span class="text-center">-</span>
					<input v-model="match.awayScore" v-show="!match.disabled" @input="match.chosen = true" type="number"
						class="form-input text-center mx-2 border border-dark rounded-md col-span-2" />
					<span class="text-center col-span-3">{{ match.awayTeam }}</span>
				</div>
			</div>
		</div>
		<div v-show="wrongTypings" class="text-center text-red-600 my-2">{{ wrongTypings }}</div>
		<button @click.prevent="showSendTypingModal" class="rounded flex my-2 mx-auto p-2 bg-dark text-light dark:bg-light dark:text-dark transition ease-in-out
					duration-500 hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light">
			Wyślij
		</button>
	</form>
	<SendTypingsModal :show-modal="sendTypingsModalOpened" :typings="sentMatches" @sendTypes='sendTypes' />
</template>

<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import dayjs from 'dayjs'
import { computed, onMounted, ref, watch } from 'vue'
import SendTypingsModal from "@/components/SendTypingsModal.vue";
import { requestService } from "@/service/request-service"

const emit = defineEmits(['openSnackbar'])
const dateValue = ref(dayjs().format('YYYY-MM-DD'))
const formatter = {
	date: 'YYYY-MM-DD',
	month: 'MMM'
}
const matches = ref([])
const errorMessage = ref('')
const todayPool = ref('')
const wrongTypings = ref('')
const sentMatches = ref([])
const sendTypingsModalOpened = ref(false)
const initialMessage = ref('')

const chosenMatches = computed(() => {
	return matches.value.filter(match => match.chosen)
})

function sendTypes() {
	requestService.post('/matches/' + dateValue.value, sentMatches.value)
		.then((response) => {
			emit('openSnackbar', 'Pomyślnie wysłano typowania', true)
			sendTypingsModalOpened.value = false
		})
		.catch((error) => {
			console.log('error: ', error)
			emit('openSnackbar', 'Wystąpił błąd podczas wysyłania typowań', false)
			sendTypingsModalOpened.value = false
		})
}

function markPastMatches() {
	for (let i = 0; i < matches.value.length; i++) {
		let match = matches.value[i]
		let matchDateInMillis = parseDate(match)
		let now = Date.now()
		if (matchDateInMillis < now) {
			matches.value[i].disabled = true
		} else {
			matches.value[i].disabled = false
		}
	}
}

function parseDate(match) {
	let matchDate = new Date(match.date);
	matchDate.setHours(match.startTime[0])
	matchDate.setMinutes(match.startTime[1])
	return matchDate.getTime()
}

function getMatches() {
	requestService.get('/matches/' + dateValue.value)
		.then((response) => {
			console.log('response from api: ', response.data)
			matches.value = response.data.matches
			if (matches.value.length > 0) {
				initialMessage.value = 'Mecze'
			} else {
				initialMessage.value = 'Dzisiaj nie ma meczu :('
			}
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

function getTodayPool() {
	requestService.get('/today-pool')
		.then((response) => {
			todayPool.value = response.data + ' zł'
		})
		.catch((error) => {
			todayPool.value = 'Nie udało się pobrać puli'
		})
}

function matchTime(match) {
	function padTo2Digits(num) {
		return String(num).padStart(2, '0')
	}
	return padTo2Digits(match.startTime[0]) + ':' + padTo2Digits(match.startTime[1]);
}

function showSendTypingModal() {
	wrongTypings.value = ''
	if (chosenMatches.value.length === 0) {
		wrongTypings.value = 'Musisz wysłać przynajmniej jeden mecz.'
	} else if (chosenMatches.value.filter(match => match.homeScore === '').length > 0
		|| chosenMatches.value.filter(match => match.awayScore === '').length > 0) {
		wrongTypings.value = 'Nie możesz wysłać pustego wyniku'
	} else {
		sentMatches.value = chosenMatches.value.filter(match => parseDate(match) > Date.now())
		sendTypingsModalOpened.value = true
	}
}

watch(dateValue, () => {
	matches.value = []
	initialMessage.value = ''
	if (isToday) {
		getTodayPool()
	}
	getMatches()
})

onMounted(() => {
	if (isToday) {
		getTodayPool()
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
