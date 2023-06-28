import { createTransport } from 'nodemailer'

//const clienteNodemailer = createTransport({
//    host: 'smtp.ethereal.email',
//    port: 587,
//    auth: {
//        user: 'britney11@ethereal.email',
//        pass: 'NwQY3bd8EZvGUdhZ6n'
//    }
//});

const passMailApp = 'gltlwwcfywjflsqd'

const clienteNodemailer = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'inbobarini@gmail.com',
        pass: passMailApp //mover a .env
    }
})

const TEST_MAIL = 'britney11@ethereal.email>'

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    // text: 'texto plano',
    html: '<h1 style="color: blue;">Contenido de prueba con archivo adjunto desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
    attachments: [
        { path: './nodemailer.png' }
    ]
}

try {
    const info = await clienteNodemailer.sendMail(mailOptions)
    console.log(info)
} catch (error) {
    console.log(error)
}

//----

class EmailService {
    #clienteNodemailer

    constructor(credencialesMail) {
        this.#clienteNodemailer = createTransport({
        service: 'gmail',
        port: 587,
        auth: credencialesMail
        })
    }

    async send(destinatario, mensaje) {
        const mailOptions = {
            from: 'Enviador de mails molesto',
            to: destinatario,
            subject: 'Mail molesto!',
            text: mensaje,
        }
        try {
            const info = await this.#clienteNodemailer.sendMail(mailOptions)
            console.log(info)
            return info
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const emailService = new EmailService(passMailApp)

//----

export async function handlePost(req, res, next) {
    // console.log(req.body)
    const { destinatario, mensaje } = req.body

    try {
        const info = await emailService.send(destinatario, mensaje)
        // await smsService.send('431321312','holaaa')
        console.log(info)
    } catch (error) {
        console.log(error)
    }

    res.redirect('/')
}


const { v4: uuidv4 } = require('uuid');

const token = uuidv4(); // Genera un token único

const tokens = {}; // Almacena los tokens y su información en memoria

// Guarda el token junto con la información del usuario
tokens[token] = {
  userId: userId,
  expiration: Date.now() + 3600000, // Expire en 1 hora (3600000 milisegundos)
};

const recoveryLink = `https://tu-sitio.com/recuperacion?token=${token}`;

// Envía el enlace de recuperación por correo electrónico o cualquier otro medio
enviarCorreoElectronico(usuario.email, 'Recuperación de contraseña', `Haz clic aquí para restablecer tu contraseña: ${recoveryLink}`);

app.get('/recuperacion', (req, res) => {
    const token = req.query.token;
  
    if (tokens[token] && tokens[token].expiration > Date.now()) {
      // El token es válido y no ha expirado
      const userId = tokens[token].userId;
  
      // Realiza las acciones necesarias para permitir al usuario restablecer la contraseña
      // ...
  
      // Elimina el token después de usarlo
      delete tokens[token];
  
      res.send('Token válido');
    } else {
      // El token no es válido o ha expirado
      res.send('Token inválido');
    }
  });