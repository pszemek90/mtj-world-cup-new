<template>
    <ui-collapse class="collapse-first-level" v-for="(dateTypings, date) in this.typings" :key="date" with-icon ripple>
        <template #toggle>
            <div>{{ date }}</div>
        </template>
	    <ui-collapse class="collapse-second-level" v-for="(userTypings, match) in dateTypings" :key="match" with-icon ripple>
		    <template #toggle>
			    <div>{{ match }}</div>
		    </template>
		    <ui-table :data="userTypings" :thead="head" :tbody="body">
			    <template #correct="{data}">
				    <ui-icon class="correct" v-show="data.isCorrect">done</ui-icon>
			    </template>
		    </ui-table>
	    </ui-collapse>
    </ui-collapse>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header'
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'
import BalmUI from 'balm-ui'

export default {
    name: 'AllTypings',
    data() {
        return {
            typings: {},
			head: [{
				value: 'Użytkownik',
				align: 'center'
			}, {
				value: 'Wynik',
				colspan: 2,
				align: 'center'
			}],
			body: [{
				field:'username',
				align: 'center'
			}, {
				field: 'result',
				align: 'center'
			}, {
				slot: 'correct',
				align: 'center'
			}]
        }
    },
    methods: {
        getAllTypings() {
            axios.get(this.$store.state.origin + ':8080/typings/allTypings', {
                headers: authHeader()
            })
            .then((response) => {
				console.log(response.data)
                this.typings = response.data;
            })
        }
    },
    mounted() {
        this.getAllTypings()
    }
}

</script>

<style scoped>
.collapse-first-level {
	margin: 5px 0 0 20px;
	font-weight: bold;
	font-size: large;
	max-width: 500px;
}

.collapse-second-level {
	margin: 5px 0 0 20px;
	font-weight: normal;
	font-size: medium;
	max-width: 500px;
}

.correct {
	color: green;
}

</style>