const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  // 默认支持的服务包括： qq, 163, 126, gmail, yahoo, outlook,
  host: 'smtp.qq.com',
  port: 587,
  // service: 'qq',
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: '1392830517@qq.com',
    pass: 'jptapqvpmloeggbc'
  }
})

const sendInfo = {
  code: '1234',
  expire: '2024-10-01',
  email: 'imoocbrian@qq.com',
  user: 'Brian'
}

const url = 'https://www.baidu.com'

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"认证邮件 👻"<1392830517@qq.com>', // sender address
    to: '1392830517@qq.com', // list of receivers
    subject:
      sendInfo.user !== '' && sendInfo.type !== 'email'
        ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》${sendInfo.type === 'reset' ? '重置密码链接！' : '注册码！'}`
        : '《慕课网前端全栈实践》确认修改邮件链接', // Subject line // Subject line
    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`, // plain text body
    html: `
    <div style="border: 1px solid #dcdcdc;color: #676767; margin: 0 auto; padding-bottom: 50px;position: relative;">
    <div style="height: 60px; background: #393d49; line-height: 60px; color: #58a36f; font-size: 18px;padding-left: 10px;">Imooc社区——欢迎来到官方社区</div>
    <div style="padding: 25px">
      <div>您好，${sendInfo.user}童鞋，重置链接有效时间30分钟，请在${sendInfo.expire}之前${sendInfo.code ? '重置您的密码' : '修改您的邮箱为：' + sendInfo.data.username}：</div>
      <a href="${url}" style="padding: 10px 20px; color: #fff; background: #009e94; display: inline-block;margin: 15px 0;">${sendInfo.code ? '立即重置密码' : '确认设置邮箱'}</a>
      <div style="padding: 5px; background: #f2f2f2;">如果该邮件不是由你本人操作，请勿进行激活！否则你的邮箱将会被他人绑定。</div>
    </div>
    <div style="background: #fafafa; color: #b4b4b4;text-align: center; line-height: 45px; height: 45px; position: absolute; left: 0; bottom: 0;width: 100%;">系统邮件，请勿直接回复</div>
</div>
` // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error)
