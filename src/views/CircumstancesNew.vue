<template>
  <div class="circumstance">
    <h1>{{ message }}</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <div>
      
      <button v-on:click="addCircumstance()">Submit</button>
      New Circumstance:  <textarea newCircumstance rows="1" cols="25" v-model="newCircumstance">

</textarea> 
      <p v-for="circumstance in circumstances"> {{ circumstance }} (frontend data) </p>   
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
        message: "Discribe Current Condition",
        circumstances: ["argument w/ spouse", "feeling lonely", "I'm sad", "bored", "alone", "lost money", " I hear voices", "no-one can see me", " hanging with Brian"],
        newCircumstance: ""
        
      };
    },
    created: function() {
    
    },
    methods: {
      addCircumstance: function() {
        if (this.newCircumstance) {
          this.circumstances.push(this.newCircumstance);
          this.newCircumstance = "";
        }
      }
    },
    computed: {}
};
</script>