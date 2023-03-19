<template>
  <div class="AddressCard">
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" switchable @add="onAdd" @edit="onEdit"
      @select="onSelect">
      <van-empty v-show="!list" description="暂无地址" />
    </van-address-list>
    <div v-if="ifOperate" class="edit">
      <van-nav-bar title="地址编辑" left-text="返回" left-arrow @click-left="onClickLeft" />
      <van-address-edit :area-list="areaList" show-delete :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :address-info="init" @save="onSave" @delete="onDelete" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { areaList } from '@vant/area-data'//从vant导入默认的省市区数据
import { Toast } from 'vant';

export default {
  data() {
    return {
      areaList,
      ifOperate: false, //控制编辑框的显示与隐藏
      changeOrAdd: '',//记录用户点击的是编辑按钮还是新增地址按钮，用于判断地址编辑框点击保存时调用新增还是修改接口
      chosenAddressId: ''//在地址列表给默认地址打钩钩，根据addressId
    };
  },
  computed: {
    ...mapState("user", ["addressList", 'defaultAddress', 'addressDetail']),
    //对仓库中的地址列表做数据处理，按组件要求的数据格式进行渲染
    list() {
      const list = []
      if (this.addressList) {
        Object.values(this.addressList).forEach(({ addressId, cityName, defaultFlag, detailAddress, provinceName, regionName, userName, userPhone }) => {
          list.push({
            id: addressId,
            name: userName,
            tel: userPhone,
            address: `${provinceName}省${cityName}市${regionName}区${detailAddress}`,
            isDefault: defaultFlag == '0001' ? true : false
          })
          if (defaultFlag == '0001') { this.chosenAddressId = addressId }//给默认地址打钩钩
        })
      }
      return list
    },
    //编辑框的初始数据处理，点谁就显示谁的
    init() {
      if (this.changeOrAdd == 'add') {//如果点击新增地址，表单保持空值
        return {}
      } else {
        //点击直接用changeOrAdd作为索引取值传参
        const cityName = this.addressList[this.changeOrAdd].cityName
        const areaCode = Object.keys(this.areaList.city_list)[Object.values(this.areaList.city_list).indexOf(cityName)]
        return {
          id: this.addressList[this.changeOrAdd].addressId,
          name: this.addressList[this.changeOrAdd].userName,
          tel: this.addressList[this.changeOrAdd].userPhone,
          province: this.addressList[this.changeOrAdd].provinceName,
          city: this.addressList[this.changeOrAdd].cityName,
          county: this.addressList[this.changeOrAdd].regionName,
          addressDetail: this.addressList[this.changeOrAdd].detailAddress,
          isDefault: this.addressList[this.changeOrAdd].defaultFlag == '0001' ? true : false,
          areaCode
        }
      }
    }
  },
  mounted() {
    //如果没有地址列表数据则请求
    if (!this.addressList) {
      this.getAddressList();
    }
    this.chosenAddressId = this.defaultAddress.addressId
  },
  methods: {
    ...mapActions("user", ["getAddressList", 'getAddAddress', 'getEditAddress', 'getDefaultAddress', 'getDeleteAddress', 'getAddressDetail']),
    //切换钩钩就告诉后端要重选默认地址
    onSelect(item) {
      if (item.id != this.defaultAddress.addressId) {//点击原本的默认地址，不会触发
        console.log('切换默认地址---')
        this.getAddressDetail(this.defaultAddress.addressId) //旧默认地址取消标记  
        this.getAddressDetail(item.id)//新默认地址更新标记
        this.getDefaultAddress()//重新获取默认地址更新到usercard
      }

    },
    //点击添加地址
    onAdd() {
      this.ifOperate = true; //显示编辑框
      this.changeOrAdd = 'add'//告诉地址编辑框本次操作用于新增地址
    },
    //点击编辑地址
    onEdit(item, index) {
      this.ifOperate = true; //显示编辑框
      this.changeOrAdd = index//告诉地址编辑框本次操作用于修改地址,并记录所操作的地址在列表中的索引号
    },
    //在编辑界面点击保存
    async onSave(content) {
      const data = {//表单数据处理，调为后端需要的格式
        cityName: content.city,
        defaultFlag: content.isDefault ? '0001' : '0000',
        detailAddress: content.addressDetail,
        provinceName: content.province,
        regionName: content.county,
        userName: content.name,
        userPhone: content.tel,
      }
      if (this.changeOrAdd == 'add') {//新增就调取新增地址接口
        await this.getAddAddress(data)
      } else {//修改就调取修改地址接口
        data.addressId = this.addressList[this.changeOrAdd].addressId
        await this.getEditAddress(data)
      }
      this.ifOperate = false//关闭编辑框
    },
    //在编辑界面点击删除
    onDelete() {
      console.log('点击删除---', this.list[this.changeOrAdd])
      if (this.list[this.changeOrAdd].isDefault) {
        Toast('不可删除默认地址\n请切换默认地址后再进行删除操作')
      } else {
        this.getDeleteAddress(this.addressList[this.changeOrAdd].addressId)
      }
      this.ifOperate = false;//关闭编辑框
    },
    //在编辑界面点击返回
    onClickLeft() {
      this.ifOperate = false;//关闭编辑框
    },
  },
  components: {}
}
</script>


<style lang="scss">
.AddressCard {
  height: 100%;

  //地址列表框
  .van-address-list {
    padding: 0;

    //信息盒
    .van-address-item__value {
      padding-right: 0;
      flex: 4;

      //姓名电话字体大小
      .van-address-item__name {
        font-size: .28rem
      }

      //详细地址字体大小
      .van-address-item__address {
        font-size: .28rem
      }
    }

    //编辑按钮
    .van-address-item__edit {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      transform: translate(0, 0);

      &::before {
        font-size: .5rem;
      }
    }

    // 按钮盒子
    .van-address-list__bottom {
      box-sizing: border-box;
      height: 1rem;
      padding: 0;
      z-index: 0;
      //新增地址按钮wrapper背景色清空
      background-color: transparent;

      // 按钮
      .van-button--round {
        box-sizing: border-box;
        height: 100%;
        border-radius: .5rem;
        font-size: .2rem;
      }


    }
  }


  //地址编辑框
  .edit {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: white;

    //详细地址盒子
    .van-address-edit-detail .van-cell {
      padding: 0
    }

    //保存删除取消按钮
    .van-address-edit__buttons {
      box-sizing: border-box;
      padding: 0;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: inherit;

      .van-button--round {
        box-sizing: border-box;
        height: 1rem;
        border-radius: .5rem;
        margin-bottom: 0;
        margin-top: .16rem;
        font-size: .2rem;

      }

    }
  }
}
</style>
