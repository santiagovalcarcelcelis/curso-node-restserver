const {Router} = require("express");
const { UsuariosGet, UsuariosPut, UsuariosDelete, UsuariosPost, usuariosPath } = require("../controllers/usuarios");

const router = Router();

router.get("/",UsuariosGet);

router.put("/:id",UsuariosPut);


router.post("/",UsuariosPost);


router.delete("/",UsuariosDelete);

router.patch("/",usuariosPath);

module.exports=router;