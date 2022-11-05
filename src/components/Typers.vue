<template>
    <div class="table-container">
        <ui-table class="table" :data="typers" :thead="head" :tbody="body"></ui-table>
    </div>
</template>

<script>
import BalmUI from 'balm-ui'
import axios from 'axios'
import authHeader from './../service/auth-header'

export default {
    name: 'Typers',
    data() {
        return {
            typers: [],
            head: [{
                value: 'Użytkownik',
                align: 'center'
            }, {
                value: 'Trafione',
                align: 'center'
            }],
            body: [{
                field: 'username',
                align: 'center'
            }, {
                field: 'correctTypings',
                align: 'center'
            }]
        }
    },
    methods: {
        getTypers() {
            axios.get(this.$store.state.origin + ':8080/typings/typerScores', {
                headers: authHeader()
            })
            .then((response) => {
                this.typers = response.data
            })
        }
    },
    mounted() {
        this.getTypers()
    }
}

</script>

<style scoped>
.table-container {
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 20px auto;
    max-width: 400px;
}
.table {
    width: 100%;
}
</style>