<template>
  <div class="bg-gray-100"> 
    
    <div class="relative">
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

    <section class="text-black py-6 overflow-auto">
      <div class="text-3xl text-center w-full items-center justify-center pb-4">
        Round <b>1</b> (<b>250 ETHX / ETH</b>)
        <br/>
        <br/>
        <p class="text-xl text-gray-400">NEXT round (higher price) in&nbsp;</p>
      </div>
      <div class="text-6xl text-center flex w-full items-center justify-center pb-6">

        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none">{{days}}</div>
          <div class="font-mono uppercase text-sm leading-none">Days</div>
        </div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none">{{hours}}</div>
          <div class="font-mono uppercase text-sm leading-none">Hours</div>
        </div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none">{{minutes}}</div>
          <div class="font-mono uppercase text-sm leading-none">Minutes</div>
        </div>
        <div class="text-2xl mx-1 font-extralight">and</div>
        <div class="w-24 mx-1 p-2 bg-black text-white rounded-lg">
          <div class="font-mono leading-none">{{seconds}}</div>
          <div class="font-mono uppercase text-sm leading-none">Seconds</div>
        </div>
      </div>

    </section>

    <!-- Tokensale address part -->
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
            <li class="px-6 py-4 bg-white rounded shadow">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  @click="selected !== 1 ? selected = 1 : selected = null"
              >
                <span>When does the token sale end?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p  class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container1"
                v-bind:style="selected == 1 ? 'max-height: ' + $refs.container1.scrollHeight + 'px' : ''"
              >
                You will have until 11am UTC
                to contribute a maximum of 1 ETH. After 11am UTC, if we haven’t met our funding goal, the
                max contribution cap will be lifted and we will be accepting additional contributions until
                our funding goal is reached.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading text-blue-600 hover:text-blue-700"
                @click="selected !== 2 ? selected = 2 : selected = null"
              >
                <span>How much can I contribute?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-500" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container2"
                v-bind:style="selected == 2 ? 'max-height: ' + $refs.container2.scrollHeight + 'px' : ''"
              >
                You can send a maximum of 1 ETH
                Until 11am UTC. After 11am UTC if we haven’t met our funding goal we will lift our max cap
                and you can send unlimited funds until we reach our goal.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button
                  class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                  @click="selected !== 3 ? selected = 3 : selected = null"
                >
                <span>Is there a minimum contribution?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class=" mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container3"
                v-bind:style="selected == 3 ? 'max-height: ' + $refs.container3.scrollHeight + 'px' : ''"
              >
                Yes, 0.01 ETH.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                @click="selected !== 4 ? selected = 4 : selected = null"
              >
                <span>What happens if I send more ETH than the maximum amount?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container4"
                v-bind:style="selected == 4 ? 'max-height: ' + $refs.container4.scrollHeight + 'px' : ''"
              >
                If you send more than 1 ETH
                before 11am UTC, any excess funds will be returned to your wallet.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                @click="selected !== 5 ? selected = 5 : selected = null"
              >
                <span>Can I send money from an exchange wallet like Coinbase?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container5"
                v-bind:style="selected == 5 ? 'max-height: ' + $refs.container5.scrollHeight + 'px' : ''"
              >
                No, do not send money from an
                exchange wallet. If for any reason we need to return funds back to your wallet, funds that
                were originally sent from an exchange wallet will be lost and you will not be able to
                receive the tokens you purchase.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                @click="selected !== 6 ? selected = 6 : selected = null"
              >
                <span>When will i receive my tokens?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container6"
                v-bind:style="selected == 6 ? 'max-height: ' + $refs.container6.scrollHeight + 'px' : ''"
              >
                Immediately after the token
                sale ends. Tokens will not be transferable for up to 30 days.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                @click="selected !== 7 ? selected = 7 : selected = null"
              >
                <span>How do i know that my contribution was successfully accepted?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container7"
                v-bind:style="selected == 7 ? 'max-height: ' + $refs.container7.scrollHeight + 'px' : ''"
              >
                 After we receive your
                contribution a confirmation email of the transaction will be sent to the email address
                provided when you joined the whitelist. You can also confirm if the the transaction went
                through from your wallet.</p>
            </li>
            <li class="px-6 py-4 bg-white rounded shadow">
              <button class="w-full flex justify-between items-center text-left font-bold font-heading hover:text-blueGray-700"
                @click="selected !== 8 ? selected = 8 : selected = null"
              >
                <span>How can I trust I am sending to the official EthereumX address?</span>
                <svg class="w-4 h-4 ml-2 text-blueGray-300" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <p class="mt-2 text-blueGray-400 font-normal leading-loose relative overflow-hidden transition-all max-h-0 duration-700"
                ref="container8"
                v-bind:style="selected == 8 ? 'max-height: ' + $refs.container8.scrollHeight + 'px' : ''"
              >
                Always triple check that you
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
import Web3 from "web3"
import PresaleJson from "../../contracts/Presale.json"
export default {
  name: 'Tokensale',
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
       countTime:new Date('Aug 30, 2021 00:00:00').getTime(),
       days:"00",
       hours:"00",
       minutes:"00",
       seconds:"00",
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
    this.startCountDown()
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
    padNum: function (num) {
      var zero = '';
      for (var i = 0; i < 2; i++) {
        zero += '0';
      }
      return (zero + num).slice(-2);
    },
    startCountDown: function () {
      setInterval(() => {
        this.now = new Date().getTime()
        this.distance = this.countTime - this.now;
        this.days = this.padNum(Math.floor(this.distance / (1000 * 60 * 60 * 24)));
        this.hours = this.padNum(Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes = this.padNum(Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds = this.padNum(Math.floor((this.distance % (1000 * 60)) / 1000));
        if (this.distance < 0) {
          clearInterval(this.countdown);
          this.days = '00';
          this.hours = '00';
          this.minutes = '00';
          this.seconds = '00';
        }
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