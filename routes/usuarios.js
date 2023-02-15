const {Router} = require("express");
const { check } = require("express-validator");
const { UsuariosGet, UsuariosPut, UsuariosDelete, UsuariosPost, usuariosPath } = require("../controllers/usuarios");
const {validarCampos} = require("../middlewares/validar-campos")
const {esRolvalido, emailExiste,existeUsuarioPorId} = require("../helpers/db-validators")


const router = Router();

router.get("/",UsuariosGet);

router.put("/:id",[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRolvalido),
    validarCampos
],UsuariosPut,);


router.post("/",[
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("correo","El valor ingresado no tiene el aspecto de un correo").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol","No es un rol valido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom(esRolvalido),
    check("contraseña","La contraseña es obligatoria y tiene que tener mas de 6 caracteres").isLength({min:6}),
    validarCampos
],UsuariosPost);


router.delete("/:id",[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
],UsuariosDelete);

router.patch("/",usuariosPath);

module.exports=router;