<template>
  <div class="center v-loading">
    <div class="v-loading-box">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  install(app) {
    app.component(this.name, this);
  }
};
</script>

<style lang="scss">
@keyframes loader21 {
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 0.3);
  }
}
.v-loading {
  .v-loading-box {
    width: 200px;
    height: 200px;
    float: left;
    display: flex;
    justify-content: center;
    display: flex;
    align-items: center;
    div {
      width: 5px;
      height: 35px;
      background: #b3b3b3;
      border-radius: 2px;
      display: inline-block;
      margin: 0 3px;
      &:nth-child(1) {
        animation: loader21 0.5s -0.3s ease-in-out infinite alternate;
      }
      &:nth-child(2) {
        animation: loader21 0.5s -0.15s ease-in-out infinite alternate;
      }
      &:nth-child(3) {
        animation: loader21 0.5s 0s ease-in-out infinite alternate;
      }
      &:nth-child(4) {
        animation: loader21 0.5s -0.15s ease-in-out infinite alternate;
      }
      &:nth-child(5) {
        animation: loader21 0.5s -0.4s ease-in-out infinite alternate;
      }
    }
  }
}
</style>
