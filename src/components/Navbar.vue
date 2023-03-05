<template>
	<nav class="bg-blue-700 mb-2">
		<div class="mx-auto px-2 sm:px-6 lg:px-8">
			<div class="relative flex h-16 items-center">
				<div class="absolute inset-y-0 left-0 flex items-center">
					<button class="inline-flex items-center justify-center rounded-md p-2 text-white
						hover:ring-2 hover:ring-white" @click="open = true">
						<span class="sr-only">Open main menu</span>
						<Bars3Icon class="block h-6 w-6" aria-hidden="true" />
					</button>
					<span class="text-white font-sans text-xl pl-2 ml-2">{{title}}</span>
					<img v-if="userCountry" :src="country" class="ml-4 h-3/4 border border-black"/>
				</div>
				<div class="absolute right-0">
					<button class="text-white">
						<ArrowRightOnRectangleIcon v-if="loggedIn" @click="logout"  class="h-6 w-6"/>
						<ArrowLeftOnRectangleIcon v-else @click="openLoginModal" class="h-6 w-6"/>
					</button>
				</div>
			</div>
		</div>
		<Sidebar :open-sidebar="open" @close="open = false" @change-view="changeView" class="text-dark dark:text-light"/>
	</nav>
</template>

<script setup>
import {computed, ref} from 'vue';
import { Bars3Icon, ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import Sidebar from './Sidebar.vue'
import {useStore} from "vuex";

const open = ref(false);
const store = useStore()
const emit = defineEmits(['changeView', 'openLoginModal'])
const loggedIn = computed(() => {
	return store.state.auth.status.loggedIn;
})
const title = computed(() => {
	let currentUser = loggedIn.value
		? store.state.auth.user.username
		: 'nieznajomy'
	return 'Witaj ' + currentUser;
})
const userCountry = computed( () => {
	return loggedIn.value ? store.state.auth.user.country : ''
})
const country = computed( () => {
	return new URL(`../assets/icons/${userCountry.value}.svg.webp`, import.meta.url).href
})
function changeView(page) {
	open.value = false
	emit('changeView', page)
}

function openLoginModal() {
	emit('openLoginModal')
}

function logout() {
	store.dispatch('auth/logout')
}
</script>

<!--<script>-->

<!--export default {-->
<!--    name: 'Navbar',-->
<!--    data() {-->
<!--        return {-->
<!--            type: 'standard',-->
<!--            openDrawer: false-->
<!--        };-->
<!--    },-->
<!--    computed: {-->
<!--      loggedIn() {-->
<!--        return this.$store.state.auth.status.loggedIn;-->
<!--      },-->
<!--      title() {-->
<!--        let currentUser = this.loggedIn -->
<!--            ? this.$store.state.auth.user.username -->
<!--            : 'nieznajomy'-->
<!--        return 'Witaj ' + currentUser;-->
<!--      },-->
<!--      usersCountry() {-->
<!--        return this.loggedIn ? this.$store.state.auth.user.country : ''-->
<!--      },-->
<!--		country() {-->
<!--	        return new URL(`../assets/icons/${this.usersCountry}.svg.webp`, import.meta.url).href-->
<!--		}-->
<!--    },-->
<!--    methods: {-->
<!--        openLoginModal() {-->
<!--            this.$emit('openLoginModal')-->
<!--        },-->
<!--        logout() {-->
<!--            this.$store.dispatch('auth/logout')-->
<!--        },-->
<!--        changePage(page) {-->
<!--            this.$emit('changeView', page)-->
<!--            this.openDrawer = false-->
<!--        }-->
<!--    }-->
<!--};-->

<!--</script>-->

<style scoped>
.title-container {
	display: flex;
	align-items: center;
}
.flag {
	width: 60px;
	height: 40px;
	margin: 10px 10px 10px 30px;
}
</style>