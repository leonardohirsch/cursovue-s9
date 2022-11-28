<script setup>
import { db } from "../plugins/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useStore, useRouter, useRoute, ref, computed,onMounted } from '@nuxtjs/composition-api'
import FilmReview from '@/components/FilmReview.vue'
import ProfileMainBtn from '@/components/ProfileMainBtn.vue'
const store = useStore();
const router = useRouter();
const route = useRoute();
const pageName=ref(route.value.name)
const props=defineProps({
    film:{
        type: Object,
    },
    from:{
        type: String,
    }
})
const filmData=ref();
const notInList= computed(()=>{
    let val;
    if (props.film.list==''){
      val=true;
    } else{
      val=false;
     }
     return val;
 })
 const isToSee= computed(()=>{
    let val;
    if (props.film.list==''){
      val=false;
    } else{
      val=props.film.list=="toSee"? true : false;
     }
     return val;
 })

 const isSeen= computed(()=>{
    let val;
    if (props.film.list==''){
      val=false;
    } else{
      val=props.film.list=="Seen"? true : false;
     }
     return val;
 })
 const listTitle= computed(()=>{
    let val;
    if (props.film.list==''){
      val=false;
    } else{
      val=props.film.list=="toSee"? "Films para ver" : "Films ya vistos";
     }
     return val;
 })
const filmsWithReview= computed(()=>{
    let has=false;
     if (store.state.films.publicReviews.some(item=>item.imdb_id==props.film.imdb_id)){
      has=true;
     }
     return has;
 })

 const filmReviews= computed(()=>{
     return store.state.films.publicReviews.filter(item=>item.imdb_id==props.film.imdb_id)
 })

const useruid=store.state.user.user.uid;

const loadPublicReviews=async ()=>{
  const collectionRef = collection(db, "filmsInList");
  const q = query(collectionRef, where("userId", "!=", useruid), where("imdb_id", "==", props.film.imdb_id), limit(5));
  const getDocuments =await getDocs(q);
  const localCopy=[];
  getDocuments.forEach((doc)=>{
    localCopy.push(doc.data())
  })
  return localCopy;
}

onMounted(() => {
    if (!filmsWithReview.value){
        loadPublicReviews()
        .then(res=>{
          if (res.length>0){
            res.forEach(film=>{
              if (film.publicReview!=null && film.publicReview!=''){
                store.dispatch("films/addPublicReview", {imdb_id: props.film.imdb_id, review: film.publicReview})
              }
            })
          }
        })
        .catch(error=>{
          console.log(error)
        })
    }
})

const addInList= async (list, movieData) =>{
  try{
    await store.dispatch("films/addFilmToList", {
      list: list,
      movieData: {...movieData},
    });
    router.push({ path: '../../user/mymovies/'+movieData.imdb_id });
  }
  catch(error){
    console.log(error)
  }
}

const goToMyMoviePage=(id)=>{
  router.push({ path: '/user/mymovies/'+id });
}
</script>
<template>
    <div class="list-item-container" :class="{seen: isSeen, tosee: isToSee, notinlist: notInList}">
      <h3 v-if="!notInList">{{listTitle}}</h3>
      <h3 v-else>Muvi no agendada</h3>
      <h2>{{props.film.title}}</h2>
      <div class="list-item-detalle">
          <div class="item-image-container" v-if="props.film.poster!='' && props.film.poster!=null && props.film.poster!='N/A'">
              <img :src="props.film.poster" class="item-image-img">
          </div>
          <div class="item-details-container">
              <span v-if="props.from=='best'"><label class="label">Calificación Promedio:</label> {{props.film.calificacion_prom}}</span>
              <span v-if="props.from=='best'"><label class="label">Votos Totales:</label> {{props.film.votes}}</span>
              <span><label class="label">Año:</label> {{props.film.year}}</span>
              <span><label class="label">Género:</label> {{props.film.genreTitle}}</span>
              <span><label class="label">Duración:</label> {{parseInt(props.film.runtime/60)}} min</span>
              <span v-if="!notInList && isSeen && props.film.calificacion!=null"><label class="label">Tu calificacion:</label> {{props.film.calificacion}}</span>
              <p v-if="pageName=='user-mymovies'" class="item-details-description-p">
                {{props.film.synopsis}}
              </p>
          </div>
      </div>
      <div v-if="pageName=='user-bestmovies'" class="item-details-description-div">
                  {{props.film.synopsis}}
      </div>
              <div class="reviews-container" v-if="filmsWithReview">
                <h3>Reseñas de otros usuarios</h3>
                <ul>
                  <li v-for="(review, index) in filmReviews" :key="index">
                    <FilmReview :review="review.review" />
                  </li>
                </ul>
              </div>
              <div v-if="!notInList" class="ver-detalle-container">
                <ProfileMainBtn :type="'gotopage'" :text="'Ver Detalle'" @doAction="goToMyMoviePage(props.film.imdb_id)"/>
              </div>
              <div v-if="notInList" class="add-btn-container" >
                <ProfileMainBtn :type="'tosee'" :text="'Agregar a para Ver'" @doAction="addInList('toSee', {title:props.film.title, imdb_id:props.film.imdb_id, synopsis:props.film.synopsis, year:props.film.year, poster:props.film.poster, runtime:props.film.runtime, genreId: props.film.genreId, genreTitle: props.film.genreTitle});"/>        
                <ProfileMainBtn :type="'seen'" :text="'Agregar a Vistas'" @doAction="addInList('Seen', {title:props.film.title, imdb_id:props.film.imdb_id, synopsis:props.film.synopsis, year:props.film.year, poster:props.film.poster, runtime:props.film.runtime, genreId: props.film.genreId, genreTitle: props.film.genreTitle});"/> 
              </div>
    </div>
  </template>
<style scoped>
.list-item-container{
  min-width: 210px;
  padding: 1rem;
  margin: 1rem auto;
  text-align: left;
  border-radius: 10px;
}
.list-item-detalle{
    display: flex;
    flex-direction: column;
    gap: 20px
}
h2{
  margin: 15px 0;
}
h3{
  margin: 0 0 10px;
}
.item-details-container{
    display: flex;
    flex-direction: column;
    gap:10px;
    padding: 0;
    margin: 0;
}
.item-details-description-div{
    margin: 20px 0;
    padding: 0;
}
.item-details-description-p{
    margin: 0;
    padding: 0;
}
.item-image-img{
    width: 100%;
    margin: 0;
    border: 1px solid black;
}
.item-image-container{
  display: flex;
  align-items: center;
}
.seen{
  background-color: orangered;
 
}
.tosee{
  background-color: brown;
}
.notinlist{
    background-color: salmon;  
}
a {
  display: block;
  color: #f9d81cda;
  text-decoration: none;
  margin-top: 1rem;
}
label{
    font-weight: bold;
}
.add-btn-container{
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
.ver-detalle-container{
  margin-top: 20px;
}
.reviews-container{
  margin-top: 20px;
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
li{
  text-align: center;
  margin: 0  0 5px 0;
  padding: 0;
}
@media only screen and (min-width: 550px) {
  .list-item-detalle{
    flex-direction: row;
    gap: 20px;
  }
  .item-image-img{
    width: auto;
    max-height: 180px;
    max-width: 135px;
  }
  .list-item-container{
    width: 60%;
    }
  }
@media only screen and (max-width: 549px) {
  .item-image-img{
    max-width: 280px;
  }
  .list-item-container{
    max-width: 280px;
  }
}
</style>
