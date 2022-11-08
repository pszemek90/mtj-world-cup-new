<template>
    <ui-collapse class="collapse" v-for="(value, key) in this.typings" :key="key" with-icon>
	    <template #toggle>
	        <div>{{ key }}</div>
	    </template>
	    <ui-table :data="value" :thead="head" :tbody="body">
		    <template #status="{ data }">
			    <ui-icon v-if="data.status == 'UNKNOWN'">question_mark</ui-icon>
			    <ui-icon class="correct" v-else-if="data.status == 'CORRECT'">done</ui-icon>
			    <ui-icon class="incorrect" v-else>clear</ui-icon>
		    </template>
	    </ui-table>
<!--    <div v-for="v in value">{{ v.homeTeam }} {{v.homeScore}} - {{v.awayScore}} {{v.awayTeam}}
        <ui-icon v-if="v.status == 'UNKNOWN'">question_mark</ui-icon>
        <ui-icon class="correct" v-else-if="v.status == 'CORRECT'">done</ui-icon>
        <ui-icon class="incorrect" v-else>clear</ui-icon></div>-->
    </ui-collapse>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'
import BalmUI from 'balm-ui'

export default {
    name: 'MyTypings',
    data() {
        return {
            typings: {},
	        head: [{
				value: 'Mecz',
		        colspan: 3,
		        align: 'center'
	        }, {
				value: 'Status',
		        align: 'center'
	        }],
	        body: [{
				field: 'homeTeam',
		        align: 'right'
	        }, {
				field: 'result',
		        align: 'center'
	        }, {
				field: 'awayTeam',
		        align: 'left'
	        }, {
				slot: 'status',
		        align: 'center'
	        }]
        }
    },
    methods: {
        getTypingsForUser() {
            let userId = this.$store.state.auth.user.id
            axios.get(this.$store.state.origin + ':8080/typings', {
                params: {
                    userId: userId
                },
                headers: authHeader()
            }).then((response) => {
				console.log(response.data)
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
.collapse {
	margin: 5px 0 0 20px;
	font-weight: bold;
	font-size: large;
	max-width: 500px;
}
</style>