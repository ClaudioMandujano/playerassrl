var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nodemailer = require("nodemailer");

require('dotenv').config();

//PAGINA PRIVADA
var session = require('express-session');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var nosotrosRouter = require('./routes/nosotros');
var serviciosRouter = require('./routes/servicios');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');

const { allowedNodeEnvironmentFlags } = require('process');


//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '12w45qe1qe4q1eq54eq5',
  resave: false,
  saveUninitialized: true

}));

secured = async(req,res,next) =>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else{
      res.redirect('/admin/login')
    }

  }catch(error){
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));


app.use('/', indexRouter);
app.use('/nosotros',nosotrosRouter);
app.use('/servicios',serviciosRouter);
app.use('/contacto',contactoRouter);
app.use('/admin/login',loginRouter);
app.use('/admin/novedades', secured, adminRouter);

app.post("/send-email", (req, res)=>{
  console.log("Email enviado")
})




app.get('/prueba', function(req, res, next){
 res.send('Pagina de prueba');
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
