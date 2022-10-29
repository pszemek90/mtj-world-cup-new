<template>
    <ui-collapse v-for="(value, key) in this.typings" :key="key" with-icon>
    <template #toggle>
        <div>{{ key }}</div>
    </template>
    <div v-for="v in value">{{ v.homeTeam }} {{v.homeScore}} - {{v.awayScore}} {{v.awayTeam}} 
        <ui-icon v-if="v.status == 'UNKNOWN'">question_mark</ui-icon>
        <ui-icon class="correct" v-else-if="v.status == 'CORRECT'">done</ui-icon>
        <ui-icon class="incorrect" v-else>clear</ui-icon></div>
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
.correct {
    color: green;
}
.incorrect {
    color: red;
}
</style>