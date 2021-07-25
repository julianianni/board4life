const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(user, mailInfo, cart) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '885be6a5a7e103', // generated ethereal user
      pass: 'e681373d89e56c', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transporter.sendMail(
    {
      from: '"Julian de Board4Life" <board4life@example.com>', // sender address
      to: user.email, // list of receivers
      subject: `Gracias por tu compra ${user.firstName} OC:${cart.id}! ✔`, // Subject line
      // text: mailInfo, // plain text body
      html: `<div><h1>Gracias por su compra!</h1> <p> Esta es la informacion de tu Orden de compra: ${JSON.stringify(
        mailInfo,
        null,
        2
      )}</p><h2>Esta es la info de tus productos ${JSON.stringify(
        cart,
        null,
        2
      )}</h2></div>`, // html body
    },
    (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('mail confirmacion de compra enviado al usuario')
    }
  )
}

// main().catch(console.error)

module.exports = main
