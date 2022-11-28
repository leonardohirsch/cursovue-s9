<script>
export default {
    head() {
        return {
          title: "Mi MuviDb: Mis Films"
        };
      },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.user.user==null){
                vm.$store.dispatch("user/checkAuth");
            }    
        })
    }
};
</script>
<script setup>
import { useStore, ref, computed, onMounted, onUnmounted, watch } from '@nuxtjs/composition-api'
import FilmList from '@/components/FilmList.vue'
import FilmSearch from '@/components/FilmSearch.vue'
import Menu from '@/components/Menu.vue'
import Spinner from '@/components/Spinner.vue'

const store = useStore();
const isLoadingProfile=computed(()=>{
    return store.state.user.user==null ? true : false;
})
const isLoadingMovies=ref(true);
const myMoviesList=computed(()=>{
    return store.state.films.filmsInList;
})
const myMoviesQuantity= computed(()=>{
     return store.getters['films/filmsInListNum'];
 })


const listToShow=ref([]);
const sublistToShow=ref([])

const showItemsIntervalo=2;
const showItemsFrom=ref(0);
const showItemsTo=ref(showItemsFrom.value+showItemsIntervalo);

const searchOn=ref(false);
const searchQuery=ref("");

if (store.state.films.firebaseChecked==true){
  listToShow.value=[...myMoviesList.value]
  sublistToShow.value=[...myMoviesList.value.slice(showItemsFrom.value,showItemsTo.value)]
  isLoadingMovies.value=false;
} else {
//esperar a qué cargue filmsInList desde Firebase
  const getPersonalMovies=setInterval(()=>{
    if (store.state.films.firebaseChecked==true){
      listToShow.value=[...myMoviesList.value]
      sublistToShow.value=[...myMoviesList.value.slice(showItemsFrom.value,showItemsTo.value)]
      isLoadingMovies.value=false;
      clearInterval(getPersonalMovies);
    }
  }, 100)
}

//watch para cuando reload cargue filmsInList
watch(() => myMoviesList.value,
  (newValue, oldValue) => {
    listToShow.value=newValue;
    sublistToShow.value=[...newValue.slice(showItemsFrom.value,showItemsTo.value)]
  },
  { deep: true}
);

//LazyLoad de Films ->inicio
const stopGettingItems=ref(false);
const divListado=ref(null)
const getMore = (e)=> {
  if (divListado.value.getBoundingClientRect().bottom < window.innerHeight+20 && !stopGettingItems.value) {
        if(sublistToShow.value.length<myMoviesQuantity.value){
          stopGettingItems.value=true;
          showItemsFrom.value+=showItemsIntervalo;
          showItemsTo.value+=showItemsIntervalo;
          sublistToShow.value=[...sublistToShow.value, ...listToShow.value.slice(showItemsFrom.value,showItemsTo.value)]
          setTimeout(()=>{
            stopGettingItems.value=false;
          }, 200)
        } 
      }
}

onMounted(() => {
  window.addEventListener("scroll", getMore)
 })
onUnmounted(() => {
 window.removeEventListener("scroll", getMore)
})
//LazyLoad de Films ->final

const orderList=(by)=>{
    let searchIn;
    if (searchOn.value){
        searchIn=myMoviesList.value.filter(film=> (film.title.toLowerCase().includes(searchQuery.value.toLowerCase().trim())) || film.genreTitle.toLowerCase().includes(searchQuery.value.toLowerCase().trim()))
    } else searchIn=myMoviesList.value;
    switch (by){
        case "score":
            listToShow.value=searchIn.map(film=> film).sort((a, b) => b.calificacion - a.calificacion );
        break;
        case "genre":
            listToShow.value=searchIn.map(film=> film).sort((a, b) => a.genreTitle.localeCompare(b.genreTitle));
        break;
        case "list":
            listToShow.value=searchIn.map(film=> film).sort((a, b) => a.list.localeCompare(b.list));
        break;
    }
    sublistToShow.value=[...listToShow.value.slice(0,showItemsTo.value)]
}
 
 const searchMovie=(search)=>{
    listToShow.value=myMoviesList.value.filter(film=> (film.title.toLowerCase().includes(search.search.toLowerCase().trim())) || film.genreTitle.toLowerCase().includes(search.search.toLowerCase().trim()))
    sublistToShow.value=[...listToShow.value.slice(0,showItemsTo.value)]
    searchOn.value=true;
    searchQuery.value=search.search;
 }
 const resetSearch=(search)=>{
    if (search.search.trim().length==0){
        listToShow.value=myMoviesList.value;
        sublistToShow.value=[...listToShow.value.slice(0,showItemsTo.value)]
        searchOn.value=false;
        searchQuery.value="";
    }
 }
</script>
<template>
<div class="container" v-if="!isLoadingProfile">
    <Menu />
    <div v-if="isLoadingMovies">
        <Spinner />
    </div>
    <div v-if="!isLoadingMovies && myMoviesQuantity==0">
        <p style="text-align: center;">¡Aún no tienes films guardados en tu base!</p>
    </div>
    <div v-if="!isLoadingMovies && myMoviesQuantity>0">
    <div class="buscador-container" >
        <FilmSearch @doSearch="searchMovie" @checkSearch="resetSearch" />
    </div>
    <div class="order-menu">
      <b>Ordenar:</b><br>
      <button @click.prevent="orderList('list')">Por lista</button>
      <button @click.prevent="orderList('score')">Por calificación</button>
      <button @click.prevent="orderList('genre')">Por género</button>
    </div>
    <div ref="divListado">
        <ul>
            <li v-for="(film, index) in sublistToShow" :key="index">
                <FilmList :film="film" :from="'mymovies'" />           
            </li>
        </ul>
    </div>
</div>
</div>

</template>
<style scoped>
.container{
    box-sizing: border-box;
    padding: 10px;
    color:#fff
}
.buscador-container{
  margin: 15px 0;
}
.order-menu{
  text-align: center;
  margin: 15px 0;
}
button{
  margin: 5px 5px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: lightsalmon;
  font-size: 1rem;
}
button:hover{
  color:white;
}
ul{
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
</style>