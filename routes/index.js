var express = require('express');
var router = express.Router();
var pool = require('../models/bd');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;


router.get('/', async function(req, res, next){
  novedades = await novedadesModel.getNovedades();
  novedades = novedades.splice(0,5); //Seleccionar los primeros 5 elementos del array
  
  novedades = novedades.map(novedad => { //map genera nuevo array en base a la info que obtiene
      if(novedad.img_id){
        const imagen = cloudinary.url(novedad.img_id,{
          width: 460,
          crop: 'fill'
        });
        return{
        ...novedad,
          imagen
        }
      }else {
        return{        
         ...novedad,
          imagen:'/images/noimage.jpg'
        }
      }
  }); 

  res.render('index',{
    novedades
  });
});


router.get('/', function(req, res, next) {
  pool.query("select * from usuarios").then(function(resultados){
    console.log(resultados);
  })
  res.render('index');
});

module.exports = router;
