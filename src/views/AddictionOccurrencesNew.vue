<template>
  <div class="addictionOccurrence">
    
    <h1>Addiction Occurrence</h1>
    

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div>
        

Addiction: <br>
<select v-model="newOccurrence.addiction_id">
  <option v-for="addiction in addictions" v-bind:value="addiction.name">
    {{ addiction.name }}  
  </option>
</select>
<br><br>
Location: <br>
<select v-model="newOccurrence.location">
  <option v-for="location in locations" v-bind:value="location">
    {{ location }}
  </option>
</select>
<br><br>
Circumstance: <br>
<select v-model="newOccurrence.circumstance">
  <option v-for="circumstance in circumstances" v-bind:value="circumstance">
    {{ circumstance }}
  </option>
</select>
<br><br>
Amount: <br>
<select v-model="newOccurrence.amount">
  <option v-for="amount in amounts" v-bind:value="amount.value">
    {{ amount.value }}
  </option>
</select>
<br><br>
Cost: <br>
<vue-numeric placeholder="$unit cost" v-bind:precision="2" v-bind:minus="false" v-bind:min="0" v-bind:max="2000" currency="$" separator="," v-model="cost"></vue-numeric>
<br><br>
Just a Craving? <br>
<select v-model="newOccurrence.craving">
  <option v-for="craving in cravings" v-bind:value="craving.value">
    {{ craving.value }}
  </option>
</select>
{{ selected }}
<br>
<br>

      <button v-on:click="addOccurrence()">Submit</button>                           
    </div>
  </div>

</template>

<style>
</style>

<script>
  var axios = require('axios');
  import VueNumeric from 'vue-numeric';

export default {
  components: {
    VueNumeric
  },
    data: function() {
      return {
        occurrences: [],
        errors: [],
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


        circumstances: ["argument w/ spouse", "feeling lonely", "I'm sad", "bored", "alone", "lost money", " I hear voices", "no-one can see me", " hanging with Brian"],
        newCircumstance: "",

         locations: ["work", "home", "car", "restaurant"],
        newLocation: "",

    selected: '',
    amounts: [
      { text: 'One', value: 1 },
      { text: 'Two', value: 2 },
      { text: 'Three', value: 3 }
    ], 
    cost: '',

       craving: '',
    cravings: [
      { text: 'True', value: 'true' },
      { text: 'False', value: 'false' }
    ], 
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

      addCircumstance: function() {
        if (this.newCircumstance) {
          this.circumstances.push(this.newCircumstance);
          this.newCircumstance = "";
        }
      }

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


