<template>
  <div class="navbar">
    <router-link to="/" class="navText">Home</router-link>
    <router-link to="/userinfo" class="navText">User Info</router-link>
    <button class="logoutButton" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import router from "@/routers";

export default {
  name:'HeaderFile',
  methods:{
    logout()
    {
      localStorage.clear()
      router.push({name:'LoginPage'})
    }
  }
}
</script>

<style>
.navbar{
  background-color: palegreen;
  padding: 15px;
}
.navText{
  color: darkgreen;
  padding: 30px;
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
}
.navText:hover{
  color: yellow;
}
.logoutButton{
  color: midnightblue;
  background-color: orange;
  font-size: 40px;
  font-weight: bold;
}
.logoutButton:hover{
  color: yellow;
  background-color: midnightblue;
  cursor: pointer;
}
</style>
