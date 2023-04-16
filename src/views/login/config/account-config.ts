export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传的~',
      trigger: 'blur'
    },
    {
      pattern: /^[A-za-z0-9]{2,10}$/,
      message: '用户名必须是2~10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[A-za-z0-9]{2,}$/,
      message: '密码必须是2位以上字母或数字',
      trigger: 'blur'
    }
  ]
}
