<template>
	<TransitionRoot as="template" :show="open">
		<Dialog as="div" class="relative z-10" @close="$emit('close'); open = false">
			<TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
			                 leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-hidden">
				<div class="absolute inset-0 overflow-hidden">
					<div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
						<TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
						                 enter-from="-translate-x-full" enter-to="translate-x-0"
						                 leave="transform transition ease-in-out duration-500 sm:duration-700"
						                 leave-from="translate-x-0" leave-to="-translate-x-full">
							<DialogPanel class="pointer-events-auto relative w-screen max-w-xs">
								<div class="flex h-full flex-col bg-white dark:bg-gray-800 py-6 shadow-xl">
									<div class="px-4 sm:px-6">
										<DialogTitle class="text-lg border-b-2 font-medium">MTJ KATAR</DialogTitle>
									</div>
									<div class="relative mt-6 flex-1 px-4 sm:px-6">
										<ul>
											<li @click="changeView(Matches)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Obstawianie</a>
											</li>
											<li @click="changeView(MyTypings)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Moje typowania</a>
											</li>
											<li @click="changeView(Results)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Wyniki meczów</a>
											</li>
											<li @click="changeView(Typers)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Tabela typerów</a>
											</li>
											<li @click="changeView(AllTypings)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Wszystkie typy</a>
											</li>
											<li @click="changeView(Profile)"
												class="flex border-b-2 cursor-pointer ripple-bg-white dark:ripple-bg-dark">
												<a class="mx-auto py-2 text-lg">Profil</a>
											</li>
										</ul>
										<div class="mt-2">
											Twój kraj: {{ userCountry }}
										</div>
									</div>
									<div class="ml-4 flex">
										<span class="flex items-center">
											Powiadomienia: 
										</span>
										<Switch
											@click="toggleNotifications"
											class="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full
												border-2 border-transparent transition-colors duration-200 ease-in-out
												focus:outline-none focus-visible:ring-2 focus-visible:ring-white
												focus-visible:ring-opacity-75 bg-dark dark:bg-light">
											<span aria-hidden="true"
												:class="notifications ? 'translate-x-7' : 'translate-x-0'"
												class="pointer-events-none inline-block h-6 w-6 transform rounded-full
												bg-white shadow-lg ring-0 transition duration-500 ease-in-out
												dark:bg-dark">
											</span>
										</Switch>
									</div>
									<div class="ml-4">
										<Switch
											@click="toggleDarkMode"
											class="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full
												border-2 border-transparent transition-colors duration-200 ease-in-out
												focus:outline-none focus-visible:ring-2 focus-visible:ring-white
												focus-visible:ring-opacity-75 bg-dark dark:bg-light">
											<span aria-hidden="true"
												class="pointer-events-none inline-block h-6 w-6 transform rounded-full
												bg-white shadow-lg ring-0 transition duration-500 ease-in-out
												dark:translate-x-7 translate-x-0">
												<MoonIcon v-if="darkMode" class="w-5 h-5 m-auto text-dark"/>
												<SunIcon v-else/>
											</span>
										</Switch>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import {computed, ref, watchEffect} from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch } from '@headlessui/vue'
import {SunIcon, MoonIcon} from '@heroicons/vue/24/solid'
import Profile from "./Profile.vue";
import Matches from "./Matches.vue";
import MyTypings from "./MyTypings.vue";
import Results from "./Results.vue";
import Typers from "./Typers.vue";
import AllTypings from "./AllTypings.vue";
import {useStore} from "vuex";
import { fcmTokenService } from '../service/fcm-token-service';
import { requestService } from '../service/request-service';

const props = defineProps({
	openSidebar: Boolean
})
const emit = defineEmits(['changeView'])
const open = ref(false)
const store = useStore()
const darkMode = ref(localStorage.getItem('darkMode') === 'true')
const notifications = ref(localStorage.getItem('notifications') === 'true')
watchEffect(() => open.value = props.openSidebar)
function changeView(page) {
	open.value = false;
	emit('changeView', page)
}
const loggedIn = computed(() => {
	return store.state.auth.status.loggedIn;
})
const userCountry = computed( () => {
	return loggedIn.value ? store.state.auth.user.country : ''
})
async function toggleNotifications() {
	notifications.value = !notifications.value
	if(notifications.value) {
		fcmTokenService.getMessagingToken()
	} else {
		requestService.get('/delete-token')
	}
}
function toggleDarkMode() {
	darkMode.value = !darkMode.value
	if(darkMode.value) {
		document.documentElement.classList.add('dark')
		localStorage.setItem('darkMode', 'true')
	} else {
		document.documentElement.classList.remove('dark')
		localStorage.removeItem('darkMode')
	}
}
</script>

<style scoped>

</style>