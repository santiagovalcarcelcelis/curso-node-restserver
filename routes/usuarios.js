const {Router} = require("express");
const { check } = require("express-validator");
const { UsuariosGet, UsuariosPut, UsuariosDelete, UsuariosPost, usuariosPath } = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos")
const Role = require("../models/rol")

const router = Router();

router.get("/",UsuariosGet);

router.put("/:id",UsuariosPut);


router.post("/",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("correo","El valor ingresado no tiene el aspecto de un correo").isEmail(),
    // check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom( async (rol = "") => {
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`)
        }
    }),
    check("contraseña","La contraseña es obligatoria y tiene que tener mas de 6 caracteres").isLength({min:6}),
    validarCampos
],UsuariosPost);


router.delete("/",UsuariosDelete);

router.patch("/",usuariosPath);

module.exports=router;