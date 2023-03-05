<template>
	<TransitionRoot appear :show="open" as="template">
		<Dialog as="div" @close="open = false" class="relative z-10">
			<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
			                 enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
					                 enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
					                 leave-to="opacity-0 scale-95">
						<DialogPanel class="w-full max-w-fit transform overflow-hidden rounded-2xl bg-white p-6
							text-left align-middle shadow-xl transition-all">
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-center">
								Twoje typowania:
							</DialogTitle>
							<div v-for="typing in typings" :key="typing.id"
								class="text-center m-2">
								{{ typing.homeTeam }} {{typing.homeScore}} - {{typing.awayScore}} {{typing.awayTeam}}
							</div>

							<div class="flex justify-center">
								<button type="submit" @click="closeModal"
								        class="group relative flex w-1/2 justify-center rounded-md border
									        border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white
									        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
									        focus:ring-offset-2">
									Wyślij
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import {TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import {ref, watch, watchEffect} from "vue";

const props = defineProps(['typings', 'showModal'])
const typings = ref([])
const open = ref(false)

function closeModal() {
	open.value = false
}

watch(() => props.showModal,() => {
	console.log('show modal', props.showModal)
	open.value = props.showModal
	typings.value = props.typings
})

</script>

<style scoped>

</style>