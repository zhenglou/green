<template>
  <div class="common-layout">
    <el-container>
      <el-header height="80px">
        <div class="user_container">
          <!-- <div class="user_search">
            <input class="search_input" placeholder="搜搜搜" v-model="searchMessage"></input>
            <div class="search_message">搜索</div>
          </div> -->
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
              <p class="user_main_title" :style="selectedIndex == 0 ? activeTitleStyle : {}"
              @click="selectIndex(0, '/manageIndex/articalManage/gabageKnowledge')">垃圾分类知识管理</p>
              <p class="user_main_title" :style="selectedIndex == 1 ? activeTitleStyle : {}"
              @click="selectIndex(1, '/manageIndex/articalManage/enviromentKnowledge')">环保知识管理
              </p>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible" title="添加类型" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="垃圾类型" prop="wasteType">
        <el-input v-model="ruleForm.wasteType" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类型简介" prop="description">
        <el-input v-model="ruleForm.description" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类型案例" prop="examples">
        <el-input v-model="ruleForm.examples" />
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
  <el-dialog v-model="dialogVisible2" title="添加文章" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm2.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="ruleForm2.content" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="封面" prop="coverImage">
        <el-upload class="upload-demo" action="null" :file-list="fileList" :limit="1" :on-change="handleFileChange"
          :before-upload="handleBeforeUpload" :on-remove="handleRemove" list-type="picture-card" :show-file-list="false"
          :key="uploadKey">
          <template #default>
            <!-- 如果有图片，显示图片；否则显示默认上传图标 -->
            <img v-if="ruleForm2.coverImage" :src="ruleForm2.coverImage" alt="封面预览"
              style="width: 100%; height: 100%; object-fit: cover;" />
            <i class="el-icon-plus"></i>
          </template>
        </el-upload>
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
import { useRouter, useRoute } from 'vue-router';
import { insert as insertWasKno } from '../../api/wasKno';
import { insert as insertEnvKnow } from '../../api/envKnow';
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'
import { genFileId } from 'element-plus'
import ImageUploader from "../../utils/imageParse";
const activeTitleStyle = reactive({
  fontSize: "18px",
  fontWeight: "Bold",
  color: "pink"
});
let selectedIndex = ref(0);
const message = useMessage();
const router = useRouter()
let searchMessage = ref('');
const route = useRoute();
let dialogVisible = ref(false);
let dialogVisible2 = ref(false);
let ruleForm = reactive({
  wasteType: "",
  description: "",
  examples: ""
})
let ruleForm2 = reactive({
  title: "",
  content: "",
  coverImage: ""
})
// 根据路由动态设置按钮文本
const buttonLabel = computed(() => {
  switch (route.name) {
    case 'EnviromentKnowledge':
      return '添加文章';
    case 'GabageKnowledge':
      return '添加类型';
  }
});
async function addNewInfo() {
  let status;
  try {
    if (route.name == 'EnviromentKnowledge') {
      status = await insertEnvKnow(ruleForm2)
      if (status.data == 1) {
        message.success("添加成功")

      } else {
        message.warning("添加失败")
      }
    }
    if (route.name == 'GabageKnowledge') {
      status = await insertWasKno(ruleForm)
      if (status.data == 1) {
        message.success("添加成功")
      } else {
        message.warning("添加失败")
      }
    }
  } catch (err) {
    message.warning("添加失败")
  }
  handleRemove()
  refresh()
  refresh2()
}
function addInfoClick() {
  if (route.name == 'EnviromentKnowledge') {
    dialogVisible2.value = true
  }
  if (route.name == 'GabageKnowledge') {
    dialogVisible.value = true
  }
}
function refresh() {
  dialogVisible.value = false,
    ruleForm.wasteType = '',
    ruleForm.description = '',
    ruleForm.examples = ''
}
function refresh2() {
  dialogVisible2.value = false,
    ruleForm2.title = '',
    ruleForm2.content = '',
    ruleForm2.coverImage = ''
}
const uploadKey = ref(0);
const fileList = ref<UploadFile[]>([]);
const handleBeforeUpload = (file: File) => {

  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    ElMessage.error("只能上传图片文件");
  }
  return isImage;
};

const handleFileChange = async (file: any) => {
  // fileList.value = [file.raw];
  try {
    // 压缩图片（设置最大宽度为 800px，压缩质量为 0.8）
    const compressedBase64 = await ImageUploader.compressImage(file.raw, 800, 0.6);
    ruleForm2.coverImage = compressedBase64;
    console.log(ruleForm2.coverImage);

    // 更新 fileList，只保留当前文件，并补全 UploadFile 类型所需字段

    // fileList.value = [
    //   {
    //     name: file.name,
    //     url: ruleForm2.coverImage,
    //     status: "success",
    //     uid: Date.now(), // 确保每次更新唯一 UID
    //   } as UploadFile,
    // ];
    // 更新 key 强制刷新
    uploadKey.value += 1;
  } catch (error) {
    ElMessage.error("图片压缩失败，请重试");
    console.error(error);
  }
  // const reader = new FileReader();
  // reader.onload =() => {
  //   ruleForm2.coverImage = reader.result as string;
  //   console.log( ruleForm2.coverImage);

  //   fileList.value = [file.raw]; // 确保只保留当前文件
  // };
  // reader.readAsDataURL(file.raw);
};

const handleRemove = () => {
  ruleForm2.coverImage = ""; // 清空 Base64 数据
  fileList.value = []; // 清空文件列表
};
const selectIndex = (index:any, path:any) => {
  selectedIndex.value = index;
  router.push(path); // 假设 router 已经引入
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}

.el-table {
  --el-table-header-bg-color: "";
  --el-table-bg-color: "";
  --el-table-tr-bg-color: "";
}

// >>>.el-table__inner-wrapper:before {
//   display: none !important;
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
  height: 100px;
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
    // line-height: 40px;
    transition: all 0.3s ease;
  }
}

.common-layout {
  width: 100%;
  height: 100%;
}

.addUser {
  position: absolute;
  left: 688px;
}
</style>
