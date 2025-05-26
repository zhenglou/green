import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setStorage, getStorage } from "../utils/storage";
import { getTokenAvailable } from "../api/user"
import Index from '../views/index/index.vue'
import { useUserStore } from '../store/user';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ()=> import('../views/error/ForgetPassword.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/manageIndex',
    name: 'ManageIndex',
    redirect: "/manageIndex/userManage",
    component: () => import('../views/manageIndex/index.vue'),
    children: [
      {
        path: 'userManage',
        name: 'UserManage',
        component: () => import('../views/userManage/index.vue'),
      },
      {
        path: 'articalManage',
        name: 'ArticalManage',
        component: () => import('../views/articalManage/index.vue'),
        redirect:'/manageIndex/articalManage/gabageKnowledge',
        children:[
          {
            path: 'enviromentKnowledge',
            name: 'EnviromentKnowledge',
            component: () => import('../views/articalManage/components/enviromentKnowledge/index.vue'),
          },
          {
            path: 'gabageKnowledge',
            name: 'GabageKnowledge',
            component: () => import('../views/articalManage/components/gabageKnowledge/index.vue'),
          }
        ]
      },
      {
        path: 'dataManage',
        name: 'DataManage',
        component: () => import('../views/dataManage/index.vue'),
      },
      {
        path: 'garbageRecycleManage',
        name: 'GarbageRecycleManage',
        component: () => import('../views/garbageRecycleManage/index.vue'),
        redirect:'/manageIndex/garbageRecycleManage/recyclingOrders',
        children:[
          {
            path: 'recyclingOrders',
            name: 'RecyclingOrders',
            component: () => import('../views/garbageRecycleManage/components/recyclingOrders/index.vue'),
          },
          {
            path: 'recoveryPrice',
            name: 'RecoveryPrice',
            component: () => import('../views/garbageRecycleManage/components/recoveryPrice/index.vue'),
          }
        ]
      },
      {
        path: 'pointShopManage',
        name: 'PointShopManage',
        component: () => import('../views/pointShopManage/index.vue'),
        redirect:'/manageIndex/pointShopManage/goodsManage',
        children:[
          {
            path: 'goodsManage',
            name: 'GoodsManage',
            component: () => import('../views/pointShopManage/components/goodsManage/index.vue'),
          },
          {
            path: 'goodsOrders',
            name: 'GoodsOrders',
            component: () => import('../views/pointShopManage/components/goodsOrders/index.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
const whiteList = ["/","/forgetPassword"];
router.beforeEach(async (to, from, next) => {
  // 如果去的是首页 直接授权进入
  if (whiteList.includes(to.path)) return next();
  const userStore = useUserStore();
  const token = getStorage("token");
  let tokenAvailable: boolean = false;
  if (token) {
    // 如果token存在 则调用服务端判断是否过期
    try{
      tokenAvailable = ((await getTokenAvailable(token)).data).data;
    }catch(e){
      tokenAvailable = true;
    }
    
    if (!tokenAvailable && !userStore.userInfo) {
      userStore.userInfoRefresh(token);
    }
  }

  // 如果token过期或不存在 进入登录页
  if (/\/login/i.test(to.path)) {
    // 如果不存在或过期 直接放行
    if (!token || tokenAvailable) return next();
    // 如果存在且没过期 跳转到首页
    if (!tokenAvailable) {
      if (!userStore.userInfo) {
        userStore.userInfoRefresh(token);
      }
      return next("/manageIndex");
    }
    // token存在但过期

    ElMessage("token过期，请重新登录");
    return next();
    // return next();
  }
  if (!token || tokenAvailable) {
    ElMessage("token过期或不存在，请重新登录");
    return next("/login");
  }

  /* 
  TODO：
        1.判断token是否存在 不存在直接进入登录页 存在进入第二步
        2.判断token是否过期 如果过期重新登陆 没过期进入第三步
        3.判断store用户信息是否存在 不存在重新获取并存入store然后放行 存在则直接放行。
  */
  next();
})
export default router
