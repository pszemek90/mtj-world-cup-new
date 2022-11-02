<template>
  <div>
    <Navbar @open-login-modal="openLoginModal" @change-view="changeView"/>
  </div>
  <div id="content-main">
    <component v-if="loggedIn" :is="currentView"></component>
    <span class="login-message" v-else>Zaloguj się aby kontynuować</span>
    <LoginModal :open-modal="open" @close-login-modal="closeLoginModal"/>
  </div>
</template>

<script>
  import Matches from './components/Matches.vue';
  import LoginModal from './components/LoginModal.vue';
  import Navbar from './components/Navbar.vue';
  import MyTypings from './components/MyTypings.vue';
  import Results from './components/Results.vue';
  import Typers from './components/Typers.vue';
  import Profile from './components/Profile.vue';

  export default {
    name: 'App',
    data() {
      return {
        open: false,
        currentView: 'Matches'
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    components: {
      Matches,
      LoginModal,
      Navbar,
      MyTypings,
      Results,
      Typers,
      Profile
    },
    methods: {
      openLoginModal() {
        this.open = true;
      },
      closeLoginModal() {
        this.open = false;
      },
      changeView(view) {
        this.currentView = view
      }
    }
  }
</script>

<style scoped>
.login-message {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
