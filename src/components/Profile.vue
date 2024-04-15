<template>
	<div class="text-2xl text-center m-4">
		Stan konta: {{ balance }} zł
	</div>
	<button @click="isOpen = true" class="bg-dark text-light dark:bg-light dark:text-dark p-2 rounded-lg ml-4 transition ease-in-out
	                duration-500 hover:bg-light hover:text-dark dark:hover:bg-dark dark:hover:text-light">
		Zmień hasło
	</button>
	<AccountHistory />
	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" @close="isOpen = false" class="relative z-10">
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
				leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6
							text-left align-middle shadow-xl transition-all">
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								Zmień hasło
							</DialogTitle>
							<form class="mt-8 space-y-6" action="#" method="POST">
								<input type="hidden" name="remember" value="true" />
								<div class="-space-y-px rounded-md shadow-sm">
									<div>
										<label for="old-password" class="sr-only">Stare hasło</label>
										<input id="old-password" name="old-password" type="password" required=""
											v-model="oldPassword" class="relative block w-full appearance-none rounded-none rounded-t-md border
										       border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10
										       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
											placeholder="Stare hasło" />
									</div>
									<div>
										<label for="new-password" class="sr-only">Nowe hasło</label>
										<input id="new-password" name="new-password" type="password" required=""
											v-model="newPassword" class="relative block w-full appearance-none rounded-none
										       border border-gray-300 px-3 py-2 text-gray-900
										       placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none
										       focus:ring-indigo-500 sm:text-sm" placeholder="Nowe hasło" />
									</div>
									<div>
										<label for="retype-password" class="sr-only">Powtórz nowe hasło</label>
										<input id="retype-password" name="retype-password" type="password" required=""
											v-model="retypePassword" class="relative block w-full appearance-none rounded-none
										       rounded-b-md border border-gray-300 px-3 py-2 text-gray-900
										       placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none
										       focus:ring-indigo-500 sm:text-sm" placeholder="Powtórz nowe hasło" />
									</div>
								</div>

								<div class="text-red-600" v-if="message">{{ message }}</div>

								<div>
									<button type="submit" @click.prevent="changePassword" class="group relative flex w-full justify-center rounded-md border
									        border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white
									        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
									        focus:ring-offset-2">
										Zmień hasło
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import axios from 'axios'
import authHeader from './../service/auth-header'
import AccountHistory from "@/components/AccountHistory.vue";
import { requestService } from "@/service/request-service";
import { TransitionRoot, Dialog, DialogPanel, TransitionChild, DialogTitle } from "@headlessui/vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const balance = ref(0)
const open = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const retypePassword = ref('')
const message = ref('')
const isOpen = ref(false)
const store = useStore()

function getUserBalance() {
	requestService.get('/user-profile')
		.then((response) => {
			balance.value = response.data
		})
}
function changePassword() {
	message.value = ''
	if (newPassword.value !== retypePassword.value) {
		message.value += 'Nowe i powtórzone hasło nie są identyczne.'
	}
	if (!message.value) {
		axios.post(store.state.origin + ':8080/users/changePassword', {
			userId: store.state.auth.user.id,
			newPassword: newPassword.value,
			oldPassword: oldPassword.value
		}, {
			headers: authHeader()
		}).then((response) => {
			if (response.status === 200) {
				store.dispatch('auth/logout')
			}
		}).catch((error) => {
			if (error.response.status === 401) {
				message.value = 'Stare hasło jest niepoprawne.'
			}
		})
	}
}

onMounted(() => {
	getUserBalance()
})

</script>

<style scoped></style>