const express = require('express');
const app = express();
const path =require('path');

const mysql = require('mysql2');
let conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'sandylance'
});

conn.connect(function (err){
    if(err) throw err;
    console.log("Conexión exitosa a la base de datos");
});


app.get('/',function(req,res) {
    res.send('Pagina de inicio');
});

app.post('/servicio/create/:idmascota',function (req, res){

});


app.listen(8080,function (){
  console.log("Servidor abierto en el puerto 8080");
});