<script setup>
import { useStore, ref, computed, watch } from '@nuxtjs/composition-api'
const store = useStore();
const props=defineProps({
  list:{
        type: Array
    },
  fromNum:{
    type: Number
  },
  showQuantity:{
    type: Number
  },
  genreId:{
    type: Number
  },
  genreTitle:{
    type: String
  },
})
const emit=defineEmits(["showModal"]);

const indexOfGenre= computed(()=>{
  return store.state.films.filmsFetched.findIndex(item=>item.genreId==props.genreId)
})

const listToShowRef=ref(store.state.films.filmsFetched[indexOfGenre.value].films.slice(props.fromNum, props.fromNum+props.showQuantity)) //no lo seteo como computed porque luego vue dice que computed es solo para lectura (cuando lo modifico con el watch)

watch(() => store.state.films.filmsFetched[indexOfGenre.value].films.slice(props.fromNum, props.fromNum+props.showQuantity),
  (newValue, oldValue) => {
  listToShowRef.value=newValue;
  },
  { deep: true}
);

</script>
<template>
  <div class="list_container">
      <div v-for="(item, index) in listToShowRef" :key="index" class="list_item">
        <span class="app_logo">MMDB</span>
        <div class="item_info seen" v-if="item.list=='Seen'">Mi Lista de vistas</div>
        <div class="item_info tosee" v-if="item.list=='toSee'">Mi Lista para ver</div>
        <img :src="item.img" class="item_img"  @click="$emit('showModal',{title:item.title, imdb_id:item.imdb_id, synopsis:item.synopsis, year:item.year, poster:item.poster, runtime:item.runtime, genreId: props.genreId, genreTitle: props.genreTitle, list:item.list});" >
      </div>
  </div>

</template>
<style scoped>
.list_container{
 padding: 0;
 display: flex;
 justify-content:start;
 gap: 0.2rem
}
.list_item{
  position: relative;
  margin: 0;
  padding: 0;
  text-align: center;
}
.item_info{
  margin: 0 auto;
  padding: 4px;
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  z-index: 1;
  background-color: brown;
  color: #fff;
  text-align: center;
  border: 2px dotted black;
}
.item_info.tosee{
  background-color: brown;
}
.item_info.seen{
  background-color: orangered;
}
.item_img{
  box-sizing: content-box;
  height:100%;
  margin: 0;
  cursor: pointer;
  border: 1px solid transparent;
}
.item_img:hover{
  border-color: #FFF;
}
.app_logo{
  position: absolute;
  top: 5px;
  right: 2px;
  z-index: 1;
  color: lightsalmon;
  font-weight: bold;
  font-size: 1.3rem;
  border: 1px dotted white;
  text-shadow: 1px 1px 2px black;
}
@media only screen and (max-width: 639px) {
    .list_container{
      gap: 1.3rem;
    }
}
@media only screen and (min-width: 640px) and (max-width: 700px) {
    .list_container{
      gap: 1.9rem;
    }
}
</style>
