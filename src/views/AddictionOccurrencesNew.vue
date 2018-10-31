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
Circumstance: <br>
<select v-model="newOccurrence.circumstance">
  <option v-for="circumstance in circumstances" v-bind:value="circumstance">
    {{ circumstance }}
  </option>
</select>
<br><br>
Amount: <br>
<select v-model="selected">
  <option v-for="amount in amounts" v-bind:value="amount.value">
    {{ amount.text }}
  </option>
</select>
{{ selected }}
<br><br>
Cost: <br>
<vue-numeric v-bind:min="0" v-bind:max="2000" currency="$" separator="," v-model="price"></vue-numeric>



<vue-numeric v-bind:min="1" v-bind:max="2000"></vue-numeric>
<vue-numeric v-bind:minus="false"></vue-numeric>
<vue-numeric v-bind:precision="2"></vue-numeric>
<vue-numeric separator="."></vue-numeric>
<vue-numeric placeholder="only number allowed"></vue-numeric>
<vue-numeric :empty-value="1"></vue-numeric>



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

        errors: [],

        circumstances: ["argument w/ spouse", "feeling lonely", "I'm sad", "bored", "alone", "lost money", " I hear voices", "no-one can see me", " hanging with Brian"],
        newCircumstance: "",

          selected: '',
    amounts: [
      { text: 'One', value: 1 },
      { text: 'Two', value: 2 },
      { text: 'Three', value: 3 }
    ],
    
  name: 'App',
    price: ''
 



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


