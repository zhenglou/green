import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStorage } from '../utils/storage'
import { getUserInfoByToken } from '../api/user'
import { AxiosResponse } from 'axios'
interface UserInfo {
  // 这里定义接口的具体属性和方法
  userId:number,
  userName: string,
  age: number,
  password:string,
  phone:string,
  role:number,
  signInStreak:number,
  experience:number,
  points:number,
  createTime:Date
  
}
export const useUserStore = defineStore('user', () => {
  async function userInfoRefresh(token: String) {
    userInfo.value =  (await getUserInfoByToken(token)).data.data;
  }
  let userInfo= ref<any>(null);
  return { userInfo, userInfoRefresh }
})