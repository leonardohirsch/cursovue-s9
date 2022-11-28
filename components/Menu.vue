<script setup>
import { useStore, useRoute, ref, computed } from '@nuxtjs/composition-api'
const route = useRoute();
const pageName=ref(route.value.name)
const store = useStore();
const isLogged=computed(()=>{
    return store.state.user.user;
})
const showMenu=ref(false)
const showMenuOptions=()=>showMenu.value=!showMenu.value;
const buttonSign=computed(()=>{
  return showMenu.value==false? "..." : "x";
})
</script>
<template>
    <div class="container" >
        <div class="menu-logo-more">
          <NuxtLink :to="'/'" class="app_logo">
            MMDB
          </NuxtLink>
          <div class="menu-user-desktop">
            <NuxtLink :to="'/user/home'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
              Films del día
            </NuxtLink>
            <NuxtLink :to="'/user/mymovies'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
              Mis Muvis
            </NuxtLink>
            <NuxtLink :to="'/user/bestmovies'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
              Best Muvis
            </NuxtLink>
            <NuxtLink v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')" :to="'/user/account'">
                Mis Datos
            </NuxtLink>
            <NuxtLink v-if="store.state.user.userData.role=='admin' && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')" :to="'/admin'">
                Admin
            </NuxtLink>
            <NuxtLink :to="'/logout'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
                Salir
            </NuxtLink>
            <NuxtLink :to="'/register'" v-if="!isLogged">
              Registrarse
          </NuxtLink>
            <NuxtLink :to="'/login'" v-if="!isLogged">
                Login
            </NuxtLink>
          </div>
          <button v-show="!showMenu" class="show-hide-btn" @click="showMenuOptions">{{buttonSign}}</button>
        </div>

        <div class="menu-user-mobile" v-show="showMenu">
          <NuxtLink :to="'/user/home'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
            Films del día
          </NuxtLink>
          <NuxtLink :to="'/user/mymovies'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
            Mis Muvis
          </NuxtLink>
          <NuxtLink :to="'/user/bestmovies'"  v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')">
            Best Muvis
          </NuxtLink>
          <NuxtLink v-if="isLogged && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')" :to="'/user/account'">
                Mis Datos
            </NuxtLink>
          <NuxtLink v-if="store.state.user.userData.role=='admin' && (pageName=='index' || pageName=='user-account' || pageName=='user-home' || pageName=='user-mymovies' || pageName=='user-mymovies-id' || pageName=='user-bestmovies' || pageName=='admin')" :to="'/admin'">
              Admin
          </NuxtLink>
          <NuxtLink :to="'/logout'"  v-if="isLogged">
              Salir
          </NuxtLink>
          <NuxtLink :to="'/register'" v-if="!isLogged">
              Registrarse
          </NuxtLink>
          <NuxtLink :to="'/login'" v-if="!isLogged">
              Login
          </NuxtLink>
          <button v-show="showMenu" class="show-hide-btn" @click="showMenuOptions">{{buttonSign}}</button>
        </div>
    </div>
  </template>
<style scoped>
.container{
  position: relative;
  width: 100%;
  padding: 0 0 5px;
  margin: 0 auto 10px;
  color: #FFF;
  font-size: 1.3rem;
  align-items: center;
  border-bottom: 1px solid brown;
}
.menu-logo-more{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.menu-user-mobile{
  position: absolute;
  width: 100%;
  height: fit-content;
  z-index: 1000;
  top: 0;
  padding: 15px 0 20px 0;
  margin: 0;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
}
.menu-user-desktop { display:none; }
a{
  color: #FFF;
  text-decoration: none;
}
a:hover{
  color: lightsalmon;
}
a.nuxt-link-active {
  color: lightsalmon;
}
.app_logo{
  font-size: 1.5rem;
  padding: 5px;
  margin: 0;
  border: 1px dotted white;
}
a.app_logo:hover{
  color: #FFF;
}
.show-hide-btn{
  height: fit-content;
  margin: 0;
  background: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  border: none;
  cursor: pointer;
}
.show-hide-btn:hover{
  color: salmon;
}

@media only screen and (min-width: 730px) {  
  .container{
    flex-direction: row;
    justify-content: space-between;
  }
  .menu-user-desktop{
    display: flex;
    gap: 15px;
    flex-direction: row;
    justify-content: space-between; 
  }
  .app_logo{
    margin: 0;
  }
  .show-hide-btn { display: none; }
  .menu-user-mobile{display: none;}
}
</style>
