<template>
  <div>
    <div class="datepicker">
      <ui-datepicker
        v-model="date"
        :config="config"
        placeholder="Select Date..."
        outlined
        toggle>
      </ui-datepicker>
    </div>
    <ui-form type="|" action-align="center">
      <template #default="{subitemClass, actionClass}">
        <div class="match" v-for="match in matches">
          <ui-checkbox v-model="match.chosen" :disabled="match.disabled"></ui-checkbox>
          <span class="team">{{match.homeTeam}}</span>
          <ui-form-field>
            <ui-textfield class="score" @input="match.chosen = true" endAligned v-model="match.homeScore" outlined :disabled="match.disabled"></ui-textfield>
          </ui-form-field>
          -
          <ui-form-field>
            <ui-textfield class="score" @input="match.chosen = true" v-model="match.awayScore" outlined :disabled="match.disabled"></ui-textfield>
          </ui-form-field> 
          <span class="team">{{match.awayTeam}}</span>
          <span>g. {{matchTime(match)}}</span>
        </div>
        <span class="errorMessage" v-show="errorMessage">Wystąpił błąd połączenia z serwerem. Spróbuj później. {{errorMessage}}</span>
        <ui-form-field :class="actionClass">
          <ui-button class="sendButton" @click.prevent="showSendTypingModal" raised>Wyślij</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
  </div>
  <ui-dialog v-model="sendTypingsModalOpened" @confirm="sendTyping">
    <ui-dialog-title>Wysyłane typowania</ui-dialog-title>
    <ui-dialog-content>
      <p>
        Twoje typowania to:
      </p>
      <p v-for="match in chosenMatches">
        {{match.homeTeam}} {{match.homeScore}} - {{match.awayScore}} {{match.awayTeam}}
      </p>
    </ui-dialog-content>
    <ui-dialog-actions></ui-dialog-actions>
  </ui-dialog>
  <ui-snackbar v-model="showSuccessSnackbar" 
    message="Pomyślnie wysłano" :action-type="actionType" position="top">
  </ui-snackbar>
  <ui-snackbar v-model="showErrorSnackbar" 
    message="Wystąpił błąd" :action-type="actionType" position="top">
  </ui-snackbar>
</template>

<script>
  import axios from 'axios';
  import authHeader from './../service/auth-header';
  import BalmUI from 'balm-ui';

  export default {
    name: 'Matches',
    components: {
      BalmUI
    },
    data() {
      return {
        matches:[],
        config: {
          defaultDate: 'today',
          minDate: 'today',
          locale: {
            "firstDayOfWeek": 1
          }
        },
        date: 'today',
        currentUser: {
          userId: 1
        },
        typings: {
          matches: [],
          userId: 0,
          date: 'today'
        },
        errorMessage:'',
        sendTypingsModalOpened: false,
        showSuccessSnackbar: false,
        showErrorSnackbar: false,
        actionType: 1
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      chosenMatches() {
        return this.matches.filter(match => match.chosen)
      }
    },
    methods: {
      getMatches() {
        axios.get('http://localhost:8080/matches/today', {
          params: {
            date: this.date
          },
          headers: authHeader() 
        })
          .then((response) => {
            this.matches = response.data
            this.markPastMatches()
            this.errorMessage = ''
          })
          .catch((error) => {
            this.errorMessage = error.message
          })
      },
      matchTime(match) {
        function padTo2Digits(num) {
          return String(num).padStart(2, '0')
        }
        let date = new Date(match.date)
        let matchHour = padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes())
        return matchHour;
      },
      showSendTypingModal() {
        this.sendTypingsModalOpened = true
      },
      sendTyping(result) {
        if(result) {
          this.typings.userId = this.$store.state.auth.user.id
          axios.post('http://localhost:8080/matches/typings', {
            "matches": this.chosenMatches,
            "userId": this.typings.userId
          }, {
            headers: authHeader()
          }).then((response) => {
            if(response) {
              this.showSuccessSnackbar = true
            }
          }).catch((error) => {
            this.showErrorSnackbar = true
          })
        }
        this.sendTypingsModalOpened = false
      },
      markPastMatches() {
        for(let i = 0; i < this.matches.length; i++) {
          let matchDate = new Date(this.matches[i].date).getTime()
          let now = Date.now()
          if(matchDate < now) {
            this.matches[i].disabled = true
          } else {
            this.matches[i].disabled = false
          }
        }
      }
    },
    watch: {
      date() {
        this.getMatches()
      }
    }
  }
</script>

<style scoped>
.match {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
}

.team {
  width: 100px;
  margin: 0 5px;
  text-align: center;
}

.score {
  width: 50px;
  margin: 0 5px;
}

.datepicker {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.sendButton {
  margin-top: 20px;
}

.errorMessage {
  display: flex;
  justify-content: center;
  color: red;
  margin:auto;
}
</style>
