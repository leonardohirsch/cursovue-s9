<script>
export default {
    head() {
        return {
            title: "Mi MuviDb"
        };
    },
};
</script>
<script setup>
import Menu from '@/components/Menu.vue'
</script>

<template>
  <div >
    <Menu />
    <h1>Bienvenid@ a Mi Muvi DataBase!</h1>
    <h2>Tu base personal de películas</h2>
    <div class="home">
      <h3>Estas son las secciones que encontrarás</h3>
      <ul>
        <li><b>Home:</b> Todos los días te sugiriremos azarosamente películas divididas en diferentes géneros para que guardes en tus listado de "Films para ver en el futuro" o "Films ya vistos"</li>
        <li><b>Mis Muvis:</b> Aquí encontrarás los fims que has guardado, y podrás escribir observaciones, cuando se trate de películas para ver en el futuro, o una reseña cuando la hayas visto, que a su vez se compartirá para que otros usuarios de la app pueden contar con la opinión de los miembros de esta comunidad. Además, podrás calificar los films que has visto, y así colaborar con el ranking de los mejores puntuados por la comunidad.</li>
        <li><b>Best Muvis:</b> Aquí encontrarás los films más y mejor calificados por los usuarios de la comunidad. Otra forma de encontrar films que te interesarían ver en el futuro o que ya has visto.</li>
      </ul>

    </div>

  </div>
</template>
<style>
body{
  box-sizing: border-box;
  padding: 10px;
  color: white
}
h1,h2,h3{
  text-align: center;
}
.home{
  width: 70%;
  margin: 50px auto;
  border: 1px solid brown;
  border-radius: 5px;
  background-color: brown;
  padding: 10px;
}
li{
  margin-bottom: 10px;
}
</style>