<template>
  <HeaderFile />
  <h1 class="homePageHeader">Welcome to the homepage</h1>
  <p class="text">This is the test project for making a better interface for users,</p>
  <p class="text">who may choose different sectors in which they are currently involved in.</p>
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

<style>
.homePageHeader{
  font-size: 40px;
  color: midnightblue;
  padding-bottom: 100px;
}
.text{
  font-size: 30px;
  color: darkgreen;
}
</style>
