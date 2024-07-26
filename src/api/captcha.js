import svgCaptcha from 'svg-captcha'
class Captcha {
  constructor() {}
  async getCaptcha(ctx) {
    const { text, data } = svgCaptcha.create({
      size: 4, // 验证码长度
      fontSize: 50, // 验证码字体大小
      width: 124, // 宽度
      height: 38, // 高度
      noise: Math.floor(Math.random() * 5), // 验证码干扰线数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设置 true 则每个字符有随机的颜色
      ignoreChars: '0o1i', // 验证码中排除某些字符，如 0o1i
      // characters: '0123456789', // 验证码字符集
      background: '#ffffff' // 验证码图片背景颜色
    })

    // 保存验证码到session,忽略大小写
    ctx.session.captcha = text.toLowerCase()
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = data
  }
}

export default new Captcha()
