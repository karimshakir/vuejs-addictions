<template>


  <div class="addictionOccurrence"> 
    <h1>Addiction Occurrence</h1>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

    <ul class="actions">
      <li><button class="button primary" v-on:click="addAddiction()">Add Addiction</button></li>
      <li><input v-model="newAddiction" list="newAddictionEntry" placeholder="   addiction name"><br></li>    
    </ul>

      <h3>-Choose Addiction-</h3>
      <select v-model="newOccurrence.addiction_id" v-on:change="getCircumstances()">
        <option v-for="addiction in addictions" v-bind:value="addiction.id">
          {{ addiction.name }}  
        </option>   
      </select>
      <br><br>
      
      -Location- <br>
      <select v-model="newOccurrence.location">
        <option v-for="location in locations" v-bind:value="location">
          {{ location }}
        </option>
      </select>
      <br><br>

      -Circumstance- <br>
      <input v-model="newOccurrence.circumstance" list="past-circumstances">
      <datalist id="past-circumstances">
        <option v-for="pastAddictionOccurence in pastAddictionOccurences">{{pastAddictionOccurence.circumstance}}</option>
      </datalist>
      <br><br>

      -Amount- <br>
      <select v-model="newOccurrence.amount">
        <option v-for="amount in amounts" v-bind:value="amount.value">
          {{ amount.value }}
        </option>
      </select>
      <br><br>

      Just a Craving? <br><br>
        <input type="radio" id="one" value="true" v-model="newOccurrence.craving">
        <label for="one">true</label>
        <br>
        <input type="radio" id="two" value="false" v-model="newOccurrence.craving">
        <label for="two">false</label>
        <br>

      <span>{{ selected }}</span>
      <br>
      <br>

      <transition name="fade">
      <button class="primary button"v-on:click="addOccurrence()">Submit</button> 
      </transition>
      <br><br>                          
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
        pastAddictionOccurences: [],

        locations: ["work", "my-home", "car", "restaurant", "bar", "club",
          "a-house", "other"],
        newLocation: "",
          
        circumstances: [],
        newCircumstance: "",

        selected: '',
        amounts: [
          { text: 'One', value: 1 },
          { text: 'Two', value: 2 },
          { text: 'Three', value: 3 }
        ], 
        cost: '',

        cravings: [
          { text: 'False', value: 'false' },
          { text: 'True', value: 'true' }
        ], 
        newCraving: 'false'
      };
    },

    created: function() {
      axios
        .get("/api/addiction_occurrences")
        .then(response => {
          this.occurrences = response.data;
        });

      axios
        .get("/api/addictions")
        .then(response => {
          this.addictions = response.data;
        }); 
    },

    methods: {
      getCircumstances: function() {
        if (this.newOccurrence.addiction_id) {
          axios
            .get("/api/addiction_occurrences?unique_circumstances=true&addiction_id=" + this.newOccurrence.addiction_id)
            .then(response => {
              this.pastAddictionOccurences = response.data;
            });
        }
      },

      addAddiction: function() {    
        this.errors = [];
        var params = {
          name: this.newAddiction
        };

        axios
          .post("/api/addictions", params)
          .then(response => {
e
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
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
          .post("/api/addiction_occurrences", params)
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
         
        this.$router.push("/");
      },

      refresh: function() {
        axios
          .get("/api/addictions")
          .then(response => {
            this.addictions = response.data;
          }); 
      }
    },
    computed: {}
};
</script>


