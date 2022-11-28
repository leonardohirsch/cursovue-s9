<script setup>
const props=defineProps({
    filmData:{
        type: Object
    }
})
</script>
<template>
    <div>
        <h1>{{props.filmData.title}}</h1>
          <div class="details">
            <span>{{props.filmData.year}}</span>
            <span>{{parseInt(props.filmData.runtime/60)}} min</span>
            <span class="genre_title">{{props.filmData.genreTitle}}</span>
            <span><a :href="'https://www.imdb.com/title/'+props.filmData.imdb_id" class="imdb_link" target="_blank">Más info</a></span>
          </div>
    </div>
</template>
<style scoped>
h1{
  color: lightsalmon;
  margin-bottom: 15px;
  text-align: left;
}
.details{
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
}
a.imdb_link{
    color: #FFF;
    text-decoration: none;
}
a.imdb_link:hover{
  color:lightsalmon;
}
.genre_title{
    font-style: italic;
}
</style>