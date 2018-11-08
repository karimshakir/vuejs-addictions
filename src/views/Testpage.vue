<template>
  <div class="testpage">
    <h1>{{ message }}</h1>
  
    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
<!-- <span>Selected: {{ selected }}</span> -->
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to TestPage!",
      selected: 'A',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' }
      ]
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>