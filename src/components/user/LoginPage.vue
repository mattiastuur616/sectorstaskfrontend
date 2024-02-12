<template>
  <h1 class="h1">Login</h1>
  <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="login" >Login</button>
  </div>
  <p>
    <router-link class="routerLink" to="/sign-up">Sign up here</router-link>
  </p>
</template>

<script>
import axios from "axios";
import router from "@/routers";
export default {
  name: 'LoginPage',
  data()
  {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    async login()
    {
      let result = await axios.get("http://localhost:8080/api/isValidClient?email=" + this.email
          + "&password=" + this.password);
      if (result.status === 200 && result.data === true) {
        let user = await axios.get("http://localhost:8080/api/getClientId?email=" + this.email);
        localStorage.setItem("user-id",user.data);
        await router.push({name: 'HomePage'})
      }
    }
  },
  mounted()
  {
    let user=localStorage.getItem('user-id');
    if (user)
    {
      router.push({name:'HomePage'})
    }
  }
}
</script>

<style>
.h1{
  color: yellow;
  font-size: 60px;
  background-color: orangered;
  padding-top: 30px;
  padding-bottom: 30px;
}
.login input{
  width: 500px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 12px saddlebrown ridge;
  background-color: yellow;
  font-size: 35px;
}
.login button{
  width: 300px;
  height: 70px;
  border: 8px saddlebrown ridge;
  margin-top: 30px;
  background-color: yellow;
  font-size: 35px;
  color: darkgreen;
  font-weight: bold;
}
.login button:hover{
  border: 8px yellow ridge;
  background-color: saddlebrown;
  color: greenyellow;
  cursor: pointer;
}
.routerLink{
  width: 300px;
  height: 90px;
  border: 8px saddlebrown ridge;
  background-color: yellow;
  font-size: 35px;
  color: darkgreen;
  font-weight: bold;
  text-decoration: none;
}
.routerLink:hover{
  border: 8px yellow ridge;
  background-color: saddlebrown;
  color: greenyellow;
}
</style>