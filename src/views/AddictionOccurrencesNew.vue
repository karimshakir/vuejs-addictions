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
      -Cost- <br>
      <vue-numeric placeholder="$unit cost" v-bind:precision="2" v-bind:minus="false" v-bind:min="0" v-bind:max="2000" currency="$" separator="," v-model="cost"></vue-numeric>
      <br><br>
      Just a Craving? <br><br>
        <div v-model="newOccurrence.craving" class="col-4 col-12-small">
          <input type="radio" id="demo-priority-low" name="demo-priority"  v-bind:value="craving.value">
          <label for="demo-priority-low">True</label>
        </div>
        <div class="col-4 col-12-small">
            <input type="radio" id="demo-priority-normal" name="demo-priority" checked v-bind:value="craving.value">
            <label for="demo-priority-normal">False</label>
        </div>

<!--       <select v-model="newOccurrence.craving">
        <option v-for="craving in cravings" v-bind:value="craving.value">
          {{ craving.value }}
        </option>
      </select> -->
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

        circumstances: [],
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

        craving: 'false',
        cravings: [
          { text: 'False', value: 'false' },
          { text: 'True', value: 'true' }
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
      getCircumstances: function() {
        if (this.newOccurrence.addiction_id) {
          axios
            .get("http://localhost:3000/api/addiction_occurrences?unique_circumstances=true&addiction_id=" + this.newOccurrence.addiction_id)
            .then(response => {
              this.pastAddictionOccurences = response.data;
            });
        }
      },
      toggleCraving: function(inputOccurrence) {
        inputOccurrence.craving = !inputOccurrence.craving;
      },
      addAddiction: function() {    
        this.errors = [];
        var params = {
          name: this.newAddiction
        };

        axios
          .post("http://localhost:3000/api/addictions", params)
          .then(response => {
            location.reload();
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
         
            this.$router.push("/")
      },

      refresh: function() {
        axios
          .get("http://localhost:3000/api/addictions")
          .then(response => {
            this.addictions = response.data;
          }); 
      }
    },
    computed: {}
};
</script>


