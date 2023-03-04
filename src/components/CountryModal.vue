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
								Wylosowany kraj
							</DialogTitle>
							<div class="text-center m-2">
								{{ usersCountry }}
							</div>

								<div class="flex justify-center">
									<button type="submit" @click="closeModal"
									        class="group relative flex w-1/2 justify-center rounded-md border
									        border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white
									        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
									        focus:ring-offset-2">
										OK
									</button>
								</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>

<!--    <ui-dialog v-model="open">-->
<!--        <ui-dialog-title>Wylosowany kraj:</ui-dialog-title>-->
<!--        <ui-dialog-content>-->
<!--            {{usersCountry}}-->
<!--        </ui-dialog-content>-->
<!--        <ui-dialog-actions>-->
<!--            <ui-button @click="closeModal">OK</ui-button>-->
<!--        </ui-dialog-actions>-->
<!--    </ui-dialog>-->

</template>

<script>

import {TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";

export default {    
    name: 'Country',
	components:{
		TransitionChild,
		TransitionRoot,
		Dialog,
		DialogTitle,
		DialogPanel
	},
    props: {
        openModal: Boolean
    },
    data() {
        return {
            open: false,
            usersCountry: ''
        }
    },
    methods: {
        closeModal() {
            this.open = false
            this.$emit('closeCountryModal')
        }
    },
    watch: {
        openModal() {
            this.usersCountry = this.$store.state.auth.user.country
            this.open = this.openModal
        }
    }
}
</script>

<style scoped>

</style>