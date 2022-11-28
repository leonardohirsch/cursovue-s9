<script setup>
import { useStore, ref, computed,watch } from '@nuxtjs/composition-api'
import ProfileSecondaryBtn from '@/components/ProfileSecondaryBtn.vue'
const store = useStore();
const props=defineProps({
  filmId:{
        type: String
    },
})
const filmData=computed(()=>{
    return store.state.films.filmsInList.find(item=>item.imdb_id==props.filmId);
})
const input=filmData.value.list=="toSee"? ref(filmData.value.observaciones) : ref(filmData.value.publicReview);

const label=computed(()=>{
    return filmData.value.list=="toSee"? "Observaciones:" : "Reseña personal";
})
const buttonTxt=computed(()=>{
    let text;
    if ((filmData.value.list=="toSee" && (filmData.value.observaciones==null || filmData.value.observaciones=="")) || (filmData.value.list=="Seen" && (filmData.value.publicReview==null || filmData.value.publicReview==""))){
      text="Agregar";
    } else{
      text="Editar"
    }
    return text;
})
const showAlert=ref("");
const errorAlert=ref(false);
const updateComments=async (docId, list)=>{
  try{
    const comments=input.value.length==0? null : input.value;
    await store.dispatch("films/updateComments", {docId:docId, list: list, comments:comments});
    showAlert.value="Comentarios agregados con éxito!";
  }
  catch(error){
    showAlert.value="Lo siento, se produjo un error! Inténtelo nuevamente...";
    errorAlert.value=true;
  } finally{
    setTimeout(()=>{
      showAlert.value="";
      errorAlert.value=false;
    }, 2000)
  }
}

watch(filmData.value, (newfilmData) => {
  input.value= filmData.value.list=="toSee"? filmData.value.observaciones : filmData.value.publicReview;
});
</script>
<template>
  <div class="container">
      <h4>{{label}}</h4>
      <h3 v-if="showAlert!=''" class="show-alert" :class="{erroralert: errorAlert}">{{showAlert}}</h3>
        <textarea class="input" v-model="input"></textarea>
        <div>
          <ProfileSecondaryBtn :type="'sendcomments'" :text="buttonTxt" @doAction="updateComments(filmData.docId, filmData.list)"/>
        </div>
  </div>
</template>

<style scoped>
.container{
  padding: 0;
  margin: 0;
}
h4{
  color: #FFF;
  margin-bottom: 0;
}
h4, h3{
  text-align: left;
}
.input{
  width: 98%;
  height: 100px;
  margin: 0;
  padding: 10px;
}
.erroralert{
  color: red;
}
.show-alert{
  font-size: 0.9rem;
}
@media only screen and (min-width: 600px) {
  .input{
    width: 50%;
  }
}
</style>
