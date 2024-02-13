<template>
  <HeaderFile />
  <div class="hello">
    <h1 class="homePageHeader">Welcome to the homepage</h1>
  </div>
</template>

<script>
import HeaderFile from "@/components/pages/HeaderFile.vue";
import router from "@/routers";

export default {
  name: 'HelloWorld',
  components:{
    HeaderFile
  },
  mounted()
  {
    let user = localStorage.getItem('user-id')
    if (!user) {
      router.push({name:'LoginPage'})
    }
  }
}
</script>

<style scoped>
.homePageHeader{
  font-size: 40px;
  color: midnightblue;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
