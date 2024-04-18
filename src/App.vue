<template>
  <div>
    <Snackbar :open-snackbar="openSnackbar">
      {{ snackbarMessage }}
    </Snackbar>
    <Navbar @open-login-modal="openLoginModal" @change-view="changeView" />
  </div>
  <div id="content-main" class="text-dark dark:text-light">
    <component v-if="loggedIn" :is="currentView"></component>
    <span class="login-message" v-else>Zaloguj się aby kontynuować</span>
    <LoginModal :open-modal="open" @close-login-modal="closeLoginModal" @open-snackbar="openSnackbarWithMessage"/>
    <CountryModal :open-modal="openCountryModal" @close-country-modal="closeCountryModal" />
  </div>
</template>

<script setup>
import LoginModal from './components/LoginModal.vue';
import Navbar from './components/Navbar.vue';
import CountryModal from './components/CountryModal.vue';
import { useUserStore } from "@/store/userStore";
import Snackbar from './components/Snackbar.vue';
import Matches from './components/Matches.vue';
import { ref, computed, shallowRef } from 'vue';

const open = ref(false);
const currentView = shallowRef(Matches);
const openCountryModal = ref(false);
const openSnackbar = ref(false);
const snackbarMessage = ref('');

const store = useUserStore();

const loggedIn = computed(() => {
  return store.user.isLoggedIn;
})

function openSnackbarWithMessage(message) {
  snackbarMessage.value = message;
  openSnackbar.value = true;
}

function openLoginModal() {
  open.value = true;
}

function closeLoginModal() {
  open.value = false;
  if (store.user.isFirstLogin) {
    openCountryModal.value = true;
  }
}
function closeCountryModal() {
  openCountryModal.value = false;
}
function changeView(view) {
  currentView.value = view;
}
</script>

<style scoped>
.login-message {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
