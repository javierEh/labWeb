'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = 'videojuegos';

//Regresar consolas
exports.getConsolas = function(req, res){
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    //Regresar todas las consolas
    db.collection("consolas").find().project().toArray(function(err, result) {
      if (err){
        throw err;
      }
      //console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener el nombre, imagen, y ficha técnica de una plataforma en específico, por medio de su id
exports.obtenerPrimer = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    var consolaRecibida = req.params.consola;
    //db.consolas.find({"nombre":"Xbox"},{"nombre":1, "fichaTecnica":1, "imagen":1})
    db.collection("consolas").find({nombre:consolaRecibida}).project({_id:0, nombre:1, fichaTecnica:1, imagen:1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener una lista de plataformas (nombre, imagen, y ficha técnica) por medio de una búsqueda con expresión regular.
exports.buscar_palabra_clave = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var palabraClave = req.params.palabraClave;
    db.collection("consolas").find({nombre:new RegExp(palabraClave,'i')}).project({_id:0, nombre:1, fichaTecnica:1, imagen:1}).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Resultados obtenidos: " + result.length);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener la lista de juegos de una plataforma en específico, por medio de su id o nombre, obteniendo la siguiente información por cada juego:
//Nombre
//Imagen de portada
exports.obtenerJuegos = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    var consolaRecibida = req.params.consola;
    db.collection("consolas").find({nombre:consolaRecibida}).project({ "juegos._id":1, "juegos.nombre": 1, "juegos.portada": 1 }).toArray(function(err, result) {
      if (err){
        throw err;
      }
      console.log("Consola encontrada: " + consolaRecibida);
      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

//Obtener info juego
exports.infoJuego = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var juegoRecibido = req.params.juego;
    console.log("El juego recibido es: " + juegoRecibido);

    db.collection("consolas").findOne({"juegos._id":juegoRecibido}, {fields:{"juegos._id":1,"juegos.portada":1,"juegos.nombre":1, "juegos.developer":1,"juegos.lanzamiento":1}}, function(err, result) {
      if (err){
        throw err;
      }
      var finalresult = {};
      console.log("El result de mongo es:")
      console.log(result.juegos);
      for (var juego in result.juegos) {
        console.log(juego);
        if (result.juegos[juego]._id == juegoRecibido){
          finalresult = result.juegos[juego];
        }
      }

      console.log("Consulta ejecutada...");
      mdbclient.close();

      res.end( JSON.stringify(finalresult));
    });
  });
};



//Obtener Entradas de blog
exports.obtenerBlogs = function(req, res) {
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    db.collection("blog").find().project().toArray(function(err, result) {
      if (err){
        throw err;
      }

      mdbclient.close();
      res.end( JSON.stringify(result));
    });
  });
};

exports.agregar_consola = function(req, res) {
  console.log("WAHTUP")
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var nuevaConsola = req.body;
    db.collection("consolas").insertOne(nuevaConsola, function(err, res) {
      if (err){
        throw err;
      }
      console.log("Insert ejecutado...");
      mdbclient.close();
    });
    res.end();
  });
};

exports.agregar_entrada = function(req, res) {
  console.log("WAHTUP")
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);
    var nuevaEntrada = req.body;
    db.collection("consolas").insertOne(nuevaEntrada, function(err, res) {
      if (err){
        throw err;
      }
      console.log("Insert ejecutado...");
      mdbclient.close();
    });
    res.end();
  });
};

exports.buscar_palabra_clave_juegos = function(req, res) {
  var consolasArreglo = [];
  //console.log("aqui llegue");
  MongoClient.connect(url, function(err, mdbclient) {
    if (err){
      throw err;
    }
    const db = mdbclient.db(dbName);

    //Regresar todas las consolas
    db.collection("consolas").find().project().toArray(function(err, result) {
      if (err){
        throw err;
      }
      //console.log("Consola encontrada: " + consolaRecibida);
      consolasArreglo = result;
      mdbclient.close();

      //console.log(consolasArreglo);
      var resultFinal = [];
      var tam = consolasArreglo.length;

      var i = 0;
      function step() {
        //console.log("primero con: " + i);

        if (i < consolasArreglo.length) {
        MongoClient.connect(url, function(err, mdbclient){
          var miConsola = consolasArreglo[i];

          //console.log("Segundo con: " + i);
          if (err){
            throw err;
          }
          const db = mdbclient.db(dbName);
          var palabraClaveJuego = req.params.palabraClaveJuego;

          db.collection("consolas").find({"nombre":miConsola.nombre}).project({"juegos._id":1, "juegos.nombre":1,"juegos.portada":1,"nombre":1}).toArray(function(err, result) {

           if (err){
            throw err;
           }

           console.log("El result: " + JSON.stringify(result));
           if(result[0]){
             for (var j = 0; j < result[0].juegos.length; j++){
               //Si encontramos el juego que corresponde a la clave, regresamos solo ese elemento.
              if((new RegExp(palabraClaveJuego,'i')).test(result[0].juegos[j].nombre)){
                var newObj = result[0].juegos[j];
                newObj["nombreConsola"] = result[0].nombre;
                resultFinal.push(newObj);
              }



             }
             mdbclient.close();

           }else{
              res.end(null);
           }

           mdbclient.close();

           functionAfterForEach(resultFinal);
           i++;
           step();

           //Regresamos solamente el juego que corresponde al nombre.

        });
        });

        }
      }
      step();

      function functionAfterForEach(resultFinal){
        tam--;
        //console.log("el tam es" + tam + " y el arr es: " + resultFinal);
        if(tam == 0){
          console.log(resultFinal);
          res.end(JSON.stringify(resultFinal));
        }
      }
    });
  });



}
