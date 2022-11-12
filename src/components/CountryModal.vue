<template>

    <ui-dialog v-model="open">
        <ui-dialog-title>Wylosowany kraj:</ui-dialog-title>
        <ui-dialog-content>
            {{usersCountry}}
        </ui-dialog-content>
        <ui-dialog-actions>
            <ui-button @click="closeModal">OK</ui-button>
        </ui-dialog-actions>
    </ui-dialog>

</template>

<script>
import BalmUI from 'balm-ui'

export default {    
    name: 'Country',
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