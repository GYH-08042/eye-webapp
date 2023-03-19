<template>
  <div class="UserTitle">
    <van-button icon="arrow-left" type="primary" color="white" icon-color="black" @click="back" />
    <div v-text="title" class="text"></div>
    <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" theme="dark"
      placement="bottom-end">
      <template #reference>
        <van-button icon="ellipsis" type="primary" color="white" class="ellipsis" />
      </template>
    </van-popover>
    <van-dialog v-model="show" title="编辑个人信息" show-cancel-button @confirm="submit" @cancel="clean">
      <van-field v-model="uname" label="昵称" placeholder="修改昵称" :rules="[{ required: true, message: '请填写昵称' }]" />
      <van-field v-model="sign" label="签名" placeholder="修改个性签名" :rules="[{ required: true, message: '请填写个性签名' }]" />
      <van-field v-model="password" type="password" label="密码" placeholder="修改密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
    </van-dialog>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      actions: [{ text: '修改个人信息', icon: 'more-o' }],
      showPopover: false,
      show: false,
      uname: this.nickName,
      sign: this.introduceSign,
      password: ''
    }
  },
  computed: {
    ...mapState('user', ['nickName', 'introduceSign']),
    values() {//收集修改个人信息的表单数据
      return [this.uname, this.sign, this.password]
    }
  }
  ,
  props: {
    title: {
      type: String,
      default: '请传入标题'
    }
  },
  methods: {
    ...mapActions('user', ['getEditInfo']),
    //点击右上角菜单
    onSelect(action) {
      switch (action.text) {//点击弹出编辑框
        case "修改个人信息":
          this.show = true;
          break;
      }
    },
    //点击左上角返回
    back() {
      if (this.maskshow) {
        this.$parent.maskshow = false;
      } else {
        this.$router.replace('/home')
      }
    },
    //提交修改个人信息表单
    async submit() {
      if (this.values.every((item) => {//判断用户是否输入了
        return item != ''
      })) {
        await this.getEditInfo(this.values)//输入则调接口
        this.clean()//清空编辑表单
      } else {
        Dialog.confirm({ message: '数据不能为空，请重新填写！' })//输入不合规弹出提示框
        this.clean()//清空编辑表单
      }
    },
    //清空编辑表单
    clean() {
      this.uname = this.nickName,
        this.sign = this.introduceSign,
        this.password = ''
    }
  }


}
</script>

<style lang="scss">
/* 修改整体高度 */
.UserTitle {
  height: 1.1733rem;
  border-bottom: 1.5px solid #f6f6f6;
  display: flex;
  background-color: white;

  // 两侧按钮宽高
  &>.van-button {
    height: 100%;
    flex: 1;
    padding: 0 .3rem;

    .van-icon {
      color: gray;
      font-size: .4rem;
      line-height: .6533rem;
    }
  }

  //右上角菜单按钮宽高
  .van-popover__wrapper {
    height: 100%;
    flex: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .van-button {
      flex: 1;
      width: 100%;
      height: 100%;

      &::before {
        border: 0;
      }

      .van-icon {
        font-size: .4rem;
        color: gray;
        line-height: .6533rem;
      }
    }
  }

  /* 修改标题大小 */
  .text {
    height: 100%;
    flex: 15;
    line-height: 1.1733rem;
    font-size: .5rem;
    text-align: center;
  }


}

//弹出菜单栏宽度(同时也影响了购物车和分类页面的弹出菜单栏的宽度，因为这个元素和app是平级的)
.van-popover__action {
  width: 4rem;
}
</style>
