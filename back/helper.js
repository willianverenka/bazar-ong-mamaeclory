const jwt = require("jsonwebtoken");
const fs = require("fs");

"use strict";

module.exports = {
  deletarImagem,
  generateToken,
  authenticateUser
}

function deletarImagem(imagePath){
  fs.unlink(imagePath, (err) => {
    if(err){
      console.error("Erro ao apagar imagem:", err);}
    else{
      console.log("Imagem apagada com sucesso.")
    }
  })
}

function generateToken(){
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '2h'
  })
  return token
}


function authenticateUser(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send("Falha na autenticação do usuário. Sem token de sessão.")
  }
  const token = req.headers.authorization.split(' ')[1]; 
  if(!token){
    return res.status(401).send("Falha na autenticação do usuário.")
  }
  const isValidToken = jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if(err){
      return false;
    }
    return true;
  });
  if(!isValidToken){
    return res.status(401).send("Falha na autenticação do usuário. Token inválido.")
  }
  next();
}