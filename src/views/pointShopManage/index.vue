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
              <p class="user_main_title" @click="selectIndex(0, '/manageIndex/pointShopManage/goodsManage')"  :style="selectedIndex == 0 ? activeTitleStyle : {}">换购商品管理</p>
              <p class="user_main_title" @click="selectIndex(1, '/manageIndex/pointShopManage/goodsOrders')"  :style="selectedIndex == 1 ? activeTitleStyle : {}">换购订单管理</p>
            </li>
          </ul>

        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="dialogVisible2" title="添加商品" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="ruleForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品图片" prop="imageUrl">
        <el-upload class="upload-demo" action="" :file-list="fileList" :limit="1" :on-change="handleFileChange"
          :before-upload="handleBeforeUpload" :on-remove="handleRemove" list-type="picture-card"
          :show-file-list="false">
          <template #default>
            <!-- 如果有图片，显示图片；否则显示默认上传图标 -->
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" alt="封面预览"
              style="width: 100%; height: 100%; object-fit: cover;" />
            <i class="el-icon-plus"></i>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品积分" prop="goodPoint">
        <el-input v-model="ruleForm.goodPoint" />
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
  <el-dialog v-model="dialogVisible" title="添加订单" width="500">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon label-width="auto"
      class="demo-ruleForm">
      <el-form-item label="收件人" prop="name">
        <el-input v-model="ruleForm2.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="收件地址" prop="address">
        <el-input v-model="ruleForm2.address" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm2.phone" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="产品ID" prop="productId">
        <el-select v-model="ruleForm2.productId" placeholder="请选择产品">
          <el-option v-for="v in goodsInfos" :label="v.name" :value="v.productId" />
        </el-select>
        <!-- <el-input v-model="ruleForm2.productId" type="text" autocomplete="off" /> -->
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input v-model="ruleForm2.quantity" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-select v-model="ruleForm2.userId" placeholder="请选择用户">
          <el-option v-for="v in userInfos" :label="v.userName" :value="v.userId" />
        </el-select>
        <!-- <el-input v-model="ruleForm2.userId" type="text" autocomplete="off" /> -->
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
import { insert as insertProd } from '../../api/prod';
import { insert as insertProOrd } from '../../api/proOrd';
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'
import ImageUploader from '../../utils/imageParse';
import { selectAll as selectAllGoodsInfos } from '../../api/prod';
import { getAllUserInfo } from '../../api/user';
const message = useMessage();
const router = useRouter()
let searchMessage = ref('');
const route = useRoute();
let dialogVisible = ref(false);
let dialogVisible2 = ref(false);
let ruleForm = reactive({
  name: "",
  imageUrl: "",
  goodPoint: "",
})
let ruleForm2 = reactive({
  name: '',
  address: '',
  productId: '',
  phone:'',
  quantity: '',
  userId: ''
})
// 根据路由动态设置按钮文本
const buttonLabel = computed(() => {
  switch (route.name) {
    case 'GoodsManage':
      return '添加商品';
    case 'GoodsOrders':
      return '添加订单';
  }
});
async function addNewInfo() {
  let status;
  try {
    if (route.name == 'GoodsOrders') {
      status = await insertProOrd(ruleForm2)
      if (status.data == 1) {
        message.success("添加成功")
      } else {
        message.warning("添加失败")
      }
    }
    if (route.name == 'GoodsManage') {
      status = await insertProd(ruleForm)
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
  if (route.name == 'GoodsManage') {
    dialogVisible2.value = true
  }
  if (route.name == 'GoodsOrders') {
    dialogVisible.value = true
  }
}
function refresh() {
  dialogVisible2.value = false
  ruleForm.name = ''
  ruleForm.imageUrl = ''
  ruleForm.goodPoint = ''
}
function refresh2() {
  dialogVisible.value = false
  ruleForm2.name = ''
  ruleForm2.address = ''
  ruleForm2.productId = ''
  ruleForm2.quantity = ''
  ruleForm2.userId = ''
  ruleForm2.phone = ''
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
    ruleForm.imageUrl = compressedBase64;
    console.log(ruleForm.imageUrl);

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
  ruleForm.imageUrl = ""; // 清空 Base64 数据
  fileList.value = []; // 清空文件列表
};
const userInfos = reactive<any[]>([])
const goodsInfos = reactive<any[]>([])
async function setAllUserInfo() {
  userInfos.push(...((await getAllUserInfo()).data.data))
}
async function setAllGoodsInfo() {
  goodsInfos.push(...((await selectAllGoodsInfos()).data))
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
  setAllGoodsInfo();
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

// .el-table__inner-wrapper:before {
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
    // line-height: 40px;
    transition: all 0.3s ease;
  }
}
.addUser {
  position: absolute;
  left: 688px;
}
</style>
