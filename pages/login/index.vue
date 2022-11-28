<script>
export default {
    head() {
        return {
            title: "Mi MuviDb: Ingresar"
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
          if (vm.$store.state.user.user!=null) vm.$router.push({name: "user-home"})    
        })
    }
};
</script>
<script setup>
import { useStore, ref, useRouter } from '@nuxtjs/composition-api'
import Menu from '@/components/Menu.vue'
const store = useStore()
const router = useRouter()

const email=ref("");
const password=ref("");
const errorMessage=ref(null);
const isLogged=ref(false);
const isLoading=ref(false);

const resetFields=()=>{
  email.value=password.value="";

}
const doSignIn= async ()=>{
  isLoading.value=true;
  try{
    await store.dispatch("user/doSignIn",{
      email: email.value,
      password: password.value
    })
      resetFields();
      isLogged.value=true;
  }
  catch(error){
    switch(error.code){
      case "auth/invalid-email":
        errorMessage.value="Debe ingresar un correo electrónico válido";
      break;
      case "auth/user-not-found":
        errorMessage.value="No existe un usuario con ese email";
      break;
      case "auth/wrong-password":
        errorMessage.value="Contraseña incorrecta";
      break;
    }
    
  } finally{
    isLoading.value=false;
    setTimeout(()=>{
            errorMessage.value=null;
        },1500)
  }
}

</script>

<template>
  <div class="container" v-if="!isLogged">
    <Menu />
    <div class="error-message-container" v-show="errorMessage!=null">
        {{errorMessage}}
      </div>
    <form @submit.prevent="doSignIn">
      <div class="auth field">
        <label>Email</label><input type="email" v-model="email" required>
      </div>
      <div class="auth field">
        <label>Password</label><input type="password" v-model="password" required>
      </div>
      <div class="auth submit">
        <button type="submit">Entrar!</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
.container{
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
form{
  width: 50%;
  margin: 50px auto;
  border: 1px solid brown;
  border-radius: 5px;
  background-color: brown;
  padding: 10px;
}
.auth{
  margin-bottom: 10px;
}
.auth.field{
  display: flex;
  flex-direction: column;
  gap:2px
}
.auth.submit{
  margin: 15px 0 10px 0;
}
button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: white;
  font-weight: 700;
}
button:hover{
  color: black;
}
input{
  font-weight: 700;
}
.error-message-container{
    position: absolute;
    padding: 5px;
    top: 300px;
    left: 25%;
    z-index: 100;
    width: 50%;
    text-align: center;
    border: 1px solid red;
    border-radius: 5px;
    color: white;
    background-color: red;
}
</style>