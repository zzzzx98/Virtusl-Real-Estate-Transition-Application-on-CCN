<template>
  <div id="building">
    <div class="container">
      <div class="row">
      <h1 v-show="isConnected">{{ account }}</h1>
      <button v-show="!isConnected" @click="connect">Connect Ale</button>
      <div style="color: #f00" v-show="isConnected">Connect Success!</div>
      </div>
      <div><button :variant="'primary'"
              @click="changeAccount">Change Account</button></div>
      <div class="row">
        <h1>Add class</h1>
      </div>
      <div class="row pad">
        <label>Address: </label>
        <input
          v-model="Address"
          type="text"
          placeholder="Address"
        />
      </div>
      <div class="row pad">
        <label>Rent Price: </label>
        <input
          v-model="RentPrice"
          type="text"
          placeholder="Rent Price"
        />
      </div>
      <div class="row pad">
        <label>Deposit: </label>
        <input
          v-model="Deposit"
          type="text"
          placeholder="Deposit"
        />
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function1">Add Room</button>
      </div>
      <hr>
      <h1>Sign Agreement</h1>
      <div class="row pad">
        <label>Sign_Room_index: </label>
        <input
          v-model="Sign_Room_index"
          type="text"
          placeholder="Sign_Room_index"
        />
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function2">Sign_Room_index</button>
      </div>
      <hr>
      <h1>Agreement Completement</h1>
      <div class="row pad">
        <label>Complete_agreement_index: </label>
        <input
          v-model="Complete_agreement_index"
          type="text"
          placeholder="Complete_agreement_index"
        />
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function3">Complete_agreement_index</button>
      </div>
      <hr>
      <h1>Room by No.</h1>
      <div class="row pad">
        <label>Room_serarh_index: </label>
        <input
          v-model="Room_serarh_index"
          type="text"
          placeholder="Room_serarh_index"
        />
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function4">Room_serarh_index</button>
      </div>
      <div>{{room_by_number}}</div>
      <hr>
      <h1>Aggrement by No.</h1>
      <div class="row pad">
        <label>Agreement_searh_index: </label>
        <input
          v-model="Agreement_searh_index"
          type="text"
          placeholder="Agreement_searh_index"
        />
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function5">Agreement_searh_index</button>
      </div>
      <div>{{agreement_by_number}}</div>
      <hr>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function6">no_of_rooms</button>
          <span>{{no_of_rooms}}</span>
      </div>
      <div class="row pad">
        <button :variant="'primary'"
              @click="Function7">no_of_agreements</button>
          <span>{{no_of_agreements}}</span>
      </div>
    </div>
  </div>
</template>

<script>

import Contract1 from './contract';

export default {
  name: "App",
  data() {
    return {
      account: "",
      isConnected: false,
      Address: "",
      RentPrice: 0,
      Deposit: 0,
      Sign_Room_index: 0,
      Complete_agreement_index: 0,
      Room_serarh_index: 0,
      Agreement_searh_index: 0,
      no_of_rooms: 0,
      no_of_agreements:0,
      value_ini: 100000000000000,
      room_by_number: [],
      agreement_by_number:[]
    }
  },
  watch: {
    "$store.state.dapp": {
      handler(val) {
        this.account = val.account;
        this.isConnected = val.isConnected;
        console.log(this.account)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    connect() {
      window["aleereum"] && window["aleereum"].connect();
    },
    Function1(){
      console.log(this.Address);
      Contract1.Instance.methods.addRoom(String(this.Address),Number(this.RentPrice),Number(this.Deposit)).sendBlock({
          from: String(this.account),
          password: '19981005',
          amount: 0,
          gas_price:'20000000000',
          gas:'2000000',
      }).then(()=>{
        console.log(this.account)
      })
    },
    changeAccount(){
      this.accountInfo = true;
      this.provider = window["aleereum"];
      window["aleereum"] && window["aleereum"].connect();
      console.log(this.provider.account);
      this.account = this.provider.account;
    },
    Function2(){
        Contract1.Instance.methods.signAgreement(this.Sign_Room_index).sendBlock({
            from: String(this.account),
            password:'19981005',
            amount: this.value_ini,
            gas_price:'20000000000',
            gas:'2000000',
        });
    },
    Function3(){
        return Contract1.Instance.methods.agreementCompleted(this.Complete_agreement_index).sendBlock({
            from: String(this.account),
            password:'19981005',
            amount: this.value_ini,
            gas_price:'20000000000',
            gas:'2000000',
        }).then((res)=>{
          console.log(res)
        })
    },
    Function4(){
        return Contract1.Instance.methods.Room_by_No(this.Room_serarh_index).call({
            from: String(this.account)
        }).then((res1) =>{
            this.room_by_number = "room_id: " + String(res1['roomid']) + " ---- " + "aggreement_id: " + String(res1['agreementid']) + " ---- " 
                                  + "room_address: " + String(res1['roomaddress']) + " ---- " + "rent_per_month: " + String(res1['rent_per_month']) + " ---- "
                                  + "deposit: " + String(res1['securityDeposit']) + " ---- " 
                                  + "vacant: " + String(res1['vacant']) + " ---- " +"landlord: " + String(res1['landlord']) + " ---- "
                                  + "currentTenant: " + String(res1['currentTenant']);
            console.log(this.Room_serarh_index)
        })
    },
    Function5(){
        return Contract1.Instance.methods.RoomAgreement_by_No(this.Agreement_searh_index).call({
            from: String(this.account)
        }).then((res1)=>{
            this.agreement_by_number = "room_id: " + String(res1['roomid']) + " ---- " + "aggreement_id: " + String(res1['agreementid']) + " ---- " 
                                  + "room_address: " + String(res1['RoomAddresss']) + " ---- " + "rent_per_month: " + String(res1['rent_per_month']) + " ---- "
                                  + "deposit: " + String(res1['securityDeposit']) + " ---- " 
                                  + "lockInPeriod: " + String(res1['lockInPeriod']) + " seconds" + " ---- " +"landlord: " + String(res1['landlordAddress']) + " ---- "
                                  + "currentTenant: " + String(res1['tenantAddress']);
            console.log(this.Index4)
        })
    },
    Function6(){
        return Contract1.Instance.methods.no_of_rooms().call({
            from: String(this.account)
            
        }).then((res3) =>{
            this.no_of_rooms = res3;
            console.log(res3)
            console.log(this.account)
        })
    },
    Function7(){
        return Contract1.Instance.methods.no_of_agreement().call({
            from: String(this.account)

        }).then((res4)=>{
            this.no_of_agreements = res4;
            console.log(res4)
        })
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00d9ff;
  margin-top: 20px;
}

.pad{
  margin-top: 10px;
}

.pad_left{
  margin-left: 10px;
}

body{
margin: 6px;

padding: 0;

font-size: 20px;

font-family: tahoma, arial;

background:url("background.jpg");

}

button {
  background-color: rgb(135, 221, 222);
  color: rgb(0, 0, 0);
}

</style>
