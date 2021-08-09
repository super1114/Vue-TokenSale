<template>
  <div class="modal">
      <div class="modal_header">{{header_txt}}</div>
      <div class="modal_body">
          {{body_txt}}
      </div>
      <div class="modal_footer">
        <button class="close_btn">Close</button>
      </div>
  </div>
</template>

<script>
export default {
  name:"Modal",
  props:{
      header_txt: String,
      body_txt: String
  }
}
</script>

<style>
  div.modal {
      z-index: 100;
      color: black;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
  }
</style>