<template>
  <div class="user_search">
    <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
    <div class="search_message" @click="search">搜索</div>
  </div>
  <el-table :data="tableData" style="width: 100%; height: 555px;">
    <el-table-column prop="orderId" label="订单编号" />
    <el-table-column prop="name" label="收件名" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="productId" label="产品编号" show-overflow-tooltip />
    <el-table-column prop="quantity" label="数量" />
    <el-table-column prop="userId" label="用户id" />
    <el-table-column prop="orderStatus" label="订单状态" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="completeTime" label="完成时间" />
    <el-table-column prop="cancelTime" label="取消时间" />
    <el-table-column prop="cancelReason" label="取消原因" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="scope">
        <el-popconfirm title="确定删除?" @confirm="deleteInfo(scope.$index)">
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
  <el-dialog v-model="dialogVisible" title="订单信息修改" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="订单编号" prop="orderId">
        <el-input v-model="ruleForm.orderId" type="text" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="收件名" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="产品编号" prop="productId">
        <el-select v-model="ruleForm.productId" placeholder="请选择产品">
          <el-option v-for="v in goodsInfos" :label="v.name" :value="v.productId" />
        </el-select>
        <!-- <el-input v-model="ruleForm.productId" /> -->
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input v-model="ruleForm.quantity" />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-select v-model="ruleForm.userId" placeholder="请选择用户">
          <el-option v-for="v in userInfos" :label="v.userName" :value="v.userId" />
        </el-select>
        <!-- <el-input v-model="ruleForm.userId" /> -->
      </el-form-item>
      <el-form-item label="订单状态" prop="orderStatus">
        <el-input v-model="ruleForm.orderStatus" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="ruleForm.createTime" disabled />
      </el-form-item>
      <el-form-item label="完成时间" prop="completeTime">
        <el-input v-model="ruleForm.completeTime" disabled />
      </el-form-item>
      <el-form-item label="取消时间" prop="cancelTime">
        <el-input v-model="ruleForm.cancelTime" disabled />
      </el-form-item>
      <el-form-item label="取消原因" prop="cancelReason">
        <el-input v-model="ruleForm.cancelReason" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="refresh">取消</el-button>
        <el-button type="primary" @click="updateNewUser">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { insert, deleteOne, update, selectAll, selectOne, selectByPage } from '../../../../api/proOrd';
import { selectAll as selectAllGoodsInfos } from '../../../../api/prod';
import { getAllUserInfo } from '../../../../api/user';
const message = useMessage();
let searchMessage = ref();
let dialogVisible = ref(false)
let tableData = reactive<any[]>([]);
let rawTableData: any[] = []
let date = reactive({
  date1: '',
  date2: ''
})
let ruleForm = reactive({
  orderId: '',
  name: '',
  address: '',
  phone: '',
  productId: '',
  quantity: '',
  userId: '',
  orderStatus: '',
  createTime: '',
  completeTime: '',
  cancelTime: '',
  cancelReason: ''
})
function refresh() {
  dialogVisible.value = false
  ruleForm.orderId = ''
  ruleForm.name = ''
  ruleForm.address = ''
  ruleForm.phone = ''
  ruleForm.productId = ''
  ruleForm.quantity = ''
  ruleForm.userId = ''
  ruleForm.orderStatus = ''
  ruleForm.createTime = ''
  ruleForm.completeTime = ''
  ruleForm.cancelTime = ''
  ruleForm.cancelReason = ''
}
function formatToISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
function updateClick(index: number) {
  dialogVisible.value = true
  ruleForm = Object.assign(ruleForm, rawTableData[index]);
}
async function updateNewUser() {
  let status;
  let rawRuleForm2 = toRaw(ruleForm)
  if (rawRuleForm2.orderStatus == '2') {
    console.log(22222);
    
    rawRuleForm2.completeTime = formatToISO();
  }
  if(rawRuleForm2.orderStatus == '0'){
    rawRuleForm2.cancelTime = formatToISO();
  }
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
  refresh()
}
// 删除用户
const deleteInfo = (index: number) => {
  deleteOne(tableData[index].orderId)
  tableData.splice(index, 1)
  rawTableData.splice(index, 1)
  console.log(tableData[index]);
  // deleteOne(tableData[index].userId)
}
async function dealTableData() {
  tableData.splice(0, tableData.length); // 清空 reactive 数组
  rawTableData = []; // 重新赋值为空数组
  let rawTableData2 = (await selectByPage(pageStart.value)).data;
  tableData.push(...rawTableData2)
  rawTableData.push(...((await selectByPage(pageStart.value)).data))
}
async function dealPage() {
  const infos = await selectAll();
  pageEnd.value = Math.ceil(infos.data.length / 10);
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
  let rawTableData2 = (await selectOne(searchMessage.value)).data;
  tableData.push(rawTableData2)
  rawTableData.push((await selectOne(searchMessage.value)).data)
}
// 换页
let pageStart = ref(1)
let pageEnd = ref(3)

const userInfos = reactive<any[]>([])
const goodsInfos = reactive<any[]>([])
async function setAllUserInfo() {
  userInfos.push(...((await getAllUserInfo()).data.data))
}
async function setAllGoodsInfo() {
  goodsInfos.push(...((await selectAllGoodsInfos()).data))
}

onMounted(async () => {
  dealPage();
  dealTableData();
  setAllGoodsInfo();
  setAllUserInfo();
})
</script>

<style lang="scss" scoped>
.el-table {
  --el-table-header-bg-color: "";
  --el-table-bg-color: "";
  --el-table-tr-bg-color: "";
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

.user_search {
  position: absolute;
  top: 100px;
  left: 320px;

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
</style>