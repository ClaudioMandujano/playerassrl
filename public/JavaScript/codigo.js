$(function(){    
    $('#countdown').countdown({
        timezone:-3, //zona horaria argentina
        
        //establecemos la fecha exacta en qué termina el countdown
        year: 2021,
        month: 12,
        day: 25,
        hour: 09, //formato 24hr
        minute:25,
        second:0,
        
        //Establecemos qué haremos luego que termina el countdown
        onFinish: function () { 
            alert("Finalizó la oferta");
        } 
    });
   
});