<script>
import { db } from "../../../plugins/firebase";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
export default {
    async asyncData ({ store }) {
    try {
        const collectionRef = collection(db, "scoresFilms");
        const q = query(collectionRef, orderBy("calificacion_prom", "desc"), orderBy("votes", "desc"), limit(20));
        const getDocuments =await getDocs(q);
        const localCopy=[];
        getDocuments.forEach((doc)=>{
        localCopy.push(doc.data())
        })
        store.dispatch("films/loadBestList", localCopy)
    } 
    catch (e) {
      console.error({ statusCode: 404, message: 'Se produjo un error' })
    }
  },
  head() {
      return {
        title: "Mi MuviDb: Best Films"
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
import { app } from "../../../plugins/firebase";
import { db } from "../../../plugins/firebase";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { useStore, ref, computed, onMounted, onUnmounted } from '@nuxtjs/composition-api'
import FilmList from '@/components/FilmList.vue'
import FilmSearch from '@/components/FilmSearch.vue'
import Menu from '@/components/Menu.vue'
import Spinner from '@/components/Spinner.vue'

const store = useStore();
const isLoadingProfile=computed(()=>{
    return store.state.user.user==null ? true : false;
})
const isLoadingMovies=ref(true);
const showItemsIntervalo=2;
const showItemsFrom=ref(0);
const showItemsTo=ref(showItemsFrom.value+showItemsIntervalo);
const listBestOriginal=ref([...store.state.films.filmsBest])
const listToShow=ref([]);
const sublistToShow=ref([]);
const checkBestinList=()=>{
  for (let index=0; index<listBestOriginal.value.length; index++){
  const indexMovieList=store.state.films.filmsInList.findIndex(item=>item.imdb_id==listBestOriginal.value[index].imdb_id)
   if (indexMovieList!=-1){
     listBestOriginal.value[index].list=store.state.films.filmsInList[indexMovieList].list;
   } else{
    listBestOriginal.value[index].list='';
   }
  }
  listToShow.value=[...listBestOriginal.value];
  sublistToShow.value=listToShow.value.slice(showItemsFrom.value,showItemsTo.value);
  isLoadingMovies.value=false;
}

if (store.state.films.firebaseChecked==true){
  checkBestinList();
} else {
//esperar a qué cargue filmsInList desde Firebase
  const getPersonalMovies=setInterval(()=>{
    if (store.state.films.firebaseChecked==true){
      checkBestinList();
      clearInterval(getPersonalMovies);
    }
  }, 100)
}

//LazyLoad de Films ->inicio
const stopGettingItems=ref(false);
const divListado=ref(null)
const getMore = (e)=> {
  if (divListado.value.getBoundingClientRect().bottom < window.innerHeight+20 && !stopGettingItems.value) {
        if(sublistToShow.value.length<listToShow.value.length){
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

 const searchMovie=(search)=>{
    listToShow.value=listBestOriginal.value.filter(film=> (film.title.toLowerCase().includes(search.search.toLowerCase().trim())) || film.genreTitle.toLowerCase().includes(search.search.toLowerCase().trim()))
    sublistToShow.value=listToShow.value.slice(0,showItemsTo.value)
 }
 const resetSearch=(search)=>{
    if (search.search.trim().length==0){
        listToShow.value=listBestOriginal.value;
        sublistToShow.value=listToShow.value.slice(0,showItemsTo.value)
    }
 }
</script>
<template>
<div class="container" v-if="!isLoadingProfile">
  <Menu />
    <div v-if="isLoadingMovies">
        <Spinner />
    </div>
    <div v-if="!isLoadingMovies && listBestOriginal.length==0">
        <p style="text-align: center;">Lo siento, no pudimos encontrar films. Prueba más tarde</p>
    </div>
    <div class="buscador-container" v-if="!isLoadingMovies && listBestOriginal.length>0">
        <FilmSearch @doSearch="searchMovie" @checkSearch="resetSearch" />
    </div>
    <div ref="divListado">
        <ul v-if="sublistToShow.length>0">
            <li v-for="(film, index) in sublistToShow" :key="index">
                <FilmList :film="film" :from="'best'" />           
            </li>
        </ul>
    </div>
</div>

</template>
<style scoped>
.container{
    box-sizing: border-box;
    padding: 10px;
    color:#fff
}
ul{
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
</style>