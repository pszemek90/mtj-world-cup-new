<template>
    <div class="balance">
        Stan konta: {{balance}} zł
    </div>
	<ui-button class="change-password" @click="open = true" raised>Zmień hasło</ui-button>
	<AccountHistory/>
	<ui-dialog v-model="open">
		<ui-dialog-title closable>Zmień hasło</ui-dialog-title>
		<ui-dialog-content>
			<ui-form type="|" item-margin-bottom="16" action-align="center">
				<template #default="{ subitemClass, actionClass }">
					<ui-form-field required>
						<label>Stare hasło:</label>
						<ui-textfield inputType="password" v-model="oldPassword"></ui-textfield>
					</ui-form-field>
					<ui-form-field required>
						<label>Nowe hasło:</label>
						<ui-textfield inputType="password" v-model="newPassword"></ui-textfield>
					</ui-form-field>
					<ui-form-field required>
						<label>Powtórz nowe hasło:</label>
						<ui-textfield inputType="password" v-model="retypePassword"></ui-textfield>
					</ui-form-field>
				</template>
			</ui-form>
			<div class="error-message" v-if="message">{{message}}</div>
		</ui-dialog-content>
		<ui-dialog-actions>
			<ui-button raised @click.prevent="changePassword">Zmień</ui-button>
		</ui-dialog-actions>
	</ui-dialog>
	<ui-snackbar v-model="showErrorSnack"
	             message="Wystąpił błąd" :action-type="actionType" position="top">
	</ui-snackbar>
</template>

<script>
import BalmUI from 'balm-ui'
import axios from 'axios'
import authHeader from './../service/auth-header'
import AccountHistory from "@/components/AccountHistory.vue";

export default {
    name: 'Profile',
	components: {
		AccountHistory
	},
    data() {
        return {
            balance: 0,
	        open: false,
	        oldPassword: '',
	        newPassword: '',
	        retypePassword: '',
	        message: '',
	        actionType: 1,
	        showErrorSnack: false
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
                axios.get(this.$store.state.origin + ':8080/users/balance', {
                    params: {
                        userId: this.$store.state.auth.user.id
                    },
                    headers: authHeader()
                }).then((response) => {
                    this.balance = response.data
                })
            }
        },
	    changePassword() {
			this.message = ''
			if(this.newPassword !== this.retypePassword) {
				this.message += 'Nowe i powtórzone hasło nie są identyczne.'
			}
			if(!this.message) {
				axios.post(this.$store.state.origin + ':8080/users/changePassword', {
					userId: this.$store.state.auth.user.id,
					newPassword: this.newPassword,
					oldPassword: this.oldPassword
				}, {
					headers: authHeader()
				}).then((response) => {
					if(response.status === 200) {
						this.$store.dispatch('auth/logout')
					} else {
						this.showErrorSnack = true
					}
				}).catch((error) => {
					if(error.response.status === 401) {
						this.message = 'Stare hasło jest niepoprawne.'
					} else {
						this.showErrorSnack = true
					}
				})
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
.error-message {
	color: red
}

.change-password {
	display: flex;
	margin: 0 auto;
}
</style>