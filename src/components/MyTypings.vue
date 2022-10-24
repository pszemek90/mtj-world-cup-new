<template>
    <ui-collapse v-for="(value, key) in this.typings" :key="key" with-icon>
    <template #toggle>
        <div>{{ key }}</div>
    </template>
    <div v-for="v in value">{{ v.homeTeam }} {{v.homeScore}} - {{v.awayScore}} {{v.awayTeam}}</div>
    </ui-collapse>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

export default {
    name: 'MyTypings',
    data() {
        return {
            typings: {}
        }
    },
    methods: {
        getTypingsForUser() {
            let userId = this.$store.state.auth.user.id
            axios.get('http://localhost:8080/typings', {
                params: {
                    userId: userId
                },
                headers: authHeader()
            }).then((response) => {
                console.log(response)
                this.typings = response.data
            })
        }
    },
    mounted() {
        this.getTypingsForUser()
    }
}


</script>

<style scoped>

</style>