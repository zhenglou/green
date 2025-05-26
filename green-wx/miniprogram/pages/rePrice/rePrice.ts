import { selectAll, selectAllWasteName, selectOne } from "../../api/recPri"
Page({
  data: {
    currentIndex: 0,
    priceInfo: [],
    allWasteNameInfo: [],
    allPriceInfo:[]
  } as {
    currentIndex: any
    priceInfo: any
    allWasteNameInfo: any
  },
 async handleMenuClick(e:any) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
    });
    const priceInfo = await selectOne(this.data.allWasteNameInfo[index].wasteName);
    this.setData({priceInfo:priceInfo})
  },
  async onLoad(options) {
    const allWasteNameInfo: any = await selectAllWasteName();
    const priceInfo = await selectOne(allWasteNameInfo[0].wasteName);
    const allPriceInfo = await selectAll();
    console.log(priceInfo, allWasteNameInfo);
    this.setData({ priceInfo: priceInfo, allWasteNameInfo: allWasteNameInfo,allPriceInfo:allPriceInfo })

  },
});
