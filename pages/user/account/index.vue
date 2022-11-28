<script>
export default {
    head() {
        return {
            title: "Mi MuviDb: Mis datos"
        };
    },
};
</script>
<script setup>
import { useStore, ref } from '@nuxtjs/composition-api'
import Menu from '@/components/Menu.vue'
import { getAuth, updatePassword } from "firebase/auth";

const store = useStore()
const errorMessage=ref(null);
const successMessage=ref(null);
const user=ref(store.state.user.user)
const userData=ref(store.state.user.userData)
const userFirstName=ref(userData.value.nombres);
const userLastName=ref(userData.value.apellidos);
const newPassword=ref("");
const auth = getAuth();

const authUser = auth.currentUser;

const updateUserData= async ()=>{
  if (newPassword.value=="" || (newPassword.value!="" && newPassword.value.length>=6)){
    try{
      await store.dispatch("user/doUpdateUserAccount",{
        userFirstName: userFirstName.value,
        userLastName: userLastName.value
      })
      updatePassword(authUser, newPassword.value).then(() => {
        successMessage.value="Datos actualizados con éxito!";
      }).catch((error) => {
        errorMessage.value="Se produjo un error con la contraseña: "+error;
      });
    }
    catch(error){
      errorMessage.value=error.code;
    } finally{
      setTimeout(()=>{
            errorMessage.value=null;
            successMessage.value=null;
        },1500)
    }
  } else if(newPassword.value!="" && newPassword.value.length<6){
    errorMessage.value="La contraseña debe tener al menos seis caracteres";
    setTimeout(()=>{
            errorMessage.value=null;
        },1500)
  }
  }
</script>

<template>
  <div class="container" v-if="user!=null && userData.nombres!=null && userData.apellidos!=null">
    <Menu />
    <div class="message-container error" v-show="errorMessage!=null">
        {{errorMessage}}
    </div>
    <div class="message-container success" v-show="successMessage!=null">
        {{successMessage}}
    </div>
    <form @submit.prevent="updateUserData">
      <div class="auth field">
        <label>Nombres</label><input type="text" v-model="userFirstName" required>
      </div>
      <div class="auth field">
        <label>Apellidos</label><input type="text" v-model="userLastName" required>
      </div>
      <div class="auth field">
        <label>Email</label><input type="email" :value="user.email" disabled>
      </div>
      <div class="auth field">
        <label>Nuevo Password</label><input type="password" v-model="newPassword">
      </div>
      <div class="auth submit">
        <button type="submit">Actualizar mis datos!</button>
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