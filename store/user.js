import { app } from "../plugins/firebase";
import { db } from "../plugins/firebase";
import { doc, setDoc,getDoc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile, onAuthStateChanged  } from "firebase/auth";
const auth = getAuth();

const getTodayTimestamp=()=>{
      const todayDate=new Date();
      const anoActual =todayDate.getFullYear();
      const mesActual=todayDate.getMonth();
      const diaActual=todayDate.getDate();
      return new Date(anoActual, mesActual,diaActual).getTime();
}

const loadFirebaseList=async (colection, field, find)=>{
  const collectionRef = collection(db, colection);
  const q = query(collectionRef, where(field, "==", find));
  const getDocuments =await getDocs(q);
  const localCopy=[];
  getDocuments.forEach((doc)=>{
    localCopy.push(doc.data())
  })
  return localCopy;
}

export const state = () => ({  
    user: null,
    userData: {nombres:null, apellidos:null},
  }
  )
  
  export const mutations = {
    setUser(state, user) {
      state.user=user;
    },
    setUserData(state, user) {
      state.userData=user;
    }
  }

  export const getters = {
    userFullName(state) {
      return state.userData.nombres + " " + state.userData.apellidos;
    },
  }
  
  export const actions = {
    checkAuth({commit, state, dispatch}){
      onAuthStateChanged(auth, user => {
        if (user){
          const authUser=auth.currentUser;
          commit("setUser", authUser);
          
          if (state.userData.apellidos==null && state.userData.nombres==null){
              const getUserData= async ()=>{
              const docRef = doc(db, "users", authUser.uid);
              const docSnap = await getDoc(docRef);
              const userData = {...docSnap.data()};
              commit("setUserData", userData);
              if (userData.status!=0) {
                this.app.router.push({name: "user-bloqueados"})
              } else{
              //Fetch movies en listas de usuario
              let numPersonalFilms;
              await dispatch('loadPersonalList', {colection: "filmsInList", field: "userId", find: authUser.uid})
              .then (res =>numPersonalFilms=res)
              return {userData:userData, numPersonalFilms:numPersonalFilms};
              }
            }
            let checkAuthObj;
            getUserData()
            .then(res=>checkAuthObj=res)
            return checkAuthObj;
          }
        } else {
          commit("setUserData", {nombres:null, apellidos:null})
          commit("setUser", null)
          this.app.router.push('/login')
        }
      });
    },
    async doSignIn({commit, dispatch, state}, {email, password}){
      await signInWithEmailAndPassword(auth, email, password);
      const user=auth.currentUser;
      commit("setUser", user);
      const timestamp=getTodayTimestamp();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const userData = {...docSnap.data()};
      commit("setUserData", userData)
      await updateDoc(docRef, {last_log_in: timestamp})
      localStorage.setItem("mimuviAuth", timestamp);
      if (userData.status!=0) {
        this.app.router.push({name: "user-bloqueados"})
      } else{
      //Fetch movies en listas de usuario
      await dispatch('loadPersonalList', {colection: "filmsInList", field: "userId", find: user.uid});
      this.app.router.push({name: "user-home"})
      }
    },
    async doSignUp({commit}, {userFirstName, userLastName, email, password}){
      await createUserWithEmailAndPassword(auth, email, password);
      const user =auth.currentUser;
      const timestamp=getTodayTimestamp();
      localStorage.setItem("mimuviAuth", timestamp);
      await updateProfile(user, { displayName: userFirstName+" "+userLastName})
      commit("setUser", user)
    },
    async createUserProfile({commit}, {userFirstName, userLastName}){
      const user=auth.currentUser;
      const timestamp=getTodayTimestamp();
      const docRef = doc(db, "users", user.uid);
      const userData = {
        nombres: userFirstName,
        apellidos: userLastName,
        role: "user",
        status: 0,
        last_log_in: timestamp,
        last_movie_fetch:0,
      };
      await setDoc(docRef, userData)
      commit("setUserData", userData)
    },
    async doSignOut({commit}){
      await signOut(auth);
      commit("setUser", null);//si da error pasarlo antes del await
      commit("setUserData", {nombres:null, apellidos:null})
    },
    async doUpdateUserAccount({commit}, {userFirstName, userLastName}){
      const user =auth.currentUser;
      await updateProfile(user, { displayName: userFirstName+" "+userLastName})
      commit("setUser", user)
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {nombres: userFirstName, apellidos:userLastName})
      const docSnap = await getDoc(docRef);
      const userData = {...docSnap.data()};
      commit("setUserData", userData)
    },
    async updateUserLastFetch({commit}, {last_movie_fetch}){
      const user =auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {last_movie_fetch: last_movie_fetch})
      const docSnap = await getDoc(docRef);
      const userData = {...docSnap.data()};
      commit("setUserData", userData)
    },
    async loadPersonalList({commit}, {colection, field, find}){
      const localCopy= await loadFirebaseList(colection, field, find);
      if (localCopy.length>0){
        commit("films/loadPersonalList", localCopy, {root:true})
      } else{
        commit("films/loadPersonalList", [], {root:true})
      }
      return localCopy.length;
    },
  }

  export const strict = false
