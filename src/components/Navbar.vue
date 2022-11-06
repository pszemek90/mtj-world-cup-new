<template>
    <div class="page-top-app-bar">
        <ui-top-app-bar
            content-selector="#content-main"
            :type="type"
            :title="title"
            @nav="openDrawer = true"
        >
            <template #toolbar="{ toolbarItemClass }">
            <ui-icon-button
                :class="toolbarItemClass"
                icon="login"
                @click="openLoginModal"
                v-if="!loggedIn"
            ></ui-icon-button>
            <ui-icon-button
                :class="toolbarItemClass"
                icon="logout"
                @click="logout"
                v-else
            ></ui-icon-button>
            </template>
        </ui-top-app-bar>

        <ui-drawer v-model="openDrawer" type="modal">
            <ui-drawer-header>
                <ui-drawer-title>FIFA Katar 2022</ui-drawer-title>
            </ui-drawer-header>
            <ui-drawer-content>
            <ui-list>
                <ui-item @click="changePage('Matches')">
                    <ui-item-text-content>Obstawianie</ui-item-text-content>
                </ui-item>
                <ui-item @click="changePage('MyTypings')">
                    <ui-item-text-content>Moje typowania</ui-item-text-content>
                </ui-item>
                <ui-item @click="changePage('Results')">
                    <ui-item-text-content>Wyniki meczów</ui-item-text-content>
                </ui-item>
                <ui-item @click="changePage('Typers')">
                    <ui-item-text-content>Tabela typerów</ui-item-text-content>
                </ui-item>
                <ui-item @click="changePage('Profile')">
                    <ui-item-text-content>Profil</ui-item-text-content>
                </ui-item>
                <ui-list-divider></ui-list-divider>
                <ui-item>
                    <ui-item-text-content>Twój kraj: {{usersCountry}}</ui-item-text-content>
                </ui-item>
            </ui-list>
            </ui-drawer-content>
        </ui-drawer>
    </div>

</template>

<script>
import BalmUI from 'balm-ui'

export default {
    name: 'Navbar',
    data() {
        return {
            type: 'standard',
            openDrawer: false
        };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      title() {
        let currentUser = this.loggedIn 
            ? this.$store.state.auth.user.username 
            : 'nieznajomy'
        return 'Witaj ' + currentUser;
      },
      usersCountry() {
        return this.loggedIn ? this.$store.state.auth.user.country : ''
      }
    },
    methods: {
        openLoginModal() {
            this.$emit('openLoginModal')
        },
        logout() {
            this.$store.dispatch('auth/logout')
        },
        changePage(page) {
            this.$emit('changeView', page)
            this.openDrawer = false
        }
    }
};

</script>

<style scoped>

</style>