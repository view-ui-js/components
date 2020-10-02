<template>
   <div class="vi-loading-line">
      <div class="progress vt-main"></div>
   </div>
</template>

<script>
export default {
  name: "LoadingLine",
  install(Vue){
    Vue.component(this.name, this);
  }
};
</script>

<style lang="scss">
.vi-loading-line {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 2px;
  overflow: hidden;
  .progress {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 35%;
    border-radius: 1px;
    animation: linearProgress 1.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
}

@keyframes linearProgress {
  from {
    left: -60%;
  }
  to {
    left: 100%;
  }
}

@-webkit-keyframes linearProgress {
  from {
    left: -30%;
  }
  to {
    left: 100%;
  }
}
</style>
