const db = require('../db.js');
const bcrypt = require('bcryptjs');
const createAccesToken = require('../libs/jwt.js');
//const { response } = require('express');

const register = async(req,res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password,10);

        await db.collection('users')
        .doc()
        .create({email:req.body.email, password:passwordHash});
        const token = await createAccesToken({id:req.body.email});
        res.cookie("token",token);
        res.json();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message});
    }
};

const login = async(req,res) => {
    try {
        //Se busca en la base de datos el email ingresado
        const query = db.collection('users').where('email','==',req.body.email); 
        const userFound = await query.get();

        // SI no se encuentra se envia un status 400
        if (!userFound) return res.status(400).json({message:"User not found"})

        // Si se encuentra se guarda el resultado
        const docs = userFound.docs;
        const resultado = docs.map((doc)=>({
            id:doc.id,
            email:doc.data().email,
            password:doc.data().password
        }))
        const emailFound = resultado[0].email;
        const passwordFound = resultado[0].password;
        const idFound = resultado[0].id;

        const isMatch = await bcrypt.compare(req.body.password,passwordFound)
        if(!isMatch) return res.status(400).json({message: "incorrect password"})

        const token = await createAccesToken({id:idFound}); // Se crea token de usuario

        res.cookie("token",token);
        res.json({
            id:idFound,
            email:emailFound,
            password:passwordFound
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message});
    }
};

const logout = (req,res) => {
    res.cookie('token',"", {
        expires: new Date(0)
    });
    return res.status(200).json();
}

const profile = async (req,res) =>{
    const query = db.collection('users').doc(req.user.id);
    const userFound = await query.get();

    if(!userFound) return res.status(400).json({mesage:'user not found'})

    const user = userFound.data()

    return res.json({
        id:req.user.id,
        email:user.email
    })
}



module.exports = {
    register,
    login,
    logout,
    profile,
}