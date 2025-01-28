// interface EnvKnowInfo {
//   coverImage?: string;
//   date1: string;
//   date2: string;
// }
// const envKnowInfo:EnvKnowInfo = {
//   coverImage:'11',
//   date1:'112',
//   date2:'222'
// }
// const envKnowInfo = {
//   coverImage: '11',
//   date1: '112',
//   date2: '222',
// } as { [key: string]: any };
const envKnowInfo = {
  coverImage: '11',
  date1: '112',
  date2: '222',
};

const { coverImage, ...rest } = envKnowInfo; 
// function deleteww(){
//   delete envKnowInfo.coverImage
// }
// deleteww();
console.log(rest);
