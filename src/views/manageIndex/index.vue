<template>
  <div class="root">
    <div class="wapper">
      <div class="logo">
        <GreenLogo></GreenLogo>
      </div>
      <div class="common-layout">
        <el-container>
          <el-aside width="280px">
            <div class="aside_menu_list">
              <ul class="aside_menu_items">
                <li class="aside_menu_item" v-for="(menuitem, index) in asideMenuList"
                  @click="selectMenu(index, menuitem.path)" :class="{ active: selectedIndex === index }">
                  <div class="aside_menu_item_icon">
                    <img v-if="menuitem.icon" :src="selectedIndex === index ? menuitem.icon2 : menuitem.icon" />
                  </div>
                  <div class="aside_menu_item_title" :style="selectedIndex === index ? activeTitleStyle : {}">
                    {{ menuitem.title }}
                  </div>
                </li>
              </ul>
            </div>
          </el-aside>
          <el-container>
            <el-header>
              <div class="userInfo">
                <div class="avater"></div>
                <div class="info">
                  <div class="userName">{{ useStore.userInfo.userName }}</div>
                  <div class="role">{{ roleSelect(useStore.userInfo.role) }}</div>
                </div>
              </div>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../store/user";
import { getStorage,removeStorge } from "../../utils/storage";
import { roleSelect, reRoleSelect } from "../../utils/common";
const router = useRouter();
const useStore = useUserStore();
const choiceItem = ref("choiceItem");
const choiceTitle = ref("choiceTitle");
const activeTitleStyle = {
  fontWeight: "bold",
  fontSize: "20px",
  color: "#333",
};
let asideMenuList = reactive([
  {
    title: "用户管理",
    icon: "/public/用户管理.png",
    icon2: "/public/用户管理_black.png",
    path: '/manageIndex/userManage'
  },
  {
    title: "科普文章管理",
    icon: "/public/文章管理.png",
    icon2: "/public/文章管理_black.png",
    path: '/manageIndex/articalManage'
  },
  {
    title: "垃圾回收管理",
    icon: "/public/垃圾回收.png",
    icon2: "/public/垃圾回收_black.png",
    path: '/manageIndex/garbageRecycleManage'
  },
  {
    title: "积分换购管理",
    icon: "/public/积分换购.png",
    icon2: "/public//积分换购_black.png",
    path: '/manageIndex/pointShopManage'
  },
  {
    title: "数据统计",
    icon: "/public/数据统计.png",
    icon2: "/public/数据统计_black.png",
    path: '/manageIndex/dataManage'
  },
  {
    title: "退出",
    icon: "/public/退出.png",
    icon2: "/public/退出_black.png",
    path: '/login'
  },
]);
let selectedIndex = ref(0);
// 点击菜单项时更新状态
const selectMenu = (index: any, path: string) => {
  if(path=="/login"){
    removeStorge("token")
  }
  selectedIndex.value = index;
  router.push(path)
};
const titleChange = (index: number) => {

}


const itemChange = (index: number) => {

};
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;

  .wapper {
    width: 1780px;
    height: 880px;
    border-radius: 40px;
    background-color: #fbfbfb;
    position: relative;

    // display: flex;
    // justify-content: center;
    // align-items: center;
    .logo {
      display: inline-block;
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
}

.el-header {
  position: relative;
  margin-top: 20px;
}

.userInfo {
  display: flex;
  position: absolute;
  right: 20px;
  top: 10px;

  .avater {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #ffc145;
    margin-right: 10px;
    background-image: url("/public/vite.svg");
    background-size: contain;
  }

  .info {
    .userName {
      font-family: DM Sans, DM Sans;
      font-weight: 700;
      font-size: 14px;
      color: #404040;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .role {
      font-family: DM Sans, DM Sans;
      font-weight: 400;
      font-size: 14px;
      color: #aeaeae;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}

.common-layout {
  width: 100%;
  height: 100%;

  .el-container {
    width: 100%;
    height: 100%;

    .el-aside {
      border-right: 1px solid #ebebeb;
    }
  }
}

.choiceItem {
  background-color: #f2f2f2;
}

.choiceTitle {
  color: #333;
}

.aside_menu_list {
  width: 100%;
  box-sizing: border-box;
  margin-top: 160px;
  padding-left: 72px;

  .aside_menu_items {
    padding: 5px;

    .aside_menu_item {
      display: flex;
      width: 184px;
      height: 40px;
      border-radius: 4px;
      color: #bdbdbd;
      cursor: pointer;
      transition: all 0.3s ease;
      // background-color: #f2f2f2;
      margin-bottom: 10px;

      .aside_menu_item_icon {
        width: 40px;
        height: 40px;
        margin-left: 10px;
        line-height: 40px;
        margin-right: 10px;

        img {
          width: 30px;
          height: 30px;
          margin-top: 5px;
        }
      }

      .aside_menu_item_title {
        height: 40px;
        font-weight: 700;
        font-size: 18px;
        line-height: 40px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .aside_menu_item.active {
      background-color: #f0f0f0;
      border-radius: 4px;
    }

    .aside_menu_item.active .aside_menu_item_icon img {
      transform: scale(1.2);
    }

    .aside_menu_item_title {
      transition: all 0.3s ease;
    }
  }
}
</style>
