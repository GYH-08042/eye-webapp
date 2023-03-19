<template>
  <div id="SkipToApp" v-if="ifSkipShow">
    <div>
      <button class="close" @click="$parent.$parent.ifSkipShow = false"></button>
      <div>
        <slot name="icon" class="slot"></slot>
      </div>
      <div v-text="text"></div>
    </div>
    <a href="#" class="open" v-text="buttonText" :style="{ 'backgroundColor': buttonColor }"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    text: { type: String, default: '打开App' },
    buttonText: { type: String, default: '打开' },
    buttonColor: { type: String, default: 'red' },
    ifSkipShow: { type: Boolean, default: true }
  }
}
</script>

<style>
#SkipToApp {
  display: flex;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
}

#SkipToApp>div {
  flex: 1;
  float: left;
  height: 100%;
  background-color: #333333;
}

#SkipToApp .close {
  float: left;
  width: 1rem;
  height: 100%;
  background: url(../assets/close.png) no-repeat center;
  background-size: 25%;
  border: none;
}

#SkipToApp>div>div:nth-of-type(1) img {
  float: left;
  width: .65rem;
  height: .65rem;
  margin: .175rem 0;
}

#SkipToApp>div>div:nth-of-type(2) {
  float: left;
  width: 6.35rem;
  height: 100%;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  font-size: .35rem;
}

#SkipToApp .open {
  float: right;
  width: 2rem;
  height: 100%;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  font-size: .35rem;
}
</style>
