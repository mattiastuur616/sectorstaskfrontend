<template>
  <HeaderFile />
  <h1 class="homePageHeader">Welcome to the homepage</h1>
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
}
</style>
