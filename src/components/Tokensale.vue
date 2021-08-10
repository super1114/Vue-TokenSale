<template>
  <div class="bg-gray-100"> 
    
    <div>
      <div class="mx-6">
        <div class="bg-yellow-100 rounded-b text-yellow-900 px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="pr-4">
              <svg class="h-12 w-12 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <p class="text-base">The ONLY official URL for the ETHX Token is <strong>ethereumx.com</strong>.
                Be careful of similar looking URLs.
                For those participating in the token sale, the ONLY URL is
                <strong>tokensale.ethereumx.com</strong></p>
            </div>
          </div>
        </div>
      </div>
    
      <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative w-3/6 m-auto mt-3" role="alert" v-bind:class="{ hidden: metamaskInstalled }">
        <strong class="font-bold">Warning!</strong>
        <span class="block sm:inline">&nbsp;&nbsp;&nbsp;&nbsp;MetaMask was not installed in your computer.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="metamaskInstalled=true">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <!-- Metamask and Walletconnect buttons -->
      <div class="text-right p-6 space-x-4">
        <button type="button" 
                class="whitespace-nowrap inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/ethereum.svg">
          <span class="hidden lg:block">Chain ID&nbsp;</span> <strong>1</strong>
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
          </svg>
        </button>

        <button type="button" @click="connectMetaMask"
                class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img class="-ml-0.5 mr-2 h-4 w-4" src="../assets/img/providers/metamask.svg">
          <span class="hidden lg:block">Connect with&nbsp;</span>MetaMask
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
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
    </div>

    <section class="text-black py-6 overflow-auto" x-data="countdown()" x-init="start()">
      <div class="text-3xl text-center w-full items-center justify-center pb-4">
        Round <b>1</b> (<b>250 ETHX / ETH</b>)
        <br/>
        <br/>
        <p class="text-xl text-gray-400">NEXT round (higher price) in&nbsp;</p>
      </div>
      <div class="text-6xl text-center flex w-full items-center justify-center pb-6">

        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none" x-text="days">00</div>
          <div class="font-mono uppercase text-sm leading-none">Days</div>
        </div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none" x-text="hours">00</div>
          <div class="font-mono uppercase text-sm leading-none">Hours</div>
        </div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none" x-text="minutes">00</div>
          <div class="font-mono uppercase text-sm leading-none">Minutes</div>
        </div>
        <div class="text-2xl mx-1 font-extralight">and</div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none" x-text="seconds">00</div>
          <div class="font-mono uppercase text-sm leading-none">Seconds</div>
        </div>
      </div>

    </section>

    <!-- Tokensale address part -->
    <section class="bg-gradient-to-r from-blue-500 to-purple-600 py-12">
      <div class="max-w-6xl mx-auto" x-data="{ qr: false }">
        <label class="block font-medium text-white font-bold text-4xl text-center">Send ETH to This Address - or -
          connect your wallet</label>
        <div class="my-12 relative items-center">
          <input type="text" id="address" readonly value="0x0012901290190190190190"
                 class="p-4 h-16 sm:text-lg md:text-3xl text-gray-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 border-gray-300 rounded-md">
          <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            
          </div>
        </div>

        <div x-show="qr" class="flex justify-center max-w-6xl bg-white shadow-lg rounded-lg p-8 mx-auto text-center">
          <qr-code text="0x0012901290190190190190"></qr-code>
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
    </section>

    <!-- Token sale details -->
    <section class="pt-8 pb-2 bg-white shadow-lg">
      <div class="container px-4 mx-auto">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div class="p-8 text-center ">
              <p class="mb-2 text-xs md:text-base ">Total Cap</p>
              <span class="text-3xl lg:text-4xl font-bold font-heading">500k</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div class="p-8 text-center ">
              <p class="mb-2 text-xs md:text-base ">Private Presale</p>
              <span class="text-3xl lg:text-4xl font-bold font-heading">25k</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div class="p-8 text-center ">
              <p class="mb-2 text-xs md:text-base ">Public Sale <span class="italic text-red-600">Live</span>
              </p>
              <span class="text-3xl lg:text-4xl font-bold font-heading">250k</span>
            </div>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
            <div class="p-8 text-center ">

              <p class="mb-2 text-xs md:text-base ">Total Supply</p>
              <span class="text-3xl lg:text-4xl font-bold font-heading">500k ETHX</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-12">
      <div class="max-w-6xl mx-auto">
        <div class="flex mb-2 items-center justify-between">
          <div>
                      <span
                          class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                        ETHX SOLD
                      </span>
          </div>
          <div class="text-right">
                      <span class="text-xs font-semibold inline-block text-red-600">
                        30%
                      </span>
          </div>
        </div>
        <div class="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-50">
          <div style="width: 30%" class="shadow-none flex flex-col absolute top-0 h-4 rounded shim-red"></div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 lg:bg-contain bg-top bg-no-repeat" style="background-image: url('/img/bg/intersect.svg');">
      <div class="container mx-auto px-4">
        <div class="max-w-sm mx-auto mb-12 text-center" >
          <h2 class="mb-4 text-3xl md:text-4xl font-bold font-heading">Frequently Asked&nbsp;Questions</h2>
          <p class="text-sm md:text-base leading-loose text-blueGray-500">
            <span>Can’t find the answer you’re looking for? Write out to our</span>
            <a class="text-blue-600 hover:text-blue-700" href="#">customer support team.</a>
          </p>
        </div>
        <div class="max-w-3xl mx-auto">
          <ul class="space-y-4">
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: true }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-0"
                  aria-expanded="true"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()"
              >
                <span>When does the token sale end?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p  class="mt-2 text-blueGray-400 font-normal leading-loose"
                  id="faq-0"
                  x-show="open">
                You will have until 11am UTC
                to contribute a maximum of 1 ETH. After 11am UTC, if we haven’t met our funding goal, the
                max contribution cap will be lifted and we will be accepting additional contributions until
                our funding goal is reached.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading text-blue-600 hover:text-blue-700"
                  aria-controls="faq-1"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>How much can I contribute?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-500" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class=" mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-1"
                 x-show="open">
                You can send a maximum of 1 ETH
                Until 11am UTC. After 11am UTC if we haven’t met our funding goal we will lift our max cap
                and you can send unlimited funds until we reach our goal.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-2"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>Is there a minimum contribution?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class=" mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-2"
                 x-show="open">
                Yes, 0.01 ETH.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-3"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>What happens if I send more ETH than the maximum amount?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-3"
                 x-show="open">
                If you send more than 1 ETH
                before 11am UTC, any excess funds will be returned to your wallet.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-4"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>Can I send money from an exchange wallet like Coinbase?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-4"
                 x-show="open">No, do not send money from an
                exchange wallet. If for any reason we need to return funds back to your wallet, funds that
                were originally sent from an exchange wallet will be lost and you will not be able to
                receive the tokens you purchase.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-5"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>When will i receive my tokens?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-5"
                 x-show="open">Immediately after the token
                sale ends. Tokens will not be transferable for up to 30 days.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-6"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>How do i know that my contribution was successfully accepted?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-6"
                 x-show="open">After we receive your
                contribution a confirmation email of the transaction will be sent to the email address
                provided when you joined the whitelist. You can also confirm if the the transaction went
                through from your wallet.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow" x-data="{ open: false }">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  aria-controls="faq-7"
                  aria-expanded="false"
                  @click="open = !open"
                  x-bind:aria-expanded="open.toString()">
                <span>How can I trust I am sending to the official EthereumX address?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose"
                 id="faq-7"
                 x-show="open">Always triple check that you
                are on the official ethereumx.com URL (The official token sale page is
                tokensale.ethereumx.com).</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="py-16">
      <div class="container px-4 mx-auto">
        <div class="flex flex-col lg:flex-row items-center lg:justify-between">
          <p class="text-sm text-blueGray-400"><span class="font-medium">Need help?</span><br>
            Reach out to <a href="support@ethereumx.com">support@ethereumx.com</a> or click on the support link
            at the bottom right of this screen</p>
          <div class="order-first lg:order-last -mx-2 mb-4 lg:mb-0">
            <a class="inline-block px-2" href="https://facebook.com/EthereumXcom" target="_blank">
              <img src="../assets//img/socials/facebook.svg" alt="">
            </a>
            <a class="inline-block px-2" href="https://twitter.com/EthereumXcom" target="_blank">
              <img src="../assets/img/socials/twitter.svg" alt="EthereumX Twitter">
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Web3 from "web3";

export default {
  name: 'Tokensale',
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  data(){
    return {
       metamaskInstalled:true,
       metaMaskShow:false
    }
  },
  props: {
    msg: String,
    countdown: countdown,
    copyToClipboard: copyToClipboard,

  },
  methods:{
    connectMetaMask: async function() {
      if (typeof window.ethereum == 'undefined') {
        this.metamaskInstalled = false;
      }else {
        this.metaMaskShow = true;
        window.ethereum.on('notification', function(payload) {
          console.log(payload);
        });
        
        let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        let params = [
          {
            from: account,
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
          console.log(web3);
        }
        
    }
  }
}


function countdown() {
  return {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
    distance: 0,
    countdown: null,
    countTime: new Date('Aug 10, 2021 00:00:00').getTime(),
    now: new Date().getTime(),
    start: function () {
      this.countdown = setInterval(() => {
        // Calculate time
        this.now = new Date().getTime();
        this.distance = this.countTime - this.now;
        // Set Times
        this.days = this.padNum(Math.floor(this.distance / (1000 * 60 * 60 * 24)));
        this.hours = this.padNum(Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes = this.padNum(Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds = this.padNum(Math.floor((this.distance % (1000 * 60)) / 1000));
        // Stop
        if (this.distance < 0) {
          clearInterval(this.countdown);
          this.days = '00';
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
        }
      }, 100);
    },
    padNum: function (num) {
      var zero = '';
      for (var i = 0; i < 2; i++) {
        zero += '0';
      }
      return (zero + num).slice(-2);
    }
  }
}

function copyToClipboard() {
  var copyText = document.getElementById("address");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}
</script>

