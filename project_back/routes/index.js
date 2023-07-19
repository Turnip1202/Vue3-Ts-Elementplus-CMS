const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  ctx.status = 301;
  await ctx.redirect("index.html");
});
//

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.post("/json", async (ctx, next) => {
  ctx.body = ctx.request.body;
});

module.exports = router;
