const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');
class Server{
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        
        this.usuariosPath="/api/usuarios";
    // conectar a base de datos
        this.conectarDB();
        
    // Middlewares
        this.middlewares();
    // rutas de mi aplicacion
        this.routes();
    }
    async conectarDB(){
        await dbConection();
    }
    middlewares(){
    //cors
        this.app.use(cors());
    // lectura y parseo del body
        this.app.use( express.json() );
    // directorio publico
        this.app.use(express.static("public"));
    }
    routes(){
        this.app.use("/api/usuarios", require("../routes/usuarios"))
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`servidor corriendo en el puerto`,this.port)
        })
    }
}

module.exports = Server;


