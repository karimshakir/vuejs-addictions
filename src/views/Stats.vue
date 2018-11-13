<template>
  <div class="stats"> 
    <h1>Statistics</h1>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <div class="dropdown">
          <h5>Addiction:</h5>
          <select v-model="userAddictionId">
            <option v-for="addiction in addictions" v-bind:value="addiction.id">
              {{ addiction.name }}
            </option>
          </select>

          <br><br>
          <button class="button primary" v-on:click="showStats()">Submit</button>
        </div>
      </div>
    <br>
    <h6>User Data:</h6>
    <h2>Time since last occurrence: {{ daysSince }} Days {{ hoursSince }} Hours {{ minutesSince }} Minutes {{ secondsSince }} Seconds</h2>

                  <h3>Alternate</h3>
                  <div class="table-wrapper">
                    <table class="alt">
                      <thead>
                        <tr>
                          <th>Addiction</th>
                          <th>Location</th>
                          <th>Circumstance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="occurrence in occurrences">
                          <td>{{occurrence.addiction_name}}</td>
                          <td>{{occurrence.location}}</td>
                          <td>{{occurrence.circumstance}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

<section>
                  <div class="table-wrapper">
                    <table class="alt">
                      <thead>
                        <tr>
                          <th>Addiction</th>
                          <th>Location</th>
                          <th>Circumstance</th>
                          <th>amount</th>
                          <th>cost</th>
                          <th>craving</th>
                          <th>created_at</th>
                        </tr>
                      </thead>
                      <div v-for="occurrence in occurrences">
                      <tbody>
                        <tr>
                          <td>{{occurrence.addiction_name}}</td>
                          <td>{{occurrence.location}}</td>
                          <td>{{occurrence.circumstance}}</td>
                          <td>{{occurrence.amount}}</td>
                          <td>{{occurrence.cost}}</td>
                          <td>{{occurrence.craving}}</td>
                          <td>{{occurrence.created_at}}</td>
                        </tr>
                      </tbody>
                    </div>
                      <tfoot>
                        <tr>
                          <td colspan="2"></td>
                          <td>100.00</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
</section>

    <br><br>
    <div v-for="occurrence in occurrences"> 
      addiction: {{occurrence.addiction_name}}<br>
      location: {{occurrence.location}}<br>
      circumstance: {{occurrence.circumstance}}<br>
      amount: {{occurrence.amount}}<br>
      cost: {{occurrence.cost}}<br>
      craving: {{occurrence.craving}}<br>
      freq: {{frequency}}<br>
      time: {{occurrence.created_at}}<br><br>
    </div>

    <svg>
      
    </svg>
  </div>
</template>

<style>
</style>

<script>
  var axios = require('axios');


  export default {
    data: function() {
      return {
        addictions: [],
        occurrences: [],
        frequency: '',
        durations: [
          ],
        newDuration: "",
        userAddictionId: "",
        errors: [],
        daysSince: 0,
        hoursSince: 0,
        minutesSince: 0,
        secondsSince: 0,
        timerInterval: 0
      };
    },
    created: function() {
      axios
        .get("http://localhost:3000/api/addictions")
        .then(response => {
          this.addictions = response.data;
        });
    },
    methods: {
      showStats: function() {
        this.errors = [];
        var params = {
          name: this.userAddictionId
        };
        axios
          .get("http://localhost:3000/api/addiction_occurrences/?addiction_id=" + this.userAddictionId)
          .then(response => {
            this.occurrences = response.data;          
            this.frequency = this.occurrences.length;  

            if (this.occurrences.length > 0) {
              var lastOccurrence = this.occurrences[this.occurrences.length - 1];

              var start = Date.parse(lastOccurrence.created_at);

              if (this.timerInterval) {
                clearInterval(this.timerInterval);
              }

              this.timerInterval = setInterval(function() {

                var millis = Date.now() - start;

                var days = Math.floor(millis / (24 * 60 * 60 * 1000));
                millis = millis - days * (24 * 60 * 60 * 1000);
                var hours = Math.floor(millis / (60 * 60 * 1000));
                millis = millis - hours * (60 * 60 * 1000);
                var minutes = Math.floor(millis / (60 * 1000));
                millis = millis - minutes * (60 * 1000);
                var seconds = Math.floor(millis / (1000));

                this.secondsSince = seconds;
                this.minutesSince = minutes;
                this.hoursSince = hours;
                this.daysSince = days;

              }.bind(this), 1000);    
            }
          })
          .catch(error => {     
            this.errors = error.response.data.errors;
          });
      },
    },
    computed: {}
  };
</script>


