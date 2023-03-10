const {Schema,model} = require("mongoose");

const usuarioShema = Schema({
    nombre:{
        type:String,
        required:[true,"el nombre es obligatorio"]
    },
    correo:{
        type:String,
        required:[true,"el correo es obligatorio"],
        unique:true
    },
    contraseña:{
        type:String,
        required:[true,"la contraseña es obligatorio"],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        emun:["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
})
usuarioShema.methods.toJSON = function(){
  const {__v,contraseña, ...usuario} = this.toObject(); 
  return usuario; 
}
module.exports=model("Usuario",usuarioShema);