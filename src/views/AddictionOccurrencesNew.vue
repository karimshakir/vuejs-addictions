<template>
  <div class="addictionOccurrence">
    
    <h1>Addiction Occurrence</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div>
          
<select v-model="newOccurrence.addiction_id">
  <option v-for="addiction in addictions" v-bind:value="addiction.id">
    {{ addiction.name }}
  </option>
</select>
<span> {{  }} </span>


<br>
    <br>
      <button v-on:click="addOccurrence()">Submit</button>

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
        newOccurrence: {               
                        addiction_id: "",
                        location: "",
                        circumstance: "",
                        amount: "",
                        cost: "",
                        craving: ""
                        },
        addictions: [],
        newAddiction: "",
        errors: []
      };


    },

    created: function() {
      axios
        .get("http://localhost:3000/api/addiction_occurrences")
        .then(response => {
          this.occurrences = response.data;
        });

      axios
        .get("http://localhost:3000/api/addictions")
        .then(response => {
          this.addictions = response.data;
        });
    },

    methods: {
      toggleCraving: function(inputOccurrence) {
        inputOccurrence.craving = !inputOccurrence.craving;
      },

      addOccurrence: function() {
        this.errors = [];
        var params = {
                      addiction_id: this.newOccurrence.addiction_id,
                      location: this.newOccurrence.location,
                      circumstance: this.newOccurrence.circumstance,
                      amount: this.newOccurrence.amount,
                      cost: this.newOccurrence.cost,
                      craving: this.newOccurrence.craving
                      };
        
        axios
          .post("http://localhost:3000/api/addiction_occurrences", params)
          .then(response => {
            this.occurrences.push(response.data);
            this.newOccurrence = {
                                  addiction_id: "",
                                  location: "",
                                  circumstance: "",
                                  amount: "",
                                  cost: "",
                                  craving: ""};
                                  })
          .catch(error => {
            this.errors = error.response.data.errors;
          });


      },


      // deletePerson: function(inputOccurrence) {
      //   var index = this.addiction_occurrences.indexOf(inputOccurrence);
      //   this.addiction_occurrences.splice(index, 1);
      // },
      // setSortAttribute: function(inputAttribute) {
      //   if (this.sortAttribute === inputAttribute) {
      //     this.sortOrder = this.sortOrder * -1;
      //   } else {
      //     this.sortOrder = 1;
      //   }
      //   this.sortAttribute = inputAttribute;
      // }
    },
    computed: {}
};
</script>


