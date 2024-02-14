<template>
  <HeaderFile />
  <h1 class="userInfoHeader">Choose your sectors</h1>
  <input class="username" type="text" v-model="username" placeholder="Enter Your name" />
  <table class="sectorTable">
    <tr class="fieldName" >
      <td class="sectorTitle">Sectors</td>
    </tr>
    <tr class="column" v-for="(item, index) in sectors" :key="item.id">
      <td class="sectorName">{{item.sectorName}}</td>
      <td class="button" v-on:click="changeSectorView(item.sectorName, index)">{{item.actionType}}</td>
      <td class="secondButton" v-on:click="moveSector(item)">{{item.addOrRemove}}</td>
    </tr>
  </table>
  <br>
  <table class="sectorTable">
    <tr class="fieldName">
      <td class="sectorTitle">{{decideSelectionInfo(this.selectedSectors.length)}}</td>
    </tr>
    <tr class="column" v-for="(item) in selectedSectors" :key="item.id">
      <td class="sectorName">{{item.sectorName}}</td>
      <td class="secondButton" v-on:click="moveSector(item)">{{item.addOrRemove}}</td>
    </tr>
  </table>
  <br>
  <input class="checkTick" type="checkbox" id="checkbox" v-model="termsChecked">
  <label class="tickText" for="checkbox">Agree To Terms</label>
  <br>
  <br>
  <br>
  <button class="submit" v-on:click="saveChanges(username, selectedSectors, termsChecked)">Submit your changes</button>
  <br>
  <br>
  <br>
</template>

<script>
import HeaderFile from "@/components/pages/HeaderFile.vue";
import axios from 'axios';
import router from "@/routers";

export default {
  name:'SectorsPage',
  data(){
    return {
      username: '',
      sectors: [],
      moreSectors: [],
      selectedSectors: [],
      previousSelections: [],
      actionType: 'Show more',
      addOrRemove: 'Add',
      selectionInfo: 'You don´t have any selections',
      termsChecked: false
    }
  },
  components:{
    HeaderFile
  },
  methods:{
    async changeSectorView(name, index)
    {
      for (const sector of this.sectors) {
        if (sector.sectorName === name) {
          if (sector.actionType === 'Show more') {
            sector.actionType = 'Show less';
            let moreSectors = await axios.get('http://localhost:8080/api/subSectors/' + name);
            for (const item of moreSectors.data) {
              let subSectors = await axios.get('http://localhost:8080/api/subSectors/' + item.sectorName);
              if (subSectors.data.length === 0) {
                item.actionType = '';
              } else {
                item.actionType = 'Show more';
              }
              item.addOrRemove = this.checkIfSelected(item);
              this.sectors.splice(index + 1, 0, item);
            }
          } else if (sector.actionType === 'Show less') {
            sector.actionType = 'Show more';
            let allSectors = await axios.get('http://localhost:8080/api/subSectors/' + name);
            let last = allSectors.data[0].sectorName;
            let first = allSectors.data[allSectors.data.length - 1].sectorName;
            let inBetween = false;
            let count = 0;
            for (const item of this.sectors) {
              if (item.sectorName === last) {
                count = count + 1;
                this.sectors.splice(index + 1, count);
                break;
              } else if (item.sectorName === first) {
                inBetween = true;
              }
              if (inBetween) {
                count = count + 1;
              }
            }
          }
        }
      }
    },
    checkIfSelected(item)
    {
      for (const sector of this.selectedSectors) {
        if (item.sectorName === sector.sectorName) {
          return 'Remove';
        }
      }
      for (const sector of this.previousSelections) {
        if (sector === item.sectorName) {
          return 'Remove';
        }
      }
      return 'Add';
    },
    decideStatus()
    {
      if (this.actionType === 'Show more') {
        return 'Show more';
      } else if (this.actionType === 'Show less') {
        return 'Show less';
      }
    },
    decideSelectionInfo(length)
    {
      if (length === 1) {
        return 'Your selected sector:';
      } else if (length > 1) {
        return 'Your selected sectors:';
      } else {
        return 'You don´t have any selections'
      }
    },
    moveSector(sector)
    {
      if (sector.addOrRemove === 'Add') {
        this.selectedSectors.push(sector);
        sector.addOrRemove = 'Remove';
      } else if (sector.addOrRemove === 'Remove') {
        let count = -1;
        for (const item of this.selectedSectors) {
          count = count + 1;
          if (item.sectorName === sector.sectorName) {
            this.selectedSectors.splice(count, 1);
            sector.addOrRemove = 'Add';
          }
        }
        this.sectors.forEach((sector) => {sector.addOrRemove = this.checkIfSelected(sector)});
      }
    },
    async saveChanges(username, allSectors, userAgreement)
    {
      let userId = localStorage.getItem('user-id');
      await axios.delete('http://localhost:8080/api/removeSelections/' + userId);
      for (const sector of allSectors) {
        await axios.post('http://localhost:8080/api/addSelection?name=' + username + '&sector='
            + sector.sectorName + '&agreement=' + userAgreement + '&userId=' + userId);
      }
      await router.push({name:'UserInfo'})
    }
  },
  async mounted()
  {
    let user = localStorage.getItem('user-id')
    if (!user) {
      await router.push({name:'LoginPage'})
    }
    let sectors = await axios.get('http://localhost:8080/api/allMainSectors');
    let previousSelections = await axios.get('http://localhost:8080/api/userSelections/' + user);
    let username = await axios.get('http://localhost:8080/api/enteredName/' + user);

    this.username = username.data;
    this.previousSelections = previousSelections.data;
    this.selectedSectors = this.previousSelections;
    this.sectors = sectors.data;

    this.sectors.forEach((sector) => {sector.actionType = this.decideStatus()});
    this.sectors.forEach((sector) => {sector.addOrRemove = this.checkIfSelected(sector)})
    this.previousSelections.forEach((sector) => {sector.addOrRemove = this.checkIfSelected(sector)})
  }
}
</script>

<style>
body{
  background-color: lightskyblue;
}
.username{
  position: relative;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  display: block;
  margin-top: 50px;
  margin-left: 70px;
  margin-bottom: 20px;
  border: 12px yellow ridge;
  background-color: palegreen;
  font-size: 25px;
  color: darkgreen;
  font-weight: bold;
}
.fieldName{
  font-weight: bold;
  color: darkgreen;
}
.sectorTitle{
  padding-left: 30px;
  font-size: 40px;
}
.sectorTable{
  position: relative;
  top: 45%;
  text-align: left;
  padding: 20px;
  font-size: 30px;
}
.sectorName{
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 30px;
  border: 7px yellow ridge;
  color: midnightblue;
  background-color: orange;
}
.column{
  border: 12px saddlebrown ridge;
  background-color: palegreen;
  padding: 30px;
}
.button{
  padding: 10px;
  color: darkgreen;
  border: 7px yellow ridge;
  font-weight: bold;
}
.button:hover{
  color: greenyellow;
  background-color: darkgreen;
  cursor: pointer;
}
.secondButton{
  padding: 10px;
  color: darkviolet;
  border: 7px yellow ridge;
  font-weight: bold;
}
.secondButton:hover{
  color: violet;
  background-color: darkgreen;
  cursor: pointer;
}
.checkTick{
  scale: 3;
  position: relative;
  right: 35%;
  margin-top: 40px;
}
.tickText{
  color: darkgreen;
  padding-left: 10px;
  font-size: 30px;
  position: relative;
  right: 35%;
  font-weight: bold;
}
.submit{
  position: relative;
  right: 35%;
  width: 300px;
  height: 80px;
  padding-left: 10px;
  display: block;
  margin: 15px;
  margin-left: auto;
  margin-right: auto;
  border: 12px yellow ridge;
  background-color: palegreen;
  font-size: 25px;
  color: darkgreen;
  font-weight: bold;
}
.submit:hover{
  border: 12px yellow ridge;
  background-color: darkgreen;
  color: greenyellow;
  cursor: pointer;
}
</style>