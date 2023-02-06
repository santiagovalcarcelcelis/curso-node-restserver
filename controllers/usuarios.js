const {response,request} = require("express")


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
const UsuariosPost =  (req, res = response) => {
    const body = req.body;
    res.json({
        msg:"post api - controladoraa",
        body
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