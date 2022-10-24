<template>
  <div>
    <Navbar @open-login-modal="openLoginModal" @change-view="changeView"/>
  </div>
  <div id="content-main">
    <component :is="currentView"></component>
    <LoginModal :open-modal="open" @close-login-modal="closeLoginModal"/>
  </div>
</template>

<script>
  import Matches from './components/Matches.vue';
  import LoginModal from './components/LoginModal.vue';
  import Navbar from './components/Navbar.vue';
  import MyTypings from './components/MyTypings.vue';

  export default {
    name: 'App',
    data() {
      return {
        open: false,
        currentView: 'Matches'
      }
    },
    components: {
      Matches,
      LoginModal,
      Navbar,
      MyTypings
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

</style>
