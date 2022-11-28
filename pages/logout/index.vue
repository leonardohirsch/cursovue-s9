<script setup>
import { useStore, useRouter,onMounted } from '@nuxtjs/composition-api'
const store = useStore()
const router = useRouter()

const logOut=async()=>{
  try{
    await store.dispatch("user/doSignOut");
    localStorage.removeItem("mimuvidb");
    localStorage.removeItem("mimuviAuth");
    commit("resetLists");
    router.push({ path: '/' })
  }
  catch(error){
    router.push({ path: '/' })
  }

}

onMounted(() => {
  logOut();  
})

</script>
<template>
  <div>
    
  </div>
</template>