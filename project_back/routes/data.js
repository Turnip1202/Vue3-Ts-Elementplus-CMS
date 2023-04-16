const path = require('node:path')
const { readData, writeFile } = require('./util')

// 拿到用户的data
async function userInfo({ name, password }) {
  const info = await readData(
    path.join(__dirname, 'data/用户登录/administrator.json')
  )
  if (!name) {
    return info.superUser
  }

  return info.superUser.find(
    (item, index, arr) => item.name === name && item.password === password
  )
}

// 拿到某个用户的信息
const singleUserFilePath = path.join(
  __dirname,
  '/data/系统管理/用户管理/查询某个用户.json'
)

const singleUserData = async () => {
  return (await readData(singleUserFilePath)).data
}

const menuFilePath = path.join(__dirname, '/data/系统管理/角色管理/list.json')
const menuData = async () => {
  return (await readData(menuFilePath)).data.list[7].menuList
}

//用户列表
let userListPath = path.join(__dirname, 'data/系统管理/用户管理/list.json')
const userList = async () => {
  return await readData(userListPath)
}
function deleteUser() {
  return function (data) {
    writeFile(userListPath, data)
  }
}
// 商品列表
let goodsListPath = path.join(__dirname, 'data/商品中心/商品信息/list1.json')
let goodsList = async () => {
  return await readData(goodsListPath)
}
// 角色列表
// 商品列表
let roleListPath = path.join(__dirname, 'data/系统管理/角色管理/list.json')
let roleList = async () => {
  return await readData(roleListPath)
}
const menuListPath = path.join(__dirname, 'data/系统管理/菜单管理/list.json')
const menuList = async () => {
  return await readData(menuListPath)
}

// 获取部门
const dapartmentListPath = path.join(
  __dirname,
  'data/系统管理/部门管理/list.json'
)
const getDapartment = async () => {
  return await readData(dapartmentListPath)
}

module.exports = {
  userInfo,
  singleUserData,
  menuData,
  userList,
  goodsList,
  roleList,
  menuList,
  deleteUser,
  getDapartment
}
