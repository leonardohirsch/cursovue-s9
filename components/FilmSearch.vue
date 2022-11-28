<script setup>
import { ref } from '@nuxtjs/composition-api'
const emit=defineEmits(["doSearch", "checkSearch"]);
const searchMovieTitle=ref("");
</script>
<template>
    <div class="container" >
      <form @submit.prevent="$emit('doSearch',{search: searchMovieTitle})">
        <input type="text" v-model="searchMovieTitle" class="buscador-input" placeholder="Ingrese título o género" @keyup="$emit('checkSearch',{search: searchMovieTitle})">
        <button type="submit" class="buscador-btn">Buscar!</button>
      </form>
    </div>
  </template>
<style scoped>
.container{
  width: 100%;
  padding: 0;
  margin: 20px auto;
  color: #FFF;
  font-style: italic;
  text-align: center;
}
form{
  display: flex;
  flex-direction: column;
  gap:15px;
  align-items: center;
}
button{
  padding: 5px;
  margin: 0 5px;
  border-radius: 5px;
  width: fit-content;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: white;
  background: salmon;
  border-color: salmon;
  cursor: pointer;
}
button:hover{
  color:black;
}
input{
  width: 50%;
  padding: 5px;
  border-radius: 5px;
  border-color: salmon;
  font-weight: 600;
}
@media only screen and (min-width: 550px) {
  form{
    flex-direction: row;
    justify-content: center;
  }
}
</style>