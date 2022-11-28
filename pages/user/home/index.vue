<script>
export default {
    head() {
        return {
            title: "Mi MuviDb: Los films del día"
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
import { useStore, ref, computed, onMounted, set  } from '@nuxtjs/composition-api'
import Carrusel from '@/components/Carrusel.vue'
import ModalFilm from '@/components/ModalFilm.vue'
import Menu from '@/components/Menu.vue'
import Spinner from '@/components/Spinner.vue'
const store = useStore();
const isLoadingProfile=computed(()=>{
    return store.state.user.user==null ? true : false;
})
const isLoadingMovies=ref(true);
const getTodayTimestamp=()=>{
      const todayDate=new Date();
      const anoActual =todayDate.getFullYear();
      const mesActual=todayDate.getMonth();
      const diaActual=todayDate.getDate();
      return new Date(anoActual, mesActual,diaActual).getTime();
}
const todayTimestamp=getTodayTimestamp();
const userFullName=computed(()=>{
      return  store.getters['user/userFullName'];
     });
const userLastLogin=computed(()=>{
      return store.state.user.userData.last_log_in;
     });
const userLastMovieFetch=computed(()=>{
     return store.state.user.userData.last_movie_fetch;
});

const listGenres=[...store.state.films.filmsGenres];
const filmsFetched=ref([]);
const listToShow=ref([]);
const listToSee= computed(()=>{
     return store.getters['films/filmsToSee'];
 })
const listSeen= computed(()=>{
     return store.getters['films/filmsSeen'];
 })
const numGenresToFetch=2;//cantidad de géneros para hacer fetch api
const genresToFetch=[];
const totalGenres=listGenres.length;
const errorsFetched=ref([]);
const screenWidth=ref(null);
const screenHeight=ref(null);
const showQuantity= computed(()=>{
    let showQuantity;
    if (screenWidth.value>=1250){
        showQuantity=7;
    } else if (screenWidth.value>=1100 && screenWidth.value<1250){
        showQuantity=6;
    } else if (screenWidth.value>=930 && screenWidth.value<1100){
        showQuantity=5;
    } else if (screenWidth.value>=821 && screenWidth.value<930){
        showQuantity=4;
    } else if (screenWidth.value>=621 && screenWidth.value<821){
        showQuantity=3;
    } else if (screenWidth.value>=465 && screenWidth.value<621){
        showQuantity=2;
    } else {
        showQuantity=1;
    }
    return showQuantity;
})
const fromNum=ref([]);
const desde=ref(0)
const optionsUnogs = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c5c10d444dmshbc2e4e620bd5565p13fd29jsn86005764d56e',
		'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
	}
};

 //Funciones para fetch desde Api ->Inicio
 //Para producción:
const getRandomGeners = ()=>{
     while (genresToFetch.length<numGenresToFetch){
         let index=Math.floor(Math.random() * totalGenres);
         let genreId=listGenres[index].id;
         let genreTitle=listGenres[index].genre;
         let genreEndpoint=`https://unogs-unogs-v1.p.rapidapi.com/search/titles?type=movie&genre_list=${genreId}`;
          if (!genresToFetch.some(item=>item.id==genreId)){
              genresToFetch.push({id: genreId, title: genreTitle, endpoint:genreEndpoint});
         }
     }
}

//Para producción:
const fetchByGenre= async ()=>{
    await Promise.allSettled(
        genresToFetch.map(genre => fetch(genre.endpoint, optionsUnogs)
        .then(res => res.json())
        .then(json => {
            const resultEdited=json.results.map(film=>{
                return {imdb_id: film.imdb_id, img: film.img, poster: film.poster, runtime: film.runtime, synopsis: film.synopsis, title: film.title, year: film.year}
            })
            filmsFetched.value=[...filmsFetched.value, {genreId: genre.id, genreTitle: genre.title, films: resultEdited}]
            fromNum.value[genre.id]=0;
        })
        .catch(error=> errorsFetched.value.push({genreId: genre.id, genreTitle: genre.title, error: error.message}))
     )
     )
     if (errorsFetched.value.length>0){
         console.log(errorsFetched.value)
     }
    if (filmsFetched.value.length>0){
        store.commit('films/getFilmsFetched', [...filmsFetched.value])
        localStorage.setItem("mimuvidb", JSON.stringify(filmsFetched.value)); //para que tenga películas para ver si cierra sesión y vuelve entrar (y de ese modo no vuelve a hacer fetch->la api tiene un límite máximo de fetchs por día para que sea gratuito, por eso uso LocalStorage)

         //check si movies fetched están en lista personal y actualizar tipo de lista si lo están (en filmsFetched)
         filmsFetched.value.forEach(genre=>{
                    genre.films.forEach(film=>{
                        if (listToSee.value.some(item=>item.imdb_id==film.imdb_id)){
                            store.dispatch("films/updateFetchedFilmsPersonalList", {list:"toSee", genreId: genre.genreId, imdb_id: film.imdb_id});
                        }
                        if (listSeen.value.some(item=>item.imdb_id==film.imdb_id)){
                            store.dispatch("films/updateFetchedFilmsPersonalList", {list:"Seen", genreId: genre.genreId, imdb_id: film.imdb_id});
                        }
                    })
        })
        filmsFetched.value=[...store.state.films.filmsFetched]
        listToShow.value=filmsFetched.value;
         try{
           await store.dispatch("user/updateUserLastFetch",{last_movie_fetch: todayTimestamp})
        }
        catch(error){
          errorMessage.value=error.code;
        }
    }
    isLoadingMovies.value=false;
 }

 //Funciones para fetch desde Api ->final

onMounted(() => {
     const getLastLogin=setInterval(() => {
        if (store.state.films.firebaseChecked==true){
         if (userLastLogin.value!=undefined){
             clearInterval(getLastLogin);

            if (userLastLogin.value!=userLastMovieFetch.value){
                //hacer fetch

                getRandomGeners();
                fetchByGenre();

            } else {
                //usar localstorage si hizo reload
                if(localStorage.getItem("mimuvidb")){
                    filmsFetched.value=JSON.parse(localStorage.getItem("mimuvidb"));
                    store.commit('films/getFilmsFetched', JSON.parse(localStorage.getItem("mimuvidb")))
                    filmsFetched.value.forEach(genre=>{
                       fromNum.value[genre.genreId]=0;
                    })
                    //check si movies fetched están en lista personal y actualizar tipo de lista si lo están (en filmsFetched)
                    filmsFetched.value.forEach(genre=>{
                       genre.films.forEach(film=>{
                           if (listToSee.value.some(item=>item.imdb_id==film.imdb_id)){
                               store.dispatch("films/updateFetchedFilmsPersonalList", {list:"toSee", genreId: genre.genreId, imdb_id: film.imdb_id});
                           }
                           if (listSeen.value.some(item=>item.imdb_id==film.imdb_id)){
                               store.dispatch("films/updateFetchedFilmsPersonalList", {list:"Seen", genreId: genre.genreId, imdb_id: film.imdb_id});
                           }
                       })
                    })
                    filmsFetched.value=[...store.state.films.filmsFetched]
                    listToShow.value=filmsFetched.value;
                    isLoadingMovies.value=false;
                } else{
                    // //hacer fetch si cerró sesión (y por tanto se eliminó el local storage) y entró en el mismo día
                    getRandomGeners();
                    fetchByGenre();
                }
            }
            } 
        } 
     }, 200);
})


const showNext = genreId=>{
    desde.value=fromNum.value[genreId]+showQuantity.value
    fromNum.value[genreId]=fromNum.value[genreId]+showQuantity.value;
}
const showBefore = genreId=>{
    desde.value=fromNum.value[genreId]-showQuantity.value;
    fromNum.value[genreId]=fromNum.value[genreId]-showQuantity.value;
    if (fromNum.value[genreId]<0){
        fromNum.value[genreId]=0;
    }
}

//para evitar window undifined por ser SSR:
const getScreenSize=()=>{
         screenWidth.value=window.innerWidth;
         screenHeight.value=window.innerHeight;
     }
if (process.client) {
    screenWidth.value=window.innerWidth;
    screenHeight.value=window.innerHeight;   
    window.addEventListener("resize", getScreenSize);
}

const removeGetScreenSize=()=>{
    window.removeEventListener("resize", getScreenSize);  
}

const isModalOn=ref(false)
const modalInfo=ref({})
const showModalFunc=(item)=>{
    isModalOn.value=true;
    modalInfo.value=item;
    
}

//tuve que agregar esta función updateListOfFilmFunc con el .set junto con el emit en el componente modal porque de lo contrario el watch del carrusel no parecía responder al cambio de state en el store
const updateListOfFilmFunc=(film)=>{
    const indexOfGenre=listToShow.value.findIndex(item=>item.genreId==film.genreId);
    const indexOfMovie=listToShow.value[indexOfGenre].films.findIndex(item=>item.imdb_id==film.imdb_id);
    let newList;
    switch(film.list) {
        case "toSee":
            newList="Seen"
        break;
        case "Seen":
            newList="toSee"
        break;
        default:
            newList=""
    }
    const filmObj=listToShow.value[indexOfGenre].films[indexOfMovie];
    filmObj.list=newList;
    set(store.state.films.filmsFetched[indexOfGenre].films, [indexOfMovie], filmObj);
}
</script>
<template>
<div class="container" v-if="!isLoadingProfile">
    <Menu />
    <div>
    <h3>Hola {{userFullName}}!</h3>
    <h2>Estos son las films sugeridos del día</h2>
    <div v-if="isLoadingMovies">
        <Spinner />
    </div>
    <div v-else>
    <div v-if="desde=='a'">
         {{desde}}
    </div>
    <ul v-if="listToShow.length>0">
        <li v-for="(genre, index) in listToShow" :key="index">
            <h4 class="genre-title">{{genre.genreTitle}}</h4> 
            <div class="carrusel-container">
                <button v-show="fromNum[genre.genreId]>0" class="arrow_button" @click.prevent="showBefore(genre.genreId)">&lt;</button>
                <button v-show="fromNum[genre.genreId]<=0" class="arrow_button disabled" disabled>&lt;</button>
                <div class="carrusel-inner-container">
                    <Carrusel :list="genre.films" :fromNum="fromNum[genre.genreId]" :showQuantity="showQuantity" :genreId="genre.genreId" :genreTitle="genre.genreTitle" @showModal="showModalFunc" />
                </div>
                <button v-show="genre.films.length>(fromNum[genre.genreId]+showQuantity)" class="arrow_button" @click.prevent="showNext(genre.genreId)">&gt;</button>
            </div>            
        </li>
    </ul>

    <div class="modal" v-show="isModalOn==true">
        <div class="modal-top">
        </div>
        <div class="modal-content">
            <div><span class="close-btn" @click="isModalOn=false">&times;</span></div>
          <ModalFilm :modalInfo="modalInfo"  @changeListOfFilm="updateListOfFilmFunc" />
        </div>

    </div>
</div>
</div>
</div>

</template>
<style scoped>
.container{
    margin: 0;
    box-sizing: border-box;
    padding: 10px;
    color:#fff
}
h2, h3{
    text-align: center;
}
ul{
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
li{
    margin:0 0 30px;
}
.genre-title{
    margin: 0;
    padding: 0;
    font-size: 1rem;
}
.carrusel-container{
    display: flex;
    margin: auto;
    padding: 0;
}
.carrusel-inner-container{
    margin: 0;
    position: relative;
    z-index: 10;
}
.arrow_button{
    position: relative;
    z-index: 10;
    background-color: rgba(26, 26, 26, 0.679); /* Black w/ opacity */
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
}
.arrow_button.disabled{
    color:rgba(26, 26, 26, 0.679);
    cursor:none;
}
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.7);
  
}
.modal-top{
    padding: 5px;
    color: #fff;
    width: 90%;
    margin: 5px auto;
    background-color: rgba(0,0,0,0.7);
}
.modal-content {
  background-color: #fefefe;
  margin: 20px auto 20px;
  padding: 0;
  border: 1px solid #888;
  width: 90%;
  background-color: #111010;
}
.close-btn {
  color: lightsalmon;
  float: right;
  font-size: 35px;
  font-weight: bold;
  text-shadow: 1px 1px 2px black;
  padding: 10px;
}
.close-btn:hover{
  color: brown;
  text-decoration: none;
  cursor: pointer;
}

@media only screen and (max-width: 464px) {
    ul{
        width: 60%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 500px) and (max-width: 549px) {
    ul{
        width: 90%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 550px) and (max-width: 619px) {
    ul{
        width: 70%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 700px)  and (max-width: 821px) {
    .carrusel-container{
        justify-content: space-between;
    }
    ul{
        width: 80%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 822px) and (max-width: 929px) {
    .carrusel-container{
        justify-content: space-between;
    }
    ul{
        width: 95%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 955px) and (max-width: 1000px) {
    ul{
        width: 95%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1000px) and (max-width: 1070px) {
    ul{
        width: 90%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1071px) and (max-width: 1099px) {
    ul{
        width: 85%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1105px) and (max-width: 1130px) {
    ul{
        width: 100%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1131px) and (max-width: 1180px) {
    ul{
        width: 95%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1181px) and (max-width: 1250px) {
    ul{
        width: 90%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1350px) {
    ul{
        width: 95%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 1450px) {
    ul{
        width: 80%;
        margin: 0 auto;
    }
}
@media only screen and (min-width: 650px) {
    .modal-content{
        width: 80%;
        margin: 0 auto;
    }
    .modal-top{
        width: 80%; 
    }
}
@media only screen and (min-width: 1000px) {
    .modal-content{
        width: 60%;
        margin: 0 auto;
    }
    .modal-top{
        width: 60%; 
    }
}
</style>