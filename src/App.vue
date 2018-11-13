<template>
  <div id="app">



<div class="container">
  <!-- DO NOT TOUCH THIS -->
  <!-- <transition name="fade"> -->
    <router-view/>
  <!-- </transition> -->
</div>
  </div>
</template>

<style>
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
