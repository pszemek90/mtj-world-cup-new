<template>
	<div class="mx-auto border border-dark dark:border-light rounded-lg w-fit">
		<table class="m-1 border-collapse">
			<tr class="border-b border-dark dark:border-light">
				<th class="p-1">Użytkownik</th>
				<th class="p-1">Trafione</th>
				<th class="p-1">Saldo</th>
				<th class="p-1">Kraj</th>
			</tr>
			<tr v-for="typer in typers" class="border-b border-dark dark:border-light last:border-b-0">
				<td class="p-1 text-center items-center">{{typer.username}}</td>
				<td class="p-1 text-center items-center">{{typer.correctTypings}}</td>
				<td class="p-1 text-center items-center">{{typer.balance}}</td>
				<td class="p-1 text-center items-center">
					<img :src="getCountry(typer.country)" class="h-8 w-12 border border-black dark:border-light"/>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import axios from 'axios'
import authHeader from './../service/auth-header'

export default {
    name: 'Typers',
    data() {
        return {
	        typers: []
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
    max-width: 500px;
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