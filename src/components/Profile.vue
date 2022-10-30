<template>
    <div class="balance">
        Stan konta: {{balance}}zł
    </div>
</template>

<script>
import BalmUI from 'balm-ui'
import axios from 'axios'
import authHeader from './../service/auth-header'

export default {
    name: 'Profile',
    data() {
        return {
            balance: 0
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    methods: {
        getUserBalance() {
            if(this.loggedIn) {
                this.balance = this.$store.state.auth.user.balance
            }
        }
    },
    mounted() {
        this.getUserBalance()
    }
}
</script>

<style scoped>
.balance {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px auto;
    font-size: 1.5rem;
}
</style>