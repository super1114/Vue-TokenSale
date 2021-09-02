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
      <div class="text-right p-6 space-x-4 flex justify-end">
        <button type="button"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style="height:38px"
                @click="claimToken"
                >
          <span  class="lg:block">{{ parseInt(this.claimableAmount) }} ETHX</span>
        </button>
        <div class="relative inline-block text-left">
          <div>
            <button type="button"
                class="whitespace-nowrap inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="menu-button" aria-expanded="false" aria-haspopup="true"
                @click="dropdownShow=!dropdownShow"
                >
              <img v-if="networkId==56" class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/icons/bnb.png">
              <img v-else class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/ethereum.svg">
              <span class="lg:block">Chain ID&nbsp;</span> <strong>{{this.networkId}}</strong>
              <svg v-if="!dropdownShow" class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5  ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div v-show="dropdownShow" class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
          >
            <div class="py-0.5" role="none">
              <button type="button"
                v-if="networkId==1"
                class="w-44 whitespace-nowrap inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="menu-button" aria-expanded="false" aria-haspopup="true"
                @click="switchNetwork('0x38')"
                >
                <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/icons/bnb.png">
                <span class="lg:block"><strong>BSC Mainnet</strong></span>

              </button>
              <button type="button"
                v-else
                class="whitespace-nowrap inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="menu-button" aria-expanded="false" aria-haspopup="true"
                @click="switchNetwork('0x1')"
                >
                <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/ethereum.svg">
                <span class="lg:block"><strong>Ethereum Mainnet</strong></span>
              </button>
            </div>
          </div>
        </div>
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

    <div class='metamask-info hidden'>
      <p>Metamask: {{ web3.isInjected!==null }}</p>
      <p>Network: {{ this.networkId }}</p>
      <p>Account: {{ this.account }}</p>
      <p>Balance: {{ this.balance }}</p>
    </div>
    <div class="text-3xl text-center w-full items-center justify-center pt-4 text-black">
        Round <b>1</b> (<b>{{Math.round(this.price*1000)/1000}} ETHX / {{this.curCoin.sym}}</b>)
        <br/>
        <br/>
        <p class="text-xl text-gray-400">NEXT round (higher price) in&nbsp;</p>
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
            <qr-code :text="account"></qr-code>
          </div>
        </div>
        <div class="max-w-6xl mx-auto pt-6 pb-6 overflow-auto text-white" >
          <div class="float-left">
            Max contribution: 100 ETH
            <br/>
            Min contribution: 0.01 ETH
          </div>
          <div class="float-right">
            Gas limit: 200,000 UNITS
            <br/>
            Gas price: 80 GWEI
          </div>
        </div>
      </div>
      <div v-else-if="!is_paused&&(networkId==1||networkId==56)" class="m-auto d-flex lg:w-2/6 bg-white p-4 rounded .shadow-2xl">
        <h2 class="block mb-4 px-6 font-bold text-left text-black">
          Deposit below to purchase ETHX
        </h2>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Send</h6>
          <h6 class="text-sm">Balance: {{this.balance}}</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="sendAmount">
          <img src="../assets/img/icons/bnb.png" v-if="this.networkId==56" class="w-6 h-6"/>
          <img src="../assets/img/icons/icon.png" v-else class="w-6 h-6"/>
          <label class="ml-2 font-semibold text-xl">{{this.curCoin.sym}}</label>
        </div>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Receive</h6>
          <h6 class="text-sm">Balance:{{parseInt(this.ethxBalance)}}</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="recvAmount">
          <img src="../assets/img/ethereumx-black.svg" height="20px" width="20px" />
          <label class="ml-2 font-semibold text-xl">ETHX</label>

        </div>
        <button class="w-full bg-purple-600 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          @click="buyToken" v-bind:disabled="sendAmount<=0"
        >
          BUY
        </button>
      </div>
      <div v-else-if="is_paused&&(networkId==1||networkId==56)" class="m-auto d-flex lg:w-2/6 bg-white p-4 rounded .shadow-2xl">
        <h2 class="block mb-4 px-6 font-bold text-left text-black">
          Claim the purchased ETHX
        </h2>
        <div class="mt-10 flex flex-row justify-between px-6">
          <h6 class="text-sm">Claimable Ethx</h6>
          <h6 class="text-sm">Balance:{{this.ethxBalance}}</h6>
        </div>
        <div class="mt-2 flex flex-row items-center justify-between mb-6 px-6">
          <input class="appearance-none font-medium text-2xl py-1 rounded w-full  mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="0.0" v-model="claimableAmount" disabled>
          <img src="../assets/img/ethereumx-black.svg" height="20px" width="20px" />
          <label class="ml-2 font-semibold text-xl">ETHX</label>
        </div>
        <button class="w-full bg-purple-600 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
          @click="claimToken"
        >
          Claim
        </button>
      </div>
      <div v-else class="m-auto d-flex lg:w-2/6 bg-white p-4 rounded .shadow-2xl">
        <h2 class="block mb-4 px-6 font-bold text-left text-black">
          Tokensale is only available on these networks:
        </h2>
        <h4 class="text-md text-left px-6">-Ethereum (Mainnet)</h4>
        <h4 class="text-md text-left px-6 mt-4">-Binance Smart Chain (Mainnet)</h4>
        <button class="w-full bg-purple-600 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6" type="button"
          @click="switchNetwork('0x1')"
        >
          Switch
        </button>
      </div>
    </section>
    <Detail />
    <section class="bg-white py-12">
      <div class="max-w-6xl mx-auto">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <span
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
              {{this.soldAmount}} ETHX SOLD
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold inline-block text-red-600">
              {{this.soldPercent}}%
            </span>
          </div>
        </div>
        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-50">
          <div style="width: 30%" class="shadow-none flex flex-col absolute top-0 h-4 rounded shim-red"></div>
        </div>
      </div>
    </section>

    <Faq />
    <Footer />

  </div>
</template>

<script>
import Web3 from "web3"
import PresaleJson from "../../contracts/Presale.json"
import EthxJson from "../../contracts/Ethx.json"
import Footer from "./Footer"
import Faq from "./Faq"
//import Statistic from "./Statistic"
import Detail from "./Detail"
import Countdown from "./Countdown"
import Toptext from "./Toptext"
export default {
  name: 'Tokensale',
  components:{
    Footer,
    Faq,
    //Statistic,
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
    recvAmount:{
      get(){
        return this.sendAmount*this.price;  
      },
      set(newVal){
        this.sendAmount = newVal/this.price;
      }
      
    }
  },
  data(){
    return {
      web3Obj : new Web3(Web3.givenProvider || 'ws://localhost:8545'),
      contractObj : {},
      ethxContractObj : {},
      price:0,
      sendAmount:0,
      ethereum:window.ethereum,
      copiedTooltip:false,
      contractAddr:"",
      ethxContractAddr:"",
      abi:PresaleJson.abi,
      ethxAbi:EthxJson.abi,
      alertShow:false,
      alertMsg:"",
      networkId:"1",
      account:"0x78Ce09cF3AFF8Ca7cF8B111725f547e18aF74875",
      balance:0,
      is_paused:false,
      ethxBalance:0,
      claimableAmount:0,
      curCoin:{ sym:"ETH", icon:"../assets/img/icons/icon.png" },
      dropdownShow:false,
      soldPercent:0,
      soldAmount:0
    }
  },

  created() {
    console.log("created")
    if(window.ethereum){
      this.web3Obj.eth.getAccounts().then((result)=>{
        this.account = result[0];
        //this.$store.dispatch("checkMetamaskAddr", {metamask:result[0]});
      })
      window.ethereum.on('networkChanged', (networkId)=>{
        this.networkChanged(networkId);
      });
      window.ethereum.on('accountsChanged', async (accounts) =>{
        this.account = accounts[0];
        this.getBalance();
        this.calcPrice();
      });
    }

    this.web3Obj.eth.net.getId().then((result)=>{
      this.networkChanged(result)
    });
  },
  methods:{
    async switchNetwork(netid){
      this.dropdownShow = false;
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: netid }],
      });
    },
    networkChanged(networkId){
      this.dropdownShow = false;
      this.networkId = networkId;
      if(networkId==1){
        this.web3Obj = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        this.contractAddr="0x76f65b431784ed58aab24fb645b21ee2fcfee7ea";
        this.ethxContractAddr="0x14af5133C9989a7965CDe4fF82d391F96c8F6921";
        this.curCoin = { sym:"ETH", icon:"../assets/img/icons/icon.png" };
      } else if(networkId==3){
        this.web3Obj = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/');
        this.contractAddr="0x5444b0d07Ef839cCEa4a81FBf999149a06f010fE";
        this.ethxContractAddr="0x961af03e0065170eaab464c151944fb774ee5003";
        this.curCoin = { sym:"ETH", icon:"../assets/img/icons/icon.png" };
      } else if(networkId==56){
        this.web3Obj = new Web3(Web3.givenProvider || 'https://bsc-dataseed.binance.org');
        this.contractAddr="0x0AaFB655636890a1683c1b5cCFAbD12Efd839D09";
        this.ethxContractAddr="0xca221Ff18e38213a0ff185A3fA9C7807aff677BB";
        this.curCoin = { sym:"BNB", icon:"../assets/img/icons/bnb.png" };
      } else {
        this.web3Obj = new Web3(Web3.givenProvider || 'https://ropsten.infura.io/');
        this.contractAddr="0x5444b0d07Ef839cCEa4a81FBf999149a06f010fE";
        this.ethxContractAddr="0x961af03e0065170eaab464c151944fb774ee5003";
        this.curCoin = { sym:"ETH", icon:"../assets/img/icons/icon.png" };
      }
      this.ethxContractObj = new this.web3Obj.eth.Contract(this.ethxAbi,this.ethxContractAddr);
      this.getBalance();
      this.contractObj = new this.web3Obj.eth.Contract(this.abi,this.contractAddr);
      
      this.calcPrice();
    },

    async getBalance() {
      await this.web3Obj.eth.getBalance(this.account).then((result)=>{
        this.balance = Web3.utils.fromWei(result, 'ether');
      });
      this.ethxContractObj.methods.balanceOf(this.account).call().then((result)=> {
        this.ethxBalance = result;
      });
    },
    showAlert:function(msg) {
      this.alertShow=true;
      this.alertMsg=msg;
      setTimeout(()=>{
        this.alertMsg = "";
        this.alertShow = false;
      },1000)
    },
    calcPrice: async function() {
      await this.contractObj.methods.price().call().then((res)=>{
        this.price = 1/(res/1000000000000000000);
      })
      await this.contractObj.methods.paused().call().then((res)=>{
        this.is_paused = res;
      })
      await this.contractObj.methods.claimable(this.account).call().then((res)=>{
        this.claimableAmount = res;
      })
      await this.contractObj.methods.weiRaised().call().then((res)=>{
        this.soldAmount = res*this.price/1000000000000000000;
        this.soldPercent = Math.round((res*this.price*100/250000000000000000000000)*10000)/10000;
      })
    },
    claimToken: async function() {
      if(this.claimableAmount==0){
        this.showAlert("nothing to claim");
        return;
      }
      await this.contractObj.methods.claim().send({from:this.account, gas:300000, type:"0x2"}).then((res)=>{
        console.log(res);
        document.location.reload();
      })
    },
    buyToken:async function() {
      if(this.sendAmount<=0){
        return;
      }
      if(this.sendAmount>this.balance){
        this.showAlert("Insufficient funds");
        return;
      }
      await this.contractObj.methods.buy().send({from:this.account, gas:300000,value:Web3.utils.toWei(this.sendAmount, "ether")}).then((res)=>{
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
              to: '0x78Ce09cF3AFF8Ca7cF8B111725f547e18aF74875',
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
button[disabled="disabled"]{
  cursor: not-allowed;
  opacity: 0.8;
}
</style>
