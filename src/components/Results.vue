<template>
    <ui-collapse v-for="(value, key) in this.results" :key="key" with-icon>
        <template #toggle>
            <div>{{ key }}</div>
        </template>
        <div v-for="v in value">{{ v.homeTeam }} {{v.homeScore}} - {{v.awayScore}} {{v.awayTeam}}</div>
    </ui-collapse>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

export default {
    name: 'Results',
    data() {
        return {
            results: {}
        }
    },
    methods: {
        getFinishedMatches() {
            axios.get('http://localhost:8080/results', {
                headers: authHeader()
            })
            .then((response) => {
                this.results = response.data;
                console.log(this.results)
            })
        }
    },
    mounted() {
        this.getFinishedMatches()
    }
}

</script>

<style scoped>

</style>