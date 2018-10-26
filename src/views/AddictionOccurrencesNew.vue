<template>
  <div class="addictionOccurrence">
    
    <h1>Addiction Occurrence</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div>
      
      <button v-on:click="addOccurrence()">Submit</button>
        Addiction: <input v-model="newOccurrence.addiction_id">
        Location:  <input v-model="newOccurrence.location">
        Circumstance:  <input v-model="newOccurrence.circumstance">
      <p v-for="occurrence in occurrences">{{ occurrence }}--------backend data</p>   
    </div>

  </div>

</template>

<style>

</style>

<script>
  var axios = require('axios');

export default {
    data: function() {
      return {
        occurrences: [],
        newOccurrence: {addiction_id: 2, location: "", circumstance: "", craving: false},
        errors: []
        // ,nameFilter: "",
        // sortAttribute: 'name',
        // sortOrder: 1
      };
    },


    created: function() {
      axios
        .get("http://localhost:3000/api/addiction_occurrences")
        .then(response => {
          this.occurrences = response.data;
        });
    },

    methods: {
      addOccurrence: function() {
        
        this.errors = [];
        var params = {
          location: this.newOccurrence.location,
          circumstance: this.newOccurrence.circumstance
        };

        axios
          .post("http://localhost:3000/api/addiction_occurrences", params)
          .then(response => {
            this.occurrences.push(this.response.data);
            this.newOccurrence = {addiction_id: "", location: "", circumstance: "", craving: ""};
          })
          .catch(error => {
            
            this.errors = error.response.data.errors;
          });
      }
    },
    computed: {}
};
</script>


