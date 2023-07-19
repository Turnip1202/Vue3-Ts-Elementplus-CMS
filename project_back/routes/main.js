const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const {
  userInfo,
  singleUserData,
  menuData,
  userList,
  goodsList,
  roleList,
  menuList,
  deleteUser,
  getDapartment,
} = require("./data");

let secret = "turnip"; //密钥
let time = "7d";
router.prefix("/api");

// //处理图表
// router.get("/goods/category/count", async (ctx, next) => {
//   ctx.body = {
//     returnCode: 1,
//     message: "成功",
//   };
// });

//处理删除
router.delete("/users/:id", async (ctx, next) => {
  //1.拿到id
  let { id } = ctx.params;
  const jsonList = await userList();
  const { list } = jsonList.data;
  let user = list.filter((item) => item.id != id);
  --jsonList.data.totalCount;
  jsonList.data.list = user;
  deleteUser()(jsonList);

  // 操作json数据进行对应的删除
  ctx.body = {
    returnCode: 1,
    message: "成功",
  };
});

// 处理登陆请求
router.post("/login", async (ctx, next) => {
  console.log(ctx.request.body);
  const data = ctx.request.body; //拿到账户和密码
  const info = await userInfo(ctx.request.body);
  let token = jwt.sign(data, secret, {
    expiresIn: time,
  }); //生成token

  ctx.body = {
    returnCode: 0,
    data: {
      id: info["id"],
      token,
    },
  };
});

// 拿到token后，在次请求用户信息，使用动态路由获取get来的ID
router.get("/users/:id", async (ctx, next) => {
  console.log(ctx.params);
  // 要使用==隐式转换
  if ((await userInfo({})).find(({ id }) => id == ctx.params.id)) {
    const data = await singleUserData();
    // console.log(data)
    ctx.body = {
      returnCode: 0,
      data,
    };
  }
});
// 处理菜单
router.get("/role/:id/menu", async (ctx, next) => {
  console.log(ctx.cookies.get("token"));

  if ((await userInfo({})).find(({ id }) => id == ctx.params.id)) {
    const data = await menuData();
    // console.log(data)
    ctx.body = {
      returnCode: 0,
      data,
    };
  }
});
// router.post('/role/list', async (ctx, next) => {
//   console.log('role')
//   ctx.body = {
//     returnCode: 0,
//     data: []
//   }
// })
// 处理部门菜单
router.post("/department/list", async (ctx, next) => {
  const { data } = await getDapartment();
  ctx.body = {
    returnCode: 0,
    data,
  };
});
// 不同配置给不同列表数据（正式版已经可用了）
router.post("/:name/list", async (ctx, next) => {
  let { name } = ctx.params;
  // console.log(name)

  // console.log(data)
  switch (name) {
    case "users": {
      const { data } = await userList();
      // console.log(data)

      console.log(ctx.request.body);
      let queryInfo = [
        "id",
        "name",
        "realname",
        "cellphone",
        "enable",
        "createAt",
      ];
      let info = ctx.request.body;
      let infoKeys = Reflect.ownKeys(info);
      // console.log(infoKeys)
      // 遍历请求信息，看是否使用了筛选查询
      let t = queryInfo.some((item) => infoKeys.some((v) => v == item));
      if (t) {
        let queryUser = data.list.filter((item) => {
          if (item.id == info.id) return true;
          if (item.name == info.name) return true;
          if (item.realname == info.realname) return true;
          if (item.cellphone == info.cellphone) return true;
          if (item.enable == info.enable) return true;
          if (item.createAt == info.createAt) return true;
        });
        // console.log(data)
        if (!queryUser.length) {
          ctx.body = {
            returnCode: 0,
            data: data,
          };
        } else {
          // console.log(data)
          data.list = queryUser;
          data.totalCount = queryUser.length;
          // console.log(data)
          ctx.body = {
            returnCode: 0,
            data: data,
          };
        }
      }
      //正式版已经适用
      else
        ctx.body = {
          returnCode: 0,
          data: data,
        };

      break;
    }
    case "goods": {
      //正式版已经适用
      const data = await goodsList();
      ctx.body = {
        returnCode: 0,
        data: data["data"],
      };
      break;
    }
    case "role": {
      //正式版已经适用
      const data = await roleList();
      ctx.body = {
        returnCode: 0,
        data: data["data"],
      };
      break;
    }
    case "menu": {
      //正式版已经适用
      const data = await menuList();
      ctx.body = {
        returnCode: 0,
        data: data["data"],
      };
      break;
    }
  }
});

module.exports = router;
