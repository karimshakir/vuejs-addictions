<template>
<!--   <div class="circumstance">
    <h1>{{ message }}</h1>
    <div></div>
    <div>    
      <button v-on:click="addCircumstance()">Submit</button>
      New Circumstance:  <textarea newCircumstance rows="1" cols="25" v-model="newCircumstance"></textarea> 
      <br><br>
      <p v-for="circumstance in circumstances"> {{ circumstance }} (frontend data) </p>
      <p></p>   
    </div>
  </div> -->
  <div class="circumstances">  
    <h1>Custom Circumstance</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div>
      <div class="dropdown">
        Circumstance: <br>
        <select v-model="newCircumstance">
          <option v-for="circumstance in circumstances" v-bind:value="circumstance">
            {{ circumstance }}  
          </option>
        </select>
      </div>
    </div> 
    <br><br>        
      <button v-on:click="addCircumstance()">Submit</button>
      New Circumstance:  <input v-model="newCircumstance">
      <p v-for="circumstance in circumstances">{{ circumstance.name }}</p>  
    </div>


</template>

<style>
</style>

<script>
  var axios = require('axios');
  export default {
    data: function() {
      return {
        message: "Describe Current Condition",
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