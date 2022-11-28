<script>
export default {
    head() {
        return {
          title: "Mi MuviDb: Zona Admin"
        };
      },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            if (vm.$store.state.user.user==null || (vm.$store.state.user.user!=null && vm.$store.state.user.userData.role!='admin') ){
                vm.$router.push({name: "login"})
            }  
        })
    }
};
</script>
<script setup>
import { db } from "../../plugins/firebase";
import { doc, updateDoc, getDocs, collection, query, orderBy, where } from "firebase/firestore";
import { ref, onMounted } from '@nuxtjs/composition-api'
import Menu from '@/components/Menu.vue'

const usersList=ref([]);
const errorMessage=ref(null);
const getListUSers= async()=>{
    try {
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("role", "==", 'user'), orderBy("apellidos", "asc"), orderBy("nombres", "asc"));
            const getDocuments =await getDocs(q);
            getDocuments.forEach((doc)=>{
            usersList.value.push({uid: doc.id, ...doc.data() })
            })
    }
    catch (e) {
      console.log(e)
    }
}

const changeUserStatus =async (newStatus, uid) =>{
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {status: newStatus})
    .then(
        ()=>{
        const indexOfUSer=usersList.value.findIndex(user=>user.uid==uid);
        usersList.value[indexOfUSer].status=newStatus;
        }
    )
    .catch(error=> {
        errorMessage.value="Lo siento, se produjo un error, la acción no se pudo ejecutar.";
        setTimeout(()=>{
            errorMessage.value=null;
        },1500)
    })
}
onMounted(() => {
    getListUSers();
})

</script>
<template>
<div class="container">
    <Menu />
    <div class="error-message-container" v-if="errorMessage!=null">
            {{errorMessage}}
    </div>
    <table v-if="usersList.length>0">
        <tr class="table-titles">
            <th>Usuario</th>
            <th>Status</th>
            <th>Acción</th>
        </tr>
        <tr v-for="(user, index) in usersList" :key="index">
            <td>{{user.apellidos}} {{user.nombres}}</td>
            <td>
                <span  v-if="user.status==0" class="user_activate span">Activo</span>
                <span  v-if="user.status==1" class="user_delete span">Bloqueado</span>
            </td>
            <td>
                <button v-if="user.status==0" @click="changeUserStatus(1, user.uid)" class="user_delete btn">Bloquear</button>
                <button v-if="user.status==1" @click="changeUserStatus(0, user.uid)" class="user_activate btn">Reactivar</button>
            </td>  
        </tr>
    </table>
</div>

</template>
<style scoped>
.container{
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    color:#fff;
    text-align: center;
}
ul{
  list-style: none;
  margin: 0 auto;
  padding: 0;
}
.user_activate {
    color: greenyellow;
}
.user_delete {
    color: red;
}
table{
    width: 70%;
    margin: 20px auto;
}
td{
    padding: 3px;
}
.table-titles{
    background-color: #fff;
    color: black;
}
.error-message-container{
    position: absolute;
    padding: 5px;
    top: 200px;
    left: 25%;
    z-index: 100;
    width: 50%;
    text-align: center;
    border: 1px solid red;
    border-radius: 5px;
    color: white;
    background-color: red;
}
button{
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 1rem;
}
</style>