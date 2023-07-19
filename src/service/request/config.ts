// 配置不同的环境
let BASE_URL = ''
const TIME_OUT = 1000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // 端口要一致
  BASE_URL = 'http://turnip.ren:3000/api'
} else {
  BASE_URL = 'http://turnip.ren:3000/api'
}
export { BASE_URL, TIME_OUT }
