//从node_modules中导入vue模块
import Vue from 'vue'
//导入App组件
import App from './App.vue'
//关于生产环境vue的提示
Vue.config.productionTip = false
//导入路由系统
import router from './router.js'
//导入仓储
import store from './store/index.js'

//按需导入VantUI组件并注册
import { Tabbar, TabbarItem } from 'vant'//底部导航
Vue.use(Tabbar)
Vue.use(TabbarItem)
import { Search } from 'vant';//搜索
Vue.use(Search);
import { Button } from 'vant';//图标按钮
Vue.use(Button);
import { PullRefresh } from 'vant';//下拉刷新
Vue.use(PullRefresh);
import { Swipe, SwipeItem } from 'vant';//轮播图
Vue.use(Swipe);
Vue.use(SwipeItem);
import { Lazyload } from 'vant';//图片懒加载指令
Vue.use(Lazyload);
import { Grid, GridItem } from 'vant';//宫格
Vue.use(Grid);
Vue.use(GridItem);
import { CountDown } from 'vant';//倒计时
Vue.use(CountDown);
import { List } from 'vant';//触底加载
Vue.use(List);
import { Popover } from 'vant';//气泡弹出框
Vue.use(Popover);
import { Sidebar, SidebarItem } from 'vant';//侧边导航
Vue.use(Sidebar);
Vue.use(SidebarItem);
import { Card } from 'vant';//商品卡片
Vue.use(Card);
import { SwipeCell } from 'vant';//滑动单元格
Vue.use(SwipeCell);
import { RadioGroup, Radio } from 'vant';//单选框
Vue.use(Radio);
Vue.use(RadioGroup);
import { Checkbox, CheckboxGroup } from 'vant';//复选框
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
import { SubmitBar } from 'vant';//提交订单
Vue.use(SubmitBar);
import { Cell, CellGroup } from 'vant';//单元格
Vue.use(Cell);
Vue.use(CellGroup);
import { Empty } from 'vant';//空状态
Vue.use(Empty);
import { Form } from 'vant';//表单
import { Field } from 'vant';//输入框
Vue.use(Form);
Vue.use(Field);
import { Dialog } from 'vant';//弹出框
Vue.use(Dialog);
import { AddressList } from 'vant';//地址列表
Vue.use(AddressList);
import { AddressEdit } from 'vant';//地址编辑
Vue.use(AddressEdit);
import { Overlay } from 'vant';//遮罩层
Vue.use(Overlay);
import { NavBar } from 'vant';//导航栏
Vue.use(NavBar);
import { Sticky } from 'vant';//粘性布局
Vue.use(Sticky);
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';//商品导航
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
import { Stepper } from 'vant';//步进器
Vue.use(Stepper);
import { DropdownMenu, DropdownItem } from 'vant';//下拉菜单
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
import { Tab, Tabs } from 'vant';//标签页
Vue.use(Tab);
Vue.use(Tabs);
import { Step, Steps } from 'vant';//步骤条
Vue.use(Step);
Vue.use(Steps);
import { Tag } from 'vant';//标签
Vue.use(Tag);
import { Icon } from 'vant';//icon图标
Vue.use(Icon);
//按需引入vantUI组件样式原文件
import 'vant/lib/tabbar/style/less'
import 'vant/lib/search/style/less'
import 'vant/lib/button/style/less'
import 'vant/lib/pull-refresh/style/less'

//按需导入ElementUI组件并注册
import { Backtop } from 'element-ui';//回顶部按钮
Vue.use(Backtop)

//导入移动端适配
import 'amfe-flexible/index.js'

//导入自定义指令
import './utils/directive.js'

new Vue({
  render: h => h(App),
  //挂载路由系统
  router,
  //挂载状态管理
  store
}).$mount('#app')

