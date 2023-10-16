<template>
	<TransitionRoot appear :show="open" as="template">
		<Dialog as="div" @close="closeModal" class="relative z-10">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								Zaloguj się
							</DialogTitle>
							<form class="mt-8 space-y-6" action="#" method="POST">
								<input type="hidden" name="remember" value="true" />
								<div class="-space-y-px rounded-md shadow-sm">
									<div>
										<label for="email-address" class="sr-only">Email address</label>
										<input id="email-address" name="email" type="email" autocomplete="email" required=""
										       v-model="user.email"
										       class="relative block w-full appearance-none rounded-none rounded-t-md border
										       border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10
										       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										       placeholder="Email address" />
									</div>
									<div v-show="!isNewPasswordChallenge">
										<label for="password" class="sr-only">Password</label>
										<input id="password" name="password" type="password" autocomplete="current-password"
										       required="" v-model="user.password"
										       class="relative block w-full appearance-none rounded-none
										       rounded-b-md border border-gray-300 px-3 py-2 text-gray-900
										       placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none
										       focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
									</div>
									<div v-show="isNewPasswordChallenge">
										<label for="new-password" class="sr-only">New password</label>
										<input id="new-password" name="new-password" type="password" required=""
										       v-model="newPassword"
										       class="relative block w-full appearance-none rounded-none border
										       border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10
										       focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
										       placeholder="New password" />
									</div>
									<div v-show="isNewPasswordChallenge">
										<label for="retype-password" class="sr-only">Retype password</label>
										<input id="retype-password" name="retype-password" type="password" required=""
										       v-model="retypePassword"
										       class="relative block w-full appearance-none rounded-none
										       rounded-b-md border border-gray-300 px-3 py-2 text-gray-900
										       placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none
										       focus:ring-indigo-500 sm:text-sm" placeholder="Retype password" />
									</div>
								</div>

								<div class="flex items-center justify-between" v-show="!isNewPasswordChallenge">
									<div class="flex items-center">
										<input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
										<label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
									</div>

									<div class="text-sm">
										<a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
									</div>
								</div>

								<div>
									<button type="submit" @click.prevent="handleLogin(user)"
									        class="group relative flex w-full justify-center rounded-md border
									        border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white
									        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
									        focus:ring-offset-2">
										Zaloguj się
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
import {Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild} from '@headlessui/vue';
import {ref, watchEffect} from "vue";
import {useStore} from "vuex";
import { authService } from '@/service/auth-service'
import {useUserStore} from "@/store/userStore";

const props = defineProps({
	openModal: Boolean
})
const emit = defineEmits(['closeLoginModal'])
const open = ref(false)
const isNewPasswordChallenge = ref(false)
const newPassword = ref('')
const retypePassword = ref('')
const message = ref('')
const store = useStore()
const userStore = useUserStore()
const user = ref({
	email: "",
	password: ""
})
const authResponse = ref(null)
function handleLogin(user) {
    if (isNewPasswordChallenge.value) {
        authService.respondToNewPasswordChallenge(authResponse.value, user.email, newPassword.value)
            .then((response) => {
                const currentUser = {
                    email: user.email,
                    isLoggedIn: true,
                    idToken: response.AuthenticationResult.IdToken
                }
                userStore.login(currentUser)
                localStorage.setItem('user', JSON.stringify(currentUser))
				emit('closeLoginModal')
            })
    } else {
        authService.login(user).then((response) => {
            console.log('handle login response: ', response)
            if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                isNewPasswordChallenge.value = true
                authResponse.value = response
            } else {
                const currentUser = {
                    email: user.email,
                    isLoggedIn: true,
                    idToken: response.AuthenticationResult.IdToken
                }
                userStore.login(currentUser)
                localStorage.setItem('user', JSON.stringify(currentUser))
                emit('closeLoginModal')
            }
        })
    }
}
function closeModal() {
	emit('closeLoginModal')
}
watchEffect(() => open.value = props.openModal)
</script>

<style scoped>

</style>