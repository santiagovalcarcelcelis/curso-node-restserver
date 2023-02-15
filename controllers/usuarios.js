const {response,request} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const  UsuariosGet = async (req = request, res = response) => {
    
    // const { q , nombre = "no name" , apikey , page , limit } = req.query; 
    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}
   
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}
const UsuariosPut = async (req, res = response) => {
    const id = req.params.id
    const {_id,contraseña,google,correo, ...resto} = req.body;

    // todo validar contra la base de datos
    if (contraseña){
        const salt = bcryptjs.genSaltSync();
        resto.contraseña = bcryptjs.hashSync(contraseña,salt);
    }
    const usuario = await Usuario.findOneAndUpdate(id, resto)

    res.json({
        id,
        usuario
    });
}
const UsuariosPost = async  (req, res = response) => {

    const {nombre,correo,contraseña,rol} = req.body;
    const usuario = new Usuario({nombre,correo,rol,contraseña});
  
// encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.contraseña = bcryptjs.hashSync(contraseña,salt);
// guardar en base de datos
    await usuario.save();
    res.json({
        usuario
    });
}
const UsuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    // fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    
    res.json(usuario);
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