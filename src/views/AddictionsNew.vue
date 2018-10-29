<template>
  <div class="addiction">
    
    <h1>Custom Addiction</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Addiction_id
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a v-for="addiction in addictions" class="dropdown-item" href="#">{{ addiction.name }}</a>
        <a class="dropdown-item" href="#">3-Other</a>
      </div>
    </div>


        
        <button v-on:click="addAddiction()">Submit</button>
        New Addiction:  <input v-model="newAddiction">
        <p v-for="addiction in addictions">{{ addiction.name }}--------backend data</p>  

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
        addictions: [],

        newAddiction: "",
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
      // addAddiction: function() {
        
      //   this.errors = [];
      //   var params = {
      //     name: this.newAddiction
      //   };

      //   axios
      //     .post("http://localhost:3000/api/addictions", params)
      //     .then(response => {
      //       this.addictions.push(this.response.data);
      //       this.newAddiction = "";
      //     })
      //     .catch(error => {
            
      //       this.errors = error.response.data.errors;
      //     });
      // }
    },
    computed: {}
};
</script>


