import axios from 'axios'

// // axios的拦截器(放到请求代码的前面)，axios.create创建实例的时候不需要
axios.interceptors.request.use(
  (config) => {
    console.log('请求拦截成功')
    return config
  },
  (err) => {
    console.log('请求发送失败')
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('响应拦截成功')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

// axios的实例对象
// 1.模拟get请求
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })
// axios
//   .get('https://httpbin.org/get', {
//     params: {
//       name: 'turnip',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })

// axios
//   .post('https://httpbin.org/post', {
//     data: {
//       name: 'turnip',
//       age: 19
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })

// 配置axios
// 全局配置
axios.defaults.baseURL = 'https://httpbin.org' //配置基址
axios.defaults.timeout = 1000 * 10
axios.defaults.headers = {}
axios
  .get('/get', {
    params: {
      name: 'turnip',
      age: 18
    },
    timeout: 10000,
    headers: {}
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'turnip',
      age: 19
    }
  })
  .then((res) => {
    console.log(res)
  })

// axios
//   .all([
//     axios.get('/get', { params: { name: 'turnip', age: 19 } }),
//     axios.post('/post', {
//       data: {
//         name: 'kang',
//         age: '18'
//       }
//     })
//   ])
//   .then((res) => {
//     console.log(res[0].data)
//     console.log(res[1].data)
//   })
