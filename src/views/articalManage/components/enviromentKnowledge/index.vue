<template>
  <div class="user_search">
    <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
    <div class="search_message"  @click="search">搜索</div>
  </div>
  <el-table :data="tableData" style="width: 100%; height: 555px;">
    <el-table-column prop="knowledgeId" label="文章id" />
    <el-table-column prop="title" label="文章标题" />
    <el-table-column prop="content" label="文章内容" show-overflow-tooltip />
    <el-table-column prop="coverImage" label="封面图片" show-overflow-tooltip />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
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
      <el-form-item label="文章Id" prop="knowledgeId">
        <el-input v-model="ruleForm.knowledgeId" type="text" autocomplete="off" disabled />
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input v-model="ruleForm.content" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="封面" prop="coverImage">
        <el-upload class="upload-demo" action="" :file-list="fileList" :limit="1" :on-change="handleFileChange"
          :before-upload="handleBeforeUpload" :on-remove="handleRemove" list-type="picture-card"
          :show-file-list="false">
          <template #default>
            <!-- 如果有图片，显示图片；否则显示默认上传图标 -->
            <img v-if="ruleForm.coverImage" :src="ruleForm.coverImage" alt="封面预览"
              style="width: 100%; height: 100%; object-fit: cover;" />
            <i class="el-icon-plus"></i>
          </template>
        </el-upload>
        <!-- <el-input v-model="ruleForm.coverImage" type="text" autocomplete="off" /> -->
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
import { deleteOne, update, selectAll, selectOne, selectByPage } from '../../../../api/envKnow';
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'
import ImageUploader from "../../../../utils/imageParse";
const message = useMessage();
let searchMessage = ref('');
let dialogVisible = ref(false)
let tableData = reactive<any[]>([]);
let rawTableData: any[] = []
let ruleForm = reactive({
  knowledgeId: "",
  title: "",
  content: "",
  coverImage: "",
  createTime: ""
})
function refresh() {
  dialogVisible.value = false
  ruleForm.knowledgeId = ''
  ruleForm.title = ''
  ruleForm.content = ''
  ruleForm.createTime = ''
  ruleForm.coverImage = ''
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
  handleRemove()
  refresh()
}
// 删除用户
const deleteInfo = (index: number) => {
  deleteOne(tableData[index].knowledgeId)
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
const fileList = ref<UploadFile[]>([]);
const handleBeforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("只能上传图片文件");
  }
  return isImage;
};

const handleFileChange = async (file: any) => {
  try {
    // 压缩图片（设置最大宽度为 800px，压缩质量为 0.8）
    const compressedBase64 = await ImageUploader.compressImage(file.raw, 800, 0.6);
    ruleForm.coverImage = compressedBase64;
    console.log(ruleForm.coverImage);

    // 更新 fileList，只保留当前文件，并补全 UploadFile 类型所需字段
    // fileList.value = [
    //   {
    //     name: file.name,
    //     url: compressedBase64, // 使用压缩后的 Base64 作为预览的 URL
    //     status: "success", // 必须添加 status 字段
    //     uid: Date.now(), // 使用时间戳生成唯一 uid
    //   } as UploadFile,
    // ];
  } catch (error) {
    ElMessage.error("图片压缩失败，请重试");
    console.error(error);
  }
};

const handleRemove = () => {
  ruleForm.coverImage = ""; // 清空 Base64 数据
  fileList.value = []; // 清空文件列表
};

// 换页
let pageStart = ref(1)
let pageEnd = ref(3)


onMounted(async () => {
  dealPage();
  dealTableData();
})
</script>

<style lang="scss" scoped>
.el-upload-list__item-actions {
  display: none;
}

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