<script setup>
const props=defineProps({
    review:{
        type: String,
    },
})
</script>
<template>
    <div class="container">
        <q>{{props.review}}</q>
    </div>
  </template>
<style scoped>
.container{
  width: 85%;
  padding: 0;
  margin: 0 auto;
  color: white;
  font-style: italic;
  
}
q{
  quotes: initial;
}
</style>
