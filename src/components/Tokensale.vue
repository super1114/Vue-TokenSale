<template>
  <div class="bg-gray-100">     
    <div class="relative">
      <Toptext />
      <transition name="fade">
        <div class="fixed inset-x-0 top-0 m-auto mt-4 flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 lg:w-2/6 rounded" role="alert" v-if="alertShow">
          <p>{{alertMsg}}</p>
        </div>
      </transition>
      <!-- Metamask and Walletconnect buttons -->
      <div class="text-right p-6 space-x-4">
        <button type="button"
                class="whitespace-nowrap inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/ethereum.svg">
          <span class="lg:block">Chain ID&nbsp;</span> <strong>{{this.networkId}}</strong>
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>

        <a v-if="ethereum==null" href="http://www.metamask.io" target="_blank"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/metamask.svg">
          <span class="lg:block">Install MetaMask</span>
        </a>
        <button v-else-if="!account" type="button" @click="connectMetaMask(1)"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/metamask.svg">
          <span  class="lg:block">Connect with MetaMask</span>
        </button>
        <button v-else type="button" @click="connectMetaMask(2)"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/metamask.svg">
          <span  class="lg:block">{{this.account.substring(0,6)+"..."+this.account.substring(this.account.length-4,this.account.length)}}</span>
        </button>
      </div>
    </div>

    <section class="container max-w-screen-lg mx-auto py-2">
      <img class="mx-auto h-64" src="../assets/img/logo/ethereumX-logo.svg" alt="screenshot">
      <div class="py-6">
        <h1 class="pt-8 text-center text-4xl text-black">
          Participate in the ETHX Token Sale</h1>
      </div>
    </section>

    <div class='metamask-info'>
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ this.networkId }}</p>
      <p>Account: {{ this.account }}</p>
      <p>Balance: {{ this.balance }}</p>
    </div>
    <Countdown />
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 py-12 lg:px-10">
      <div v-if="!this.ethereum">
        <div class="max-w-6xl mx-auto" x-data="{ qr: false }">
          <label class="block font-medium text-white font-bold text-4xl text-center">Send ETH to This Address - or -
            connect your wallet</label>
          <div class="my-12 relative items-center">
            <input type="text" id="address" readonly v-model="account"
                  class="p-4 h-16 sm:text-lg md:text-3xl text-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 border-gray-300 rounded-md">
            <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button type="button" class="px-2" @click="copyAddress">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
              <div class="relative" v-show="copiedTooltip">
                <div class="absolute top-0 z-10 w-32 p-2 -mt-4 text-sm leading-tight text-white transform -translate-x-full -translate-y-full bg-blue-500 rounded-lg shadow-lg">
                  Copied Address
                </div>
            </div>
            </div>
            
          </div>

          <div x-show="qr" class="flex justify-center max-w-6xl bg-white shadow-lg rounded-lg p-8 mx-auto text-center">
            <qr-code text="address"></qr-code>
          </div>
        </div>
        <div class="max-w-6xl mx-auto pt-6 pb-6 overflow-auto text-white">
          <div class="float-left">
            Max contribution: 100 ETH
            <br/>
            Min contribution: 0.01 ETH
          </div>
          <div class="float-right">
            Gas limit: 200,000 UNITS
            <br/>
            Gas price: 6 GWEI
          </div>
        </div>
      </div>
      <div v-else-if="!is_paused" class="m-auto d-flex lg:w-2/6 bg-white p-4 rounded .shadow-2xl">
        <h2 class="block mb-4 px-6 font-bold text-left text-black">
          Deposit below to purchase ETHX
        </h2>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Send</h6>
          <h6 class="text-sm">Balance:{{this.balance}}</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="sendAmount">
          <img src="../assets/img/icons/icon.png" class="w-6 h-6"/>
          <label class="ml-2 font-semibold text-xl">ETH</label>
        </div>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Receive</h6>
          <h6 class="text-sm">Balance:0</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="recvAmount">
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jeCdPy acRau"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <label class="ml-2 font-semibold text-xl">ETHX</label>
        </div>          
        <button class="w-full bg-purple-600 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          @click="buyToken"
        >
          BUY
        </button>
      </div>
      <div v-else-if="is_paused" class="m-auto d-flex lg:w-2/6 bg-white p-4 rounded .shadow-2xl">
        <h2 class="block mb-4 px-6 font-bold text-left text-black">
          Claim the purchased ETHX
        </h2>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Claimable Ethx</h6>
          <h6 class="text-sm">Balance:{{this.ethxBalance}}</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="claimableAmount" disabled>
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sc-jeCdPy acRau"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          <label class="ml-2 font-semibold text-xl">ETHX</label>
        </div>          
        <button class="w-full bg-purple-600 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          @click="claimToken"
        >
          Claim
        </button>
      </div>
    </section>
    <Detail />
    <Statistic />
    <Faq />
    <Footer />
    
  </div>
</template>

<script>
import Web3 from "web3"
import PresaleJson from "../../contracts/Presale.json"
import Footer from "./Footer"
import Faq from "./Faq"
import Statistic from "./Statistic"
import Detail from "./Detail"
import Countdown from "./Countdown"
import Toptext from "./Toptext"
export default {
  name: 'Tokensale',
  components:{
    Footer,
    Faq,
    Statistic,
    Detail,
    Countdown,
    Toptext
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    },
    chainId(){
      if(this.$store.state.web3.isInjected==false) {
        return 1
      }else {
        return this.$store.state.myChainId
      }
    },
    recvAmount(){
      return this.sendAmount*this.price;
    }
  },
  data(){
    return {
      web3Obj : new Web3(Web3.givenProvider || 'ws://localhost:8546'),
      contractObj : {},
      price:0,
      sendAmount:0,
       ethereum:window.ethereum,
       selected:null,
       copiedTooltip:false,
       contractAddr:"",
       abi:PresaleJson.abi,
       alertShow:false,
       alertMsg:"",
       networkId:"1",
       account:"",
       balance:0,
       is_paused:false,
       ethxBalance:0,
       claimableAmount:0
    }
  },
  
  created() {
    if(window.ethereum){
      this.web3Obj.eth.getAccounts().then((result)=>{
        this.account = result[0];
      })
      window.ethereum.on('networkChanged', (networkId)=>{
        this.networkId = networkId;
        if(networkId==1){
          this.contractAddr="0x76f65b431784ed58aab24fb645b21ee2fcfee7ea";
        }else if(networkId==56){
          this.contractAddr="0x0AaFB655636890a1683c1b5cCFAbD12Efd839D09";
        }else if(networkId==3){
          this.web3Obj = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/'),
          this.contractAddr="0x5444b0d07Ef839cCEa4a81FBf999149a06f010fE";
        }else {
          this.web3Obj = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/'),
          this.contractAddr="0x5d6d95a53d0ddd47325af83474f9b40bfbc9653c";
        }
        this.getBalance();
        this.contractObj = new this.web3Obj.eth.Contract(this.abi,this.contractAddr);
        this.calcPrice();
      });
      window.ethereum.on('accountsChanged', async (accounts) =>{
        this.account = accounts[0];
        this.getBalance();
        this.calcPrice();
      });
    }
    
    console.log("created")
    
    this.web3Obj.eth.net.getId().then((result)=>{
      this.networkId = result;
      if(result==56) this.contractAddr = "0x0AaFB655636890a1683c1b5cCFAbD12Efd839D09";//Bsc
      else if(result==1) this.contractAddr = "0x76f65b431784ed58aab24fb645b21ee2fcfee7ea";//Main net
      else if(result==3) this.contractAddr = "0x5444b0d07Ef839cCEa4a81FBf999149a06f010fE";//Reposten network.
      else this.contractAddr = "0x5d6d95a53d0ddd47325af83474f9b40bfbc9653c";//Other.
      this.getBalance();
      this.contractObj = new this.web3Obj.eth.Contract(this.abi,this.contractAddr);
      this.calcPrice();
    });
  },
  methods:{
    getBalance() {
      this.web3Obj.eth.getBalance(this.account).then((result)=>{
        this.balance = Web3.utils.fromWei(result, 'ether');
      })
    },
    showAlert:function(msg) {
      this.alertShow=true;
      this.alertMsg=msg;
      setTimeout(()=>{
        this.alertMsg = "";
        this.alertShow = false;
      },1000)
    },
    calcPrice:function() {
      this.contractObj.methods.price().call().then((res)=>{
        this.price = 1/(res/1000000000000000000);
      })
      this.contractObj.methods.paused().call().then((res)=>{
        this.is_paused = res;
      })
      this.contractObj.methods.claimable(this.account).call().then((res)=>{
        console.log(res);
      })
    },
    claimToken:function() {
      if(this.claimableAmount==0){
        this.showAlert("nothing to claim");
        return;
      }
      this.contractObj.methods.claim().send({from:this.account, gas:300000, type:"0x2"}).then((res)=>{
        console.log(res);
        document.location.reload();
      })
    },
    buyToken:function() {
      console.log(Web3.utils.toWei(this.sendAmount, "ether"));
      if(this.sendAmount<=0){
        return;
      }
      if(this.sendAmount>this.balance){
        this.showAlert("Insufficient funds");
        return;
      }
      console.log(Web3.utils.toWei(this.sendAmount, "ether"));
      window.contract = new this.web3Obj.eth.Contract(this.abi, this.contractAddr);
      window.contract.methods.buy().send({from:this.account, gas:300000,value:Web3.utils.toWei(this.sendAmount, "ether"), type:"0x2"}).then((res)=>{
        console.log(res);
        document.location.reload();
      })
    },
    copyAddress:function() {
      var copyText = document.getElementById("address");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");   
      document.getSelection().removeAllRanges();
      this.copiedTooltip = true;
      setTimeout(() => {
        this.copiedTooltip=false;
      }, 1000);
    },
    
    connectMetaMask: async function(param) {
        if(param==1) {
          console.log("ok")
          await window.ethereum.request({ method: 'eth_requestAccounts' }).then((result)=>{
            console.log("result="+result)
            document.location.reload();
          });
        }else {
          console.log("here",this.$store.state.web3.coinbase)
          let params = [
            {
              from: this.$store.state.web3.coinbase,
              to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
            },
          ];
          await window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params,
            })
            .then((result) => {
              console.log(result)
            })
            .catch((error) => {
              console.log(error)
            });
        }
    }
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>