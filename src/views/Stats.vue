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
          <span>{{userAddictionId}}</span>  
          <br><br>
          <button v-on:click="addAddiction()">Submit</button>
        </div>
      </div>
    <br>
    <h6>User Data:</h6>
    <div v-for="occurrence in occurrences"> 
      addiction: {{occurrence.addiction_name}}<br>
      location: {{occurrence.location}}<br>
      circumstance: {{occurrence.circumstance}}<br>
      amount: {{occurrence.amount}}<br>
      cost: {{occurrence.cost}}<br>
      time: {{occurrence.created_at}}<br><br>
    </div>
    <br><br>

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

        userAddictionId: "",
        errors: []
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
      addAddiction: function() {
        this.errors = [];
        var params = {
          name: this.userAddictionId
        };
        axios
          .get("http://localhost:3000/api/addiction_occurrences/?addiction_id=" + this.userAddictionId)
          .then(response => {
            this.occurrences = response.data;          
          })
          .catch(error => {     
            this.errors = error.response.data.errors;
          });
      }
    },
    computed: {}
  };
</script>


