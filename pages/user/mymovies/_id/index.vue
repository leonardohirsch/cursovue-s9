<script>
export default {
  head() {
        return {
            title: "Mi MuviDb: Mis Muvis"
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
          if (!from.name) vm.$router.push({name: "user-mymovies"})    
        })
    }
};
</script>
<script setup>
import { useStore, useRoute, useRouter, ref, computed } from '@nuxtjs/composition-api'
import PersonalComments from '@/components/PersonalComments.vue'
import Menu from '@/components/Menu.vue'
import MovieMainData from '@/components/MovieMainData.vue'
import ProfileMainBtn from '@/components/ProfileMainBtn.vue'
import ProfileSecondaryBtn from '@/components/ProfileSecondaryBtn.vue'
const store = useStore();
const router = useRouter();
const route = useRoute();
const filmId= computed(() => route.value.params.id);
const filmData=ref({
    list:null,
    calificacion: null,
    docId: null,
    imdb_id:null,
    alreadyVote: null,
    oldVote: null,
    genreId: null,
    genreTitle:null,
    runtime: null,
    synopsis: null,
    title: null,
    year: null
  })
const isInList=computed(()=>{
    return store.state.films.filmsInList.find(item=>item.imdb_id==filmId.value);
})
if (isInList.value!=undefined) {
  filmData.value=isInList.value;
}
const titleList=computed(()=>{
    return filmData.value.list=="toSee"? "Films para ver" : "Films vistos";
})

const listType=computed(()=>{
    return filmData.value.list=="toSee"? "toSee" : "Seen";
})

const scoreLabel=computed(()=>{
    return filmData.value.calificacion==null? "Aún no la has calificado: " : "Tu calificación: ";
})
const scoreBtn=computed(()=>{
    return filmData.value.calificacion==null? "Puntuar!" : "Puntuar otra vez!";
})
const alreadyVote=computed(()=>{
    return filmData.value.calificacion==null? false: true;
})

const calificacion=ref(filmData.value.calificacion);
if (calificacion.value==null){
    calificacion.value=10;
}

const showScoreMessage=ref("");

const delFromList= async () =>{
  try{
    await store.dispatch("films/delFilmFromList", filmData.value.docId);
    router.push({ name: 'user-mymovies' });
  }
  catch(error){
    console.log(error)
  }
}

const changeList = async () =>{
  try{
    await store.dispatch("films/changeList", {docId:filmData.value.docId, list: filmData.value.list});
  }
  catch(error){
    console.log(error)
  }
}

const scoreFilm=async()=>{
  try{
    await store.dispatch("films/scoreFilm", {docId:filmData.value.docId, imdb_id:filmData.value.imdb_id, calificacion: calificacion.value, alreadyVote: alreadyVote.value, oldVote: filmData.value.calificacion, genreId: filmData.value.genreId, genreTitle: filmData.value.genreTitle, runtime: filmData.value.runtime, synopsis: filmData.value.synopsis, title: filmData.value.title, year: filmData.value.year});
    showScoreMessage.value="Puntuación agregada con éxito";
  }
  catch(error){
    showScoreMessage.value="Lo siento, se produjo un error. Inténtelo nuevamente"
  } finally{
    setTimeout(()=>{
        showScoreMessage.value="";
    }, 2000)
  }
}

</script>
<template>
  <div v-if="isInList!=undefined" class="container">
    <Menu />
    <div class="poster-container" :style="{'background-image':'url('+filmData.poster+')'}" v-if="filmData.poster!='' && filmData.poster!=null && filmData.poster!='N/A'">
    </div>
    <div class="body">
        <h3 :class="{seen: listType=='Seen', tosee: listType=='toSee'}">{{titleList}}</h3>
        <MovieMainData :filmData="{title: filmData.title, year: filmData.year, runtime: filmData.runtime, imdb_id: filmId, genreTitle: filmData.genreTitle}"/>
      <div class="actions">
        <ProfileMainBtn :type="'change'" :text="'Cambiar de lista'" @doAction="changeList"/>
        <ProfileMainBtn :type="'delete'" :text="'Quitar de mi base'" @doAction="delFromList"/>
      </div>
      <div v-if="filmData.list=='Seen'" class="score-actions">
        <span>{{scoreLabel}}</span> 
        <select v-model="calificacion">
            <option v-for="n in 10" :value=n>{{n}}</option>
        </select>
        <ProfileSecondaryBtn :type="'score'" :text="scoreBtn" @doAction="scoreFilm"/>
        <span v-if="showScoreMessage!=''">{{showScoreMessage}}</span>
      </div>
        <PersonalComments :filmId="filmId"/>
    </div>
      
  </div>
</template>

<style scoped>
.container{
  padding: 10px;
  margin: 0;
  box-sizing: border-box;
}
.poster-container{
  margin: 10px 0 0 0;
  padding: 0;
  height: 250px;
  background-size:contain;
  background-position: center center; 
}
.body{
  padding: 0 10px;
  margin: 0;
}
h3{
  margin-top: 10px;
  text-align: left;
}
h3.seen{
  color: orangered;
}
h3.tosee{
  color: brown;
}
.actions{
  display: flex;
  margin: 10px 0;
  padding: 0;
  justify-content: start;
}
.score-actions{
  margin: 10px 0;
}
</style>