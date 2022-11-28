<script>
export default {
    head() {
        return {
            title: "Mi MuviDb: Registrarse"
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
const userFirstName=ref("");
const userLastName=ref("");
const errorMessage=ref(null);
const successMessage=ref(null);
const isLoading=ref(false);

const resetFields=()=>{
  email.value=password.value="";

}
const doSignUp= async ()=>{
  isLoading.value=true;
  try{
    await store.dispatch("user/doSignUp",{
      email: email.value,
      password: password.value,
      userFirstName: userFirstName.value,
      userLastName: userLastName.value
    })
    await store.dispatch("user/createUserProfile",{
      userFirstName: userFirstName.value,
      userLastName: userLastName.value
    })
    successMessage.value="Registración exitosa! Bienvenid@!";
    resetFields();
    setTimeout(()=>{
      router.push({ path: 'user/home/' }); 
    }, 1600);
  }
  catch(error){
    switch(error.code){
      case "auth/invalid-email":
        errorMessage.value="Debe ingresar un correo electrónico válido";
      break;
      case "auth/email-already-in-use":
        errorMessage.value="Ya existe un usuario con ese email";
      break;
      case "auth/internal-error":
        errorMessage.value="Debe ingresar una contraseña correcta";
      break;
      case "auth/weak-password":
        errorMessage.value="Debe ingresar una contraseña correcta";
      break;
    }
  } finally{
    isLoading.value=false;
    setTimeout(()=>{
            errorMessage.value=null;
            successMessage.value=null;
        },1500)
  }
}
</script>

<template>
  <div class="container">
    <Menu />
    <div class="message-container error" v-show="errorMessage!=null">
        {{errorMessage}}
    </div>
    <div class="message-container success" v-show="successMessage!=null">
        {{successMessage}}
    </div>
    <form @submit.prevent="doSignUp">
      <div class="auth field">
        <label>Nombres</label><input type="text" v-model="userFirstName" required>
      </div>
      <div class="auth field">
        <label>Apellidos</label><input type="text" v-model="userLastName" required>
      </div>
      <div class="auth field">
        <label>Email</label><input type="email" v-model="email" required>
      </div>
      <div class="auth field">
        <label>Password</label><input type="password" v-model="password" required>
      </div>
      <div class="auth submit">
        <button type="submit">Crear cuenta!</button>
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
.message-container{
    position: absolute;
    margin: 0;
    padding: 5px;
    top: 400px;
    left: 25%;
    z-index: 100;
    width: 49%;
    text-align: center;
    border-radius: 5px;
    color: white;
}
.message-container.error{
    border: 1px solid red;
    background-color: red;
}
.message-container.success{
  border: 1px solid green;
  background-color: green;
}
</style>