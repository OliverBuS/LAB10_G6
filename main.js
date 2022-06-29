const express = require('express');
const app = express();
const path =require('path');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const multer = require('multer');
let upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

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

app.post('/servicio/create/:idmascota',function (req, res) {

    let parametros = [parseInt(req.params.idmascota), req.body.cuenta_idcuenta, req.body.hora_inicio, req.body.duracion, req.body.entrega, req.body.responsable_idresponsable];
    let query = "insert into servicio (mascota_idmascota,cuenta_idcuenta,hora_inicio,duracion,entrega,responsable_idresponsable) values (?,?,?,?,?,?)";
    conn.query(query, parametros, function (err,result){
        if(err){
            res.json({
                status:"error",
                message:"Ha ocurrido un problema, revise que los parametros sean correctos y que los ids existan"
            });
            return;
        }
        conn.query("select * from servicio where idservicio=(select last_insert_id())", function (err,result){
            if(err){
                res.json({
                    status:"error",
                    message:"Ha ocurrido un problema y no se ha subido correctamente el servicio"
                });
                return;
            }
            res.json(result);
        })
    });

});


app.listen(8080,function (){
  console.log("Servidor abierto en el puerto 8080");
});