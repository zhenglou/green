<template>
  <div class="user_search">
    <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
    <div class="search_message" @click="search">搜索</div>
  </div>
  <el-table :data="tableData" style="width: 100%; height: 555px;">
    <el-table-column prop="wasteId" label="类型id" />
    <el-table-column prop="wasteType" label="类型" />
    <el-table-column prop="description" label="介绍" show-overflow-tooltip />
    <el-table-column prop="examples" label="举例" />
    <el-table-column prop="createTime" label="创建时间" />
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
  <el-dialog v-model="dialogVisible" title="分类信息修改" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="类型Id" prop="wasteId">
        <el-input v-model="ruleForm.wasteId" type="text" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="垃圾类型" prop="wasteType">
        <el-input v-model="ruleForm.wasteType" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="例子" prop="examples">
        <el-input v-model="ruleForm.examples" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="ruleForm.createTime" disabled />
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
import { insert, deleteOne, update, selectAll, selectOne, selectByPage } from '../../../../api/wasKno';
const message = useMessage();
let searchMessage = ref('');
let dialogVisible = ref(false)
let tableData = reactive<any[]>([]);
let rawTableData: any[] = []
let ruleForm = reactive({
  wasteId: "",
  wasteType: "",
  description: "",
  examples: "",
  createTime: ""
})
function refresh() {
  dialogVisible.value = false
  ruleForm.wasteId = ''
  ruleForm.wasteType = ''
  ruleForm.description = ''
  ruleForm.examples = ''
}
function updateClick(index: number) {
  dialogVisible.value = true
  ruleForm = Object.assign(ruleForm, rawTableData[index]);
}
async function updateNewUser() {
  let status;
  let rawRuleForm2 = toRaw(ruleForm)
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
  deleteOne(tableData[index].wasteId)
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


onMounted(async () => {
  dealPage();
  dealTableData();
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