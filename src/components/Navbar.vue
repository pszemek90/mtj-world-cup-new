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
            <ui-drawer-title>Header here</ui-drawer-title>
            </ui-drawer-header>
            <ui-drawer-content>
            <ui-list>
                <ui-item active>
                <ui-item-first-content>
                    <ui-icon>arrow_back</ui-icon>
                </ui-item-first-content>
                <ui-item-text-content>Back</ui-item-text-content>
                </ui-item>
                <ui-list-divider></ui-list-divider>
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
            title: 'Hello BalmUI',
            openDrawer: false
        };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    methods: {
        openLoginModal() {
            this.$emit('openLoginModal')
        },
        logout() {
            this.$store.dispatch('auth/logout')
        }
    }
};

</script>

<style scoped>

</style>