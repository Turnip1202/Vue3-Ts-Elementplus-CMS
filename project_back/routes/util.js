const fs = require('node:fs')
const path = require('node:path')

const readData = async (filePath) => {
  const data = await fs.readFileSync(filePath, {
    encoding: 'utf8',
    flag: 'r'
  })
  return JSON.parse(data)
}

// 写入文件的工具函数，支持写入字符串和对象
function writeFile(filePath, data) {
  let content = ''

  // 如果data是字符串，则直接赋值给content
  if (typeof data === 'string') {
    content = data

    // 如果data是对象，则将对象序列化成JSON格式的字符串后赋值给content
  } else if (typeof data === 'object') {
    content = JSON.stringify(data)
  }

  // 清空文件内容，并写入新的内容
  fs.writeFileSync(filePath, content, { flag: 'w' })
}
module.exports = { readData, writeFile }
