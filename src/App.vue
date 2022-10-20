<template>
  <div>
    <Navbar @open-login-modal="openLoginModal"/>
  </div>
  <div id="content-main">
    <Matches />
    <LoginModal :open-modal="open" @close-login-modal="closeLoginModal"/>
  </div>
</template>

<script>
  import Matches from './components/Matches.vue';
  import LoginModal from './components/LoginModal.vue';
  import Navbar from './components/Navbar.vue';

  export default {
    name: 'App',
    data() {
      return {
        open: false
      }
    },
    components: {
      Matches,
      LoginModal,
      Navbar
    },
    methods: {
      openLoginModal() {
        this.open = true;
      },
      closeLoginModal() {
        this.open = false;
      }
    }
  }
</script>

<style scoped>

</style>
