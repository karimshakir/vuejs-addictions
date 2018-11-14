<template>
  <div class="home" style='height:600px'>
    <sunburst :data="tree">
 
  <!-- Add behaviors -->
    <template slot-scope="{ nodes, actions }">
      <br>
      <highlightOnHover :nodes="nodes" :actions="actions" />
      <zoomOnClick :nodes="nodes" :actions="actions" />
    </template>
   
    <!-- Add information to be displayed on top the graph -->
    <nodeInfoDisplayer slot="top" slot-scope="{ nodes }" :current="nodes.mouseOver" :root="nodes.root" description="" />
   
    <!-- Add bottom legend -->
    <breadcrumbTrail slot="legend" slot-scope="{ nodes, colorGetter, width }" :current="nodes.mouseOver" :root="nodes.root" :colorGetter="colorGetter" :from="nodes.clicked" :width="width" />
 
    </sunburst>
  </div>
</template>

<style>
</style>


<script>
var axios = require('axios');


import {
  breadcrumbTrail,
  highlightOnHover,
  nodeInfoDisplayer,
  sunburst,
  zoomOnClick
} from 'vue-d3-sunburst';
import "vue-d3-sunburst/dist/vue-d3-sunburst.css";
export default {
  components: {
    breadcrumbTrail,
    highlightOnHover,
    nodeInfoDisplayer,
    sunburst,
    zoomOnClick
  },
  data: function() {
    return { 
      tree:  {
        "name": " ",
        "children": []
      }
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/graph_info").
      then(response => {
        this.tree = response.data;
      });
  },
  methods: {},
  computed: {}
};
</script>
