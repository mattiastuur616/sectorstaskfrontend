<template>
  <HeaderFile />
  <h1 class="userInfoHeader">All the sectors you are currently involved in</h1>
  <table class="selectedSectorsTable">
    <tr class="fieldName">
      <td class="selectedSectorTitle">{{ selectionInfo }}</td>
    </tr>
    <tr class="column" v-for="(item) in allSelectedSectors" :key="item.id">
      <td class="sectorName">{{item.sectorName}}</td>
    </tr>
  </table>
  <button class="editButton" v-on:click="goEdit">Edit your choices</button>
</template>

<script>
import HeaderFile from "@/components/pages/HeaderFile.vue";
import router from "@/routers";
import axios from "axios";

export default {
  name:'UserInfo',
  data(){
    return {
      selectionInfo: 'You don´t have any selections',
      allSelectedSectors: []
    }
  },
  components:{
    HeaderFile
  },
  methods:{
    goEdit() {
      router.push({name:'SectorsPage'});
    }
  },
  async mounted() {
    let user = localStorage.getItem('user-id')
    if (!user) {
      await router.push({name:'LoginPage'})
    }
    let selected = await axios.get("http://localhost:8080/api/userSelections/" + user);
    this.allSelectedSectors = selected.data;
    if (this.allSelectedSectors.length > 0) {
      this.selectionInfo = 'You have selected following sectors:';
    } else {
      this.selectionInfo = 'You don´t have any selections';
    }
  }
}
</script>

<style>
.selectedSectorTitle{
  font-size: 30px;
  padding-bottom: 10px;
}
.userInfoHeader{
  font-size: 40px;
  color: midnightblue;
}
.selectedSectorsTable{
  position: relative;
  top: 45%;
  left: 25%;
  text-align: left;
  padding: 30px;
  font-size: 30px;
}
.editButton{
  width: 300px;
  height: 80px;
  display: block;
  margin-left: 580px;
  margin-bottom: 60px;
  border: 12px yellow ridge;
  background-color: palegreen;
  font-size: 25px;
  color: darkgreen;
  font-weight: bold;
}
.editButton:hover{
  border: 12px yellow ridge;
  background-color: darkgreen;
  color: greenyellow;
  cursor: pointer;
}
</style>