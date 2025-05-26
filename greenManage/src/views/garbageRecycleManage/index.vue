<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <div class="user_container">
          <div class="user_search">
            <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
            <div class="search_message">搜索</div>
          </div>
          <div class="addUser">
            <el-button size="large" style="margin-left: 20px; box-shadow: 4px 4px 20px 0px rgba(92, 92, 92, 0.1);"
              @click="addInfoClick">{{ buttonLabel }}</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul class="user_main_aside_menu_items">
            <li class="user_main_aside_menu_item">
              <!-- <em class="user_main_aside_menu_item_icon"></em> -->
              <p class="user_main_title" @click="selectIndex(0, '/manageIndex/garbageRecycleManage/recyclingOrders')"  :style="selectedIndex == 0 ? activeTitleStyle : {}">订单管理
              </p>
              <p class="user_main_title" @click="selectIndex(1, '/manageIndex/garbageRecycleManage/recoveryPrice')"  :style="selectedIndex == 1 ? activeTitleStyle : {}">回收价管理
              </p>
            </li>
          </ul>

        </el-aside>
        <el-main>
          <router-view :msg="searchMessage"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible" title="添加订单" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="用户ID" prop="userId">
        <el-select v-model="ruleForm.userId" placeholder="请选择用户">
          <el-option v-for="v in userInfos" :label="v.userName" :value="v.userId" />
        </el-select>
        <!-- <el-input v-model="ruleForm.userId" type="text" autocomplete="off" /> -->
      </el-form-item>
      <el-form-item label="收件名" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="ruleForm.address" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="预约时间" prop="appointmentTime">
        <el-col :span="11">
          <el-date-picker v-model="date.date1" type="date" placeholder="Pick a date" style="width: 100%"
            format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">&nbsp;and</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker type="time" v-model="date.date2" placeholder="Pick a time" style="width: 100%"
            format="HH:mm:ss" value-format="HH:mm:ss" />
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="预约时间" prop="appointmentTime">
        <el-input v-model="ruleForm.appointmentTime" />
      </el-form-item> -->
      <el-form-item label="垃圾信息" prop="wasteInfo">
        <el-input v-model="ruleForm.wasteInfo" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refresh">取消</el-button>
        <el-button type="primary" @click="addNewInfo">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogVisible2" title="添加价目" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="垃圾类型" prop="wasteName">
        <el-input v-model="ruleForm2.wasteName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="垃圾价格" prop="price">
        <el-input v-model="ruleForm2.price" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm2.description" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refresh2">取消</el-button>
        <el-button type="primary" @click="addNewInfo">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { getAllUserInfo } from '../../api/user';
import { useRouter, useRoute } from 'vue-router';
import { insert as insertRecPri } from '../../api/recPri';
import { insert as insertRecOrd } from '../../api/recOrd';
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'
const message = useMessage();
const router = useRouter()
let searchMessage = ref('');
const route = useRoute();
let dialogVisible = ref(false);
let dialogVisible2 = ref(false);
let date = reactive({
  date1: '',
  date2: ''
})
let ruleForm = reactive({
  userId: '',
  name: '',
  address: '',
  phone: '',
  appointmentTime: '',
  wasteInfo: '',
})
let ruleForm2 = reactive({
  wasteName: "",
  price: "",
  description: ""
})
// 根据路由动态设置按钮文本
const buttonLabel = computed(() => {
  switch (route.name) {
    case 'RecyclingOrders':
      return '添加订单';
    case 'RecoveryPrice':
      return '添加价目';
  }
});
async function addNewInfo() {
  let status;
  try {
    if (route.name == 'RecyclingOrders') {
      ruleForm.appointmentTime = date.date1 + "T" + date.date2
      status = await insertRecOrd(ruleForm)
      if (status.data == 1) {
        message.success("添加成功")
      } else {
        message.warning("添加失败")
      }
    }
    if (route.name == 'RecoveryPrice') {
      status = await insertRecPri(ruleForm2)
      if (status.data == 1) {
        message.success("添加成功")
      } else {
        message.warning("添加失败")
      }
    }
  } catch (err) {
    message.warning("添加失败")
  }
  refresh()
  refresh2()
}
function addInfoClick() {
  if (route.name == 'RecoveryPrice') {
    dialogVisible2.value = true
  }
  if (route.name == 'RecyclingOrders') {
    dialogVisible.value = true
  }
}
function refresh() {
  dialogVisible.value = false,
    ruleForm.userId = '',
    ruleForm.name = '',
    ruleForm.address = ''
  ruleForm.phone = ''
  ruleForm.appointmentTime = ''
  ruleForm.wasteInfo = ''
}
function refresh2() {
  dialogVisible2.value = false,
    ruleForm2.wasteName = '',
    ruleForm2.price = '',
    ruleForm2.description = ''
}
const userInfos = reactive<any[]>([])
async function setAllUserInfo() {
  userInfos.push(...((await getAllUserInfo()).data.data))
}
const activeTitleStyle = reactive({
  fontSize: "18px",
  fontWeight: "Bold",
  color: "pink"
});
let selectedIndex = ref(0);
const selectIndex = (index: any, path: any) => {
  selectedIndex.value = index;
  router.push(path); // 假设 router 已经引入
};
onMounted(() => {
  setAllUserInfo();
})
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.common-layout {
  width: 100%;
  height: 100%;
}

.el-table {
  --el-table-header-bg-color: "";
  --el-table-bg-color: "";
  --el-table-tr-bg-color: "";
}

// >>> .el-table__inner-wrapper:before {
//     display: none !important;
// }
.user_container {
  display: flex;

  .user_search {
    .search_input {
      box-sizing: border-box;
      width: 300px;
      height: 40px;
      box-shadow: 4px 4px 20px 0px rgba(92, 92, 92, 0.1);
      border-radius: 8px 0px 0px 8px;
      border: 1px solid #bdbdbd;
      text-indent: 1em;
      font-size: 16px;
    }

    // .search_message:hover{
    //   background-color: orchid;
    // }
    .search_message:active {
      border: 1px solid rgb(24, 110, 150);
    }

    .search_message {
      box-sizing: border-box;
      cursor: pointer;
      display: inline-block;
      width: 90px;
      height: 40px;
      background: #4F4F4F;
      box-shadow: 4px 4px 20px 0px rgba(92, 92, 92, 0.1);
      border-radius: 0px 8px 8px 0px;
      font-weight: 700;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 40px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-left: -20px;
      vertical-align: top;
    }
  }
}

.el-aside {
  border-right: 1px solid #ebebeb;
  height: 100%;
}

.user_main_aside_menu_item {
  // display: flex;
  box-sizing: border-box;
  padding: 5px;
  width: 180px;
  height: 40px;
  margin-bottom: 20px;

  // .user_main_aside_menu_item_icon {
  //   display: inline-block;
  //   width: 30px;
  //   height: 30px;
  //   background-color: red;
  // }

  .user_main_title {
    cursor: pointer;
    // width: 200px;
    padding: 10px;
    font-weight: 700;
    font-size: 16px;
    color: #4F4F4F;
    transition: all 0.3s ease;
    // line-height: 40px;
  }
}

// .pagination {
//   display: flex;
//   justify-content: flex-end;
//   position: relative;
//   margin-top: 20px;

//   .page {
//     width: 26px;
//     height: 20px;
//     font-family: DM Sans, DM Sans;
//     font-weight: 400;
//     font-size: 16px;
//     color: #404040;
//     line-height: 20px;
//     text-align: left;
//     font-style: normal;
//     text-transform: none;
//     position: absolute;
//     right: 110px;
//     top: 16px;
//   }

//   .nextPage {
//     width: 85px;
//     height: 34px;
//     background: #4F4F4F;
//     box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
//     border-radius: 4px 4px 4px 4px;
//     font-family: Lato, Lato;
//     font-weight: 700;
//     font-size: 14px;
//     color: #FFFFFF;
//     line-height: 20px;
//     text-align: left;
//     font-style: normal;
//     text-transform: none;
//     position: absolute;
//     // right: 60px;
//     top: 10px;
//   }
// }
.addUser {
  position: absolute;
  left: 688px;
}
</style>
