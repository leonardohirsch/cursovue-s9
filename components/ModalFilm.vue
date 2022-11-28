<script setup>
import { db } from "../plugins/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useStore, useRouter, ref, computed } from '@nuxtjs/composition-api'
import FilmReview from '@/components/FilmReview.vue'
import MovieMainData from '@/components/MovieMainData.vue'
import ProfileMainBtn from '@/components/ProfileMainBtn.vue'
import ProfileSecondaryBtn from '@/components/ProfileSecondaryBtn.vue'
const store = useStore();
const router = useRouter()
const props=defineProps({
  modalInfo:{
        type: Object
    }
})

const emit=defineEmits(["changeListOfFilm"]);

const useruid=store.state.user.user.uid;
 const list=ref("")
 const inListToSee= computed(()=>{
     let inList=false;
     if (store.getters['films/filmsToSee'].some(item=>item.imdb_id==props.modalInfo.imdb_id)){
       inList=true;
       list.value="toSee"
     }
     return inList;
 })
 const inListSeen= computed(()=>{
     let inList=false;
     if (store.getters['films/filmsSeen'].some(item=>item.imdb_id==props.modalInfo.imdb_id)){
       inList=true;
       list.value="Seen"
     }
     return inList;
 })

const addInList= async (list, movieData) =>{
  try{
    await store.dispatch("films/addFilmToList", {
      list: list,
      movieData: {...movieData},
    });
  }
  catch(error){
    console.log(error)
  }
}

const delFromList= async (id) =>{
  const docId=store.state.films.filmsInList.find(item=>item.imdb_id==id).docId;
  try{
    await store.dispatch("films/delFilmFromList", docId);
  }
  catch(error){
    console.log(error)
  }
}
const changeList = async (id) =>{
  const docRef=store.state.films.filmsInList.find(item=>item.imdb_id==id);
  const docId=docRef.docId;
  const list=docRef.list;
  try{
    await store.dispatch("films/changeList", {docId:docId, list: list});
  }
  catch(error){
    console.log(error)
  }
}

const goToMyMoviePage=(id)=>{
  router.push({ path: '../../user/mymovies/'+id });
}

const filmsWithReview= computed(()=>{
    let has=false;
     if (store.state.films.publicReviews.some(item=>item.imdb_id==props.modalInfo.imdb_id)){
      has=true;
     }
     return has;
 })

 const filmReviews= computed(()=>{
     return store.state.films.publicReviews.filter(item=>item.imdb_id==props.modalInfo.imdb_id)
 })

const reviewsAlert=ref(false)
const reviewsAlertMessage=ref("")

const loadPublicReviews=async ()=>{
  const collectionRef = collection(db, "filmsInList");
  const q = query(collectionRef, where("userId", "!=", useruid), where("imdb_id", "==", props.modalInfo.imdb_id), limit(3));
  const getDocuments =await getDocs(q);
  const localCopy=[];
  getDocuments.forEach((doc)=>{
    localCopy.push(doc.data())
  })
  return localCopy;
}
const findReviews=()=>{
loadPublicReviews()
  .then(res=>{
    if (res.length>0){
      res.forEach(film=>{
        if (film.publicReview!=null && film.publicReview!=''){
          store.dispatch("films/addPublicReview", {imdb_id: props.modalInfo.imdb_id, review: film.publicReview})
        }
      })
    } else{
      reviewsAlert.value=true;
      reviewsAlertMessage.value="Lo siento, no encontramos reseñas"
    }
  })
  .catch(error=>{
    console.log(error)
    reviewsAlert.value=true;
    reviewsAlertMessage.value="Lo siento, se produjo un error, intente nuevamente"
  })
  .finally(
    setTimeout(()=>{
      reviewsAlert.value=false;
      reviewsAlertMessage.value=""
    }, 1000)
  )
}
</script>
<template>
  <div class="container">
    <div class="poster-container" :style="{'background-image':'url('+props.modalInfo.poster+')'}" v-if="props.modalInfo.poster!='N/A' && props.modalInfo.poster!=null  && props.modalInfo.poster!=''">
    </div>
    <div class="body">
      <MovieMainData :filmData="{title: props.modalInfo.title, year: props.modalInfo.year, runtime: props.modalInfo.runtime, imdb_id: props.modalInfo.imdb_id, genreTitle: props.modalInfo.genreTitle}"/>
      <div class="actions">
        <ProfileMainBtn v-if="!inListToSee && !inListSeen" :type="'tosee'" :text="'Agregar a para Ver'" @doAction="addInList('toSee', props.modalInfo);$emit('changeListOfFilm',{imdb_id:props.modalInfo.imdb_id, list:'Seen', genreId: props.modalInfo.genreId});"/>         
        <ProfileMainBtn v-if="inListToSee" :type="'tosee'" :text="'Mi registro en para Ver'" @doAction="goToMyMoviePage(props.modalInfo.imdb_id)"/> 
        <ProfileMainBtn v-if="!inListSeen && !inListToSee" :type="'seen'" :text="'Agregar a Vistas'" @doAction="addInList('Seen', props.modalInfo);$emit('changeListOfFilm',{imdb_id:props.modalInfo.imdb_id, list:'toSee', genreId: props.modalInfo.genreId});"/>  
        <ProfileMainBtn v-if="inListSeen" :type="'seen'" :text="'Mi registro en Vista'" @doAction="goToMyMoviePage(props.modalInfo.imdb_id)"/>
        <ProfileMainBtn v-if="inListToSee || inListSeen" :type="'change'" :text="'Cambiar de lista'" @doAction="changeList(props.modalInfo.imdb_id); $emit('changeListOfFilm',{imdb_id:props.modalInfo.imdb_id, list:list, genreId: props.modalInfo.genreId})"/>
        <ProfileMainBtn v-if="inListToSee || inListSeen" :type="'delete'" :text="'Quitar de mi base'" @doAction="delFromList(props.modalInfo.imdb_id); $emit('changeListOfFilm',{imdb_id:props.modalInfo.imdb_id, list:'', genreId: props.modalInfo.genreId});"/>
      </div>
      <div class="info-description">
        {{props.modalInfo.synopsis}}
      </div>
      <div class="reviews-section">
        <div class="reviews-container" v-if="filmsWithReview">
          <ul class="reviews-list">
            <li v-for="(review, index) in filmReviews" :key="index">
              <FilmReview :review="review.review" />
            </li>
          </ul>
        </div>
        <div class="reviews-alert" v-if="reviewsAlert">{{reviewsAlertMessage}}</div>
        <ProfileSecondaryBtn v-if="!filmsWithReview" :type="'findreview'" :text="'Buscar reseñas'" @doAction="findReviews"/>
      </div>
    </div>
      
  </div>
</template>
<style scoped>
.container{
 padding: 0;
 margin: 0;
}
.poster-container{
  margin: 0;
  padding: 0;
  height: 200px;
  background-size:contain;
  background-position: center center; 
}
.body{
  padding: 0 10px;
  margin: 0;
}
.actions{
  display: flex;
  gap: 10px;
  margin: 10px 0;
}
.info-description{
  font-size: 1rem;
  margin: 10px 0;
}
.reviews-alert{
  margin: 10px;
  color: red;
}
ul{
  list-style: none;
}
li{
  text-align: center;
  margin-bottom: 5px;
}
</style>
