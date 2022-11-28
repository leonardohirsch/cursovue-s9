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
        <button @click="$emit('doAction');" :class="{change: props.type=='change', delete: props.type=='delete', seen: props.type=='seen', tosee: props.type=='tosee', gotopage: props.type=='gotopage'}">{{props.text}}</button>
    </div>
  </template>

<style scoped>
.container{
    padding: 0;
    margin: 0;
}
button{
  padding: 10px;
  margin: 0;
  border-radius: 5px;
  font-size: 1rem;
  color: white;
  cursor: pointer;
}
button:hover{
  color:black;
}
.change{
  background: lightsalmon;
  border-color: lightsalmon;
}
.delete{
  background: red;
  border-color: red;
}
.gotopage{
  background: lightsalmon;
  border-color: lightsalmon;
}
.seen{
background: orangered;
  border-color: orangered;
}
.tosee{
  background: brown;
  border-color: brown;
}
  </style>