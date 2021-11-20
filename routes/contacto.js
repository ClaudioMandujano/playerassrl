var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('contacto');
  });
  
router.post('/', async(req, res, next) =>{

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

 // console.log(req.body);

 var obj = {
  to: 'claudio.mandujano@gmail.com',
  subject: 'contacto desde la Web',
  html: nombre + " " + apellido + "<br> se contacto a traves y quiere mas info a este correo : " + email + ". <br> Además, hizo el siguiento comentario :" + mensaje + ". <br> Su tel es :" + telefono
 }
 
  var transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS

    }

  })

  var info = await transporter.sendMail(obj);

    res.render('contacto',{
    message: 'Mensaje enviado correctamente',
    }) 
})





  module.exports = router;
