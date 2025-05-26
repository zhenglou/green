<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <div class="user_container">
          <div class="user_search">
            <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
            <div class="search_message" @click="search">搜索
            </div>
          </div>
          <div class="addUser">
            <el-button size="large" style="margin-left: 20px; box-shadow: 4px 4px 20px 0px rgba(92, 92, 92, 0.1);"
              @click="dialogVisible = true">添加用户</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <ul class="user_main_aside_menu_items">
            <li class="user_main_aside_menu_item">
              <!-- <em class="user_main_aside_menu_item_icon"></em> -->
              <p class="user_main_title">用户管理</p>
            </li>
          </ul>

        </el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%; height: 555px;">
            <el-table-column prop="userId" label="用户ID"  width="80px"/>
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="password" label="密码" />
            <el-table-column prop="phone" label="手机号" />
            <el-table-column prop="role" label="职位" />
            <el-table-column prop="signInStreak" label="连续签到数" />
            <el-table-column prop="experience" label="经验" />
            <el-table-column prop="points" label="积分" />
            <el-table-column prop="createTime" label="创建时间" />
            <el-table-column fixed="right" label="操作" min-width="120">
              <template #default="scope">
                <el-popconfirm title="确定删除?" @confirm="deleteUser(scope.$index)">
                  <template #reference>
                    <el-button link type="primary" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
                <el-button link type="primary" size="small" @click="updateClick(scope.$index)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <div class="page">
              <span>{{ pageStart }}</span><span>/</span><span>{{ pageEnd }}</span>
            </div>
            <el-button class="nextPage" size="large" @click="pageChange">下一页</el-button>
            <el-button class="lastPage" size="large" @click="pageChange2">上一页</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible" title="添加用户" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>
      <el-form-item label="职位" prop="role">
        <el-radio-group v-model="ruleForm.role" size="large">
          <el-radio-button label="普通用户" value="1" />
          <el-radio-button label="回收员" value="2" />
          <el-radio-button label="管理员" value="9" />
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refresh">取消</el-button>
        <el-button type="primary" @click="addNewUser">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible2" title="用户信息修改" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="ruleForm2.userId" type="text" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm2.userName" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm2.password" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone" />
      </el-form-item>
      <el-form-item label="职位" prop="role">
        <el-radio-group v-model="ruleForm2.role" size="large">
          <el-radio-button label="普通用户" value="1" />
          <el-radio-button label="回收员" value="2" />
          <el-radio-button label="管理员" value="9" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="连续签到数" prop="signInStreak">
        <el-input v-model="ruleForm2.signInStreak" />
      </el-form-item>
      <el-form-item label="经验" prop="experience">
        <el-input v-model="ruleForm2.experience" />
      </el-form-item>
      <el-form-item label="积分" prop="points">
        <el-input v-model="ruleForm2.points" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="ruleForm2.createTime" disabled />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refresh2">取消</el-button>
        <el-button type="primary" @click="updateNewUser">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>
<script lang="ts" setup>
import { getAllUserInfo, deleteOne, selectOne, update, increaseUserByUser, selectByPage, selectByName } from '../../api/user';
import { reRoleSelect, roleSelect } from '../../utils/common';


const message = useMessage();
let searchMessage = ref('');
let dialogVisible = ref(false)
let dialogVisible2 = ref(false)
let tableData = reactive<any[]>([]);
let rawTableData: any[] = []
// 添加用户
let ruleForm = reactive({
  userName: '',
  password: '',
  phone: '',
  role: ''
})
let ruleForm2 = reactive({
  userId: '',
  userName: '',
  password: '',
  phone: '',
  role: '',
  signInStreak: '',
  experience: '',
  points: '',
  createTime: ''
})
function refresh() {
  dialogVisible.value =false,
  ruleForm.userName = '',
    ruleForm.password = '',
    ruleForm.phone = '',
    ruleForm.role = ''
}
function refresh2() {
  dialogVisible2.value = false,
  ruleForm2.userId = '',
    ruleForm2.userName = '',
    ruleForm2.password = '',
    ruleForm2.phone = ''
  ruleForm2.role = '',
    ruleForm2.signInStreak = '',
    ruleForm2.experience = '',
    ruleForm2.points = ''
  ruleForm2.createTime = ''
}
async function addNewUser() {
  let status;
  try {
    status = await increaseUserByUser(ruleForm)
    if (status.data.data == 1) {
      message.success("添加成功")
    } else {
      message.warning("添加失败")
    }
  } catch (err) {
    message.warning("添加失败")
  }
  refresh()
}
function updateClick(index: number) {
  dialogVisible2.value = true
  ruleForm2 = Object.assign(ruleForm2, rawTableData[index]);
}
async function updateNewUser() {
  let status;
  let rawRuleForm2 = toRaw(ruleForm2)
  try {
    status = await update(toRaw(rawRuleForm2))
    console.log(status);

    if (status.data == 1) {
      message.success("修改成功")
    } else {
      message.warning("修改失败")
    }
  } catch (err) {
    message.warning("修改失败")
  }
  refresh2()
  dialogVisible2.value = false
}
// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('Are you sure to close this dialog?')
//     .then(() => {
//       done()
//     })
//     .catch(() => {

//     })
// }
// 删除用户
const deleteUser = (index: number) => {
  deleteOne(tableData[index].userId)
  tableData.splice(index, 1)
  rawTableData.splice(index, 1)
  // deleteOne(tableData[index].userId)
}
async function dealTableData() {
  tableData.splice(0, tableData.length); // 清空 reactive 数组
  rawTableData = []; // 重新赋值为空数组
  let rawTableData2 = (await selectByPage(pageStart.value)).data;
  rawTableData2 = rawTableData2.map((user: { role: number; }) => {
    if (user.role === 9) {
      return { ...user, role: "管理员" };
    } else if (user.role === 1) {
      return { ...user, role: "普通用户" };
    } else if (user.role === 2) {
      return { ...user, role: "回收员" };
    }
    return user; // 不需要修改的返回原对象
  });
  tableData.push(...rawTableData2)
  rawTableData.push(...((await selectByPage(pageStart.value)).data))
}
async function dealPage() {
  const userInfos = await getAllUserInfo();
  console.log(userInfos);
  pageEnd.value = Math.ceil(userInfos.data.data.length / 6);
}
function pageChange() {
  pageStart.value++
  if (pageStart.value > pageEnd.value) {
    pageStart.value = 1;
  }
  dealTableData()
}
function pageChange2() {
  pageStart.value--
  if (pageStart.value < 1) {
    pageStart.value = 1;
  }
  dealTableData()
}
async function search() {
  tableData.splice(0, tableData.length); // 清空 reactive 数组
  rawTableData = []; // 重新赋值为空数组
  let rawTableData2 = (await selectByName(searchMessage.value)).data;
  if (rawTableData2.role === 9) {
    rawTableData2.role = "管理员"
  } else if (rawTableData2.role === 1) {
    rawTableData2.role = "普通用户"
  } else if (rawTableData2.role === 2) {
    rawTableData2.role = "回收员"
  }
  tableData.push(rawTableData2)
  rawTableData.push((await selectByName(searchMessage.value)).data)
}
// 换页
let pageStart = ref(1)
let pageEnd = ref(3)


onMounted(async () => {
  dealPage();
  dealTableData();

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

>>>.el-table__inner-wrapper:before {
  display: none !important;
}

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
    // width: 200px;
    // transform: scale(1.2);
    padding: 10px;
    font-weight: bold;
    font-size: 18px;
    color: pink;
    // color: #4F4F4F;
    // line-height: 40px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  position: relative;
  margin-top: 20px;

  .page {
    width: 26px;
    height: 20px;
    font-family: DM Sans, DM Sans;
    font-weight: 400;
    font-size: 16px;
    color: #404040;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    right: 110px;
    top: 16px;
  }

  .nextPage {
    width: 85px;
    height: 34px;
    background: #4F4F4F;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px 4px 4px 4px;
    font-family: Lato, Lato;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    // right: 60px;
    top: 10px;
  }

  .lastPage {
    width: 85px;
    height: 34px;
    background: #4F4F4F;
    box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.04), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px 4px 4px 4px;
    font-family: Lato, Lato;
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    right: 156px;
    top: 10px;
  }
}
</style>
