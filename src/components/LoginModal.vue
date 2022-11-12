<template>

    <ui-dialog v-model="open" @close="closeModal">
        <ui-dialog-title closable>Zaloguj się</ui-dialog-title>
        <ui-dialog-content>
            <ui-form type="|" item-margin-bottom="16" action-align="center">
                <template #default>
                    <ui-form-field required>
                        <label>Login:</label>
                        <ui-textfield v-model="user.username"></ui-textfield>
                    </ui-form-field>
                    <ui-form-field required>
                        <label>Hasło:</label>
                        <ui-textfield inputType="password" v-model="user.password"></ui-textfield>
                    </ui-form-field>
                </template>
            </ui-form>
            <div v-if="message">{{message}}</div>
        </ui-dialog-content>
        <ui-dialog-actions>
            <ui-button raised @click.prevent="handleLogin(user)">Zaloguj</ui-button>
        </ui-dialog-actions>
    </ui-dialog>

</template>

<script>
import BalmUI from 'balm-ui'

export default {    
    name: 'Login',
    props: {
        openModal: Boolean
    },
    data() {
        return {
            open: false,
            message: "",
            user: {
                username: "",
                password: ""
            }
        }
    },
    watch: {
        openModal() {
            this.open = this.openModal
        }
    },
    methods: {
        handleLogin(user) {
            //todo add loading
            this.$store.dispatch("auth/login", user).then(
                () => {
                    this.$emit('closeLoginModal')
                },
                (error) => {
                    this.message = (error.response && 
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        },
	    closeModal() {
			this.$emit('closeLoginModal')
	    }
    }
}
</script>

<style scoped>

</style>