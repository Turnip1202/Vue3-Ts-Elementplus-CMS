const router = require("koa-router")();
router.prefix("/api");
//处理图表
router.get("/goods/category/count", async (ctx, next) => {
  ctx.body = {
    returnCode: 0,
    data: [
      { id: 1, name: "裤子", goodsCount: 30 },
      { id: 2, name: "上衣", goodsCount: 20 },
      { id: 3, name: "裤子", goodsCount: 40 },
      { id: 4, name: "女装", goodsCount: 50 },
      { id: 5, name: "男装", goodsCount: 50 },
    ],
  };
});
module.exports = router;
