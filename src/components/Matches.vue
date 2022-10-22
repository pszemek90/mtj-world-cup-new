<template>
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
        <ui-checkbox v-model="match.chosen"></ui-checkbox>
        <span class="team">{{match.homeTeam}}</span>
        <ui-form-field>
          <ui-textfield class="score" @input="match.chosen = true" endAligned v-model="match.homeScore" outlined></ui-textfield>
        </ui-form-field>
        -
        <ui-form-field>
          <ui-textfield class="score" @input="match.chosen = true" v-model="match.awayScore" outlined></ui-textfield>
        </ui-form-field> 
        <span class="team">{{match.awayTeam}}</span>
        <span>{{matchTime(match)}}</span>
      </div>
      <ui-form-field :class="actionClass">
        <ui-button class="sendButton" @click.prevent="sendTyping" raised>Wyślij</ui-button>
      </ui-form-field>
    </template>
  </ui-form>
  <ui-dialog v-model="sendTypingsModalOpened" @confirm="sendTyping">
    <ui-dialog-title>Wysyłane typowania</ui-dialog-title>
    <ui-dialog-content>
      <p>
        Twoje typowania to:
      </p>
      <p>
        
      </p>
    </ui-dialog-content>
  </ui-dialog>
</template>

<script>
  import axios from 'axios';
  import authHeader from './../service/auth-header';
  import BalmUI from 'balm-ui';

  export default {
    name: 'Matches',
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
          userId: 0
        }
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
            this.matches = response.data;
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
      sendTyping() {
        this.typings.matches = this.matches.filter((match) => match.chosen);
        this.typings.userId = 1
        axios.post('http://localhost:8080/matches/typings', {
          "matches": this.typings.matches,
          "userId": this.typings.userId
        });
        console.log(this.matches);
      }
    },
    watch: {
      date() {
        this.getMatches()
      }
    },
    components: {
      BalmUI
    },
    mounted() {
      this.getMatches();
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
</style>
