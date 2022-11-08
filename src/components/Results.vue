<template>
    <ui-collapse class="collapse" v-for="(value, key) in this.results" :key="key" with-icon ripple>
        <template #toggle>
            <div>{{ key }}</div>
        </template>
		<ui-table :data="value" :thead="head" :tbody="body"></ui-table>
    </ui-collapse>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'
import BalmUI from 'balm-ui'

export default {
    name: 'Results',
    data() {
        return {
            results: {},
			head: [{
				value: 'Mecz',
				colspan: 3,
				align: 'center'
			}, {
				value: 'Trafione',
				align: 'center'
			}],
			body: [{
				field: 'homeTeam',
				align: 'right'
			}, {
				field: 'result',
				align: 'center'
			},{
				field: 'awayTeam',
				align: 'left'
			}, {
				field: 'correctTypings',
				align: 'center'
			}]
        }
    },
    methods: {
        getFinishedMatches() {
            axios.get(this.$store.state.origin + ':8080/results', {
                headers: authHeader()
            })
            .then((response) => {
                this.results = response.data;
            })
        }
    },
    mounted() {
        this.getFinishedMatches()
    }
}

</script>

<style scoped>
.collapse {
	margin: 5px 0 0 20px;
	font-weight: bold;
	font-size: large;
	max-width: 500px;
}
</style>