<template>
  <h1 class="h1">Sign Up</h1>
  <div class="login">
    <input type="text" v-model="firstName" placeholder="Enter Your First Name" />
    <input type="text" v-model="lastName" placeholder="Enter Your Last Name" />
    <input type="text" v-model="email" placeholder="Enter Your Email Address" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <button v-on:click="signUp">Sign Up</button>
    <p>
      <router-link class="routerLink" to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/routers";
export default {
  name: 'SignUp',
  data()
  {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods:{
    async signUp()
    {
      let result = await axios.post("http://localhost:8080/api/addClient", {
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password
      });
      localStorage.setItem("test", "worked");
      if (result.status === 200) {
        let user = await axios.get("http://localhost:8080/api/getClientId?email=" + this.email);
        localStorage.setItem("user-id",user.data);
        await router.push({name: 'HomePage'})
      }
    }
  },
  mounted()
  {
    let user=localStorage.getItem('user-info');
    if (user)
    {
      router.push({name:'HomePage'})
    }
  }
}
</script>