const axios = require('axios')
axios.post('http://127.0.0.1:3000/api/login').then((response) => {
  console.log(response.data)
})
