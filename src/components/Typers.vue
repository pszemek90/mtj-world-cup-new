<template>
    <div class="table-container">
        <ui-table class="table" :data="typers" :thead="head" :tbody="body">
	        <template #country="{data}">
		        <img class="flag" :src="getCountry(data.country)" v-tooltip="`${data.country}`" :aria-describedby="data.country"/>
	        </template>
        </ui-table>
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
            }, {
				value: 'Saldo',
	            align: 'center'
            }, {
				value: 'Kraj',
	            align: 'center'
            }],
            body: [{
                field: 'username',
                align: 'center'
            }, {
                field: 'correctTypings',
                align: 'center'
            }, {
				field: 'balance',
	            align: 'center'
            },{
				slot: 'country',
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
        },
	    getCountry(countryString) {
		    if(countryString){
			    return new URL(`../assets/icons/${countryString}.svg.webp`, import.meta.url).href
		    }
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
.flag {
	width: 60px;
	height: 40px;
	border: 1px solid black;
	display: flex;
	margin: auto;
}
</style>