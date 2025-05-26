// 角色筛选
export function roleSelect(role:number):string{
  switch(role){
    case 1:
      return "普通用户";
    case 9:
      return "管理员";
    case 2:
      return "回收员";
  }
  return "无职位";
}
// 角色反转
export function reRoleSelect(role:string):number{
  switch(role){
    case '普通用户':
      return 1;
    case '管理员':
      return 9;
    case '回收员':
      return 2;
  }
  return 0;
}



