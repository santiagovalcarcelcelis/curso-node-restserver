const {response,request} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const  UsuariosGet =  (req = request, res = response) => {
    
    const { q , nombre = "no name" , apikey , page , limit } = req.query;
    res.json({
        msg:"get api - controlador",
        q,
        nombre,
        apikey,
        page,
        limit
    });
}
const UsuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        msg:"put api - controlador",
        id
    });
}
const UsuariosPost = async  (req, res = response) => {

    const {nombre,correo,contraseña,rol} = req.body;
    const usuario = new Usuario({nombre,correo,rol,contraseña});
// verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        return res.status(400).json({
            msg:"Ese correo ya esta registrado"
        });
    }
// encrptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña,salt);
// guardar en base de datos
    await usuario.save();
    res.json({
        usuario
    });
}
const UsuariosDelete = (req, res = response) => {
    res.json({
        msg:"delete api - controlador"
    });
}
const usuariosPath =  (req, res = response) => {
    res.json({
        msg:"patch api - controlador"
    });
}
module.exports={
    UsuariosGet,
    UsuariosPut,
    UsuariosPost,
    UsuariosDelete,
    usuariosPath
}