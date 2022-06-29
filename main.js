const express = require('express');
const app = express();
const path =require('path');

app.get('/',function(req,res) {
    res.send('Pagina de inicio');
});


app.listen(8080,function (){
  console.log("Servidor abierto en el puerto 8080");
});