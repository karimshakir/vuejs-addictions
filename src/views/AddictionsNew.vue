<template>
  <div class="addiction">  
    <h1>Custom Addiction</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div>
    </div> 
    <br><br>        
      <button v-on:click="addAddiction()">Submit</button>
      New Addiction:  <input v-model="newAddiction">
      <p v-for="addiction in addictions">{{ addiction.name }}</p>  
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
        newAddiction: "",
        errors: []
      };
    },
    created: function() {
      axios
        .get("/api/addictions")
        .then(response => {
          this.addictions = response.data;
        });
    },

    methods: {    
      addAddiction: function() {    
        this.errors = [];
        var params = {
          name: this.newAddiction
        };

        axios
          .post("/api/addictions", params)
          .then(response => {
            this.addictions.push(this.response.data);
            this.newAddiction = "";   
          })
          .catch(error => {
            
            this.errors = error.response.data.errors;
          });
      },
 
    },
    computed: {}
};
</script>


