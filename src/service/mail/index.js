import artTemplate from 'art-template'
import nodemailer from 'nodemailer'
import path from 'path'
import qs from 'qs'
import { JSDOM } from 'jsdom'

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

const send = async (sendInfo) => {
  const data = {
    sendInfo
  }

  const baseUrl = process.env.BASE_URL
  let url = ''

  let html = ''
  if (sendInfo.type === 'reset') {
    url = `${baseUrl}/#/reset?${qs.stringify(sendInfo.data)}`
    html = artTemplate(path.join(__dirname, './template/reset.html'), { ...data, url })
  } else if (sendInfo.type === 'email') {
    url = `${baseUrl}/#/email?${qs.stringify(sendInfo.data)}`
    html = artTemplate(path.join(__dirname, './template/email.html'), { ...data, url })
  }

  const dom = new JSDOM(html)

  const bodyContent = dom.window.document.body.innerHTML

  console.log(bodyContent)

  const mailOptions = {
    from: '"Imooc社区中心 👻"<1392830517@qq.com>', // sender address
    to: '1392830517@qq.com', // list of receivers
    subject:
      sendInfo.user !== '' && sendInfo.type !== 'email'
        ? `你好开发者，${sendInfo.user}！《慕课网前端全栈实践》${sendInfo.type === 'reset' ? '重置密码链接！' : '注册码！'}`
        : '《慕课网前端全栈实践》确认修改邮件链接', // Subject line // Subject line
    text: `您在《慕课网前端全栈实践》课程中注册，您的邀请码是${sendInfo.code},邀请码的过期时间: ${sendInfo.expire}`, // plain text body
    html: bodyContent
  }

  console.log(mailOptions)

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  } catch (error) {
    console.error('发送邮件时出错:', error)
  }
}

export default send
