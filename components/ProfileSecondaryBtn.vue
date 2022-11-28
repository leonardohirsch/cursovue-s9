<script setup>
const props=defineProps({
    type:{
        type: String
    },
    text:{
        type: String
    }
})
const emit=defineEmits(["doAction"]);
</script>
<template>
    <div class="container">
        <button @click="$emit('doAction');" :class="{findreview: props.type=='findreview', sendcomments:props.type=='sendcomments', score:props.type=='score', search:props.type=='search'}">{{props.text}}</button>
    </div>
</template>

<style scoped>
.container{
    display: inline;
    padding: 0;
    margin: 0;
  }
button{
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
}
button:hover{
  color:black;
}
.findreview{
  background: darkcyan;
  border-color: darkcyan;
}
.sendcomments{
  background: darkcyan;
  border-color: darkcyan;
}
.score{
  background: darkcyan;
  border-color: darkcyan;
}
.search{
  background: darkcyan;
  border-color: darkcyan;
}
  </style>