const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { ImgurClient } = require("imgur");
const multer = require("multer");
const helper = require("./helper");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const fs = require("fs");
const { FRONT_BASE_URL } = require('./constants')

console.log(FRONT_BASE_URL);

const corsOptions = {
  origin: FRONT_BASE_URL,
  credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.options("/api/posts", cors());
app.options("/api/login", cors());

async function main() {
  await mongoose.connect(`${process.env.URI_KEY}`);
}

main().catch((err) => console.log(err));

const client = new ImgurClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

const multerStorage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const multerUpload = multer({ storage: multerStorage });

const Post = mongoose.model("Post", {
  titulo: String,
  valor: Number,
  imagem_url: String,
});

const Usuario = mongoose.model("Usuario", {
  username: String,
  passwordHash: String,
});

// CRUD

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  return res.send(posts);
});

app.post("/api/posts", helper.authenticateUser, multerUpload.single("imagem"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhuma imagem foi enviada.");
  }
  const imagem = req.file;
  try {
    const response = await client.upload({
      image: fs.createReadStream(imagem.path),
      type: "stream",
    });
    if (response.success) {
      const imageUrl = response.data.link;
      const post = new Post({
        titulo: req.body.titulo,
        valor: req.body.valor,
        imagem_url: imageUrl,
      });
      await post.save();
      helper.deletarImagem(imagem.path);
      return res.send(post);
    }
    helper.deletarImagem(imagem.path);
    return res.status(500).send(response.data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/api/posts/:id", helper.authenticateUser, async (req, res) => {
  console.log(req.body.titulo, req.body.valor)
  const post = await Post.findByIdAndUpdate(req.params.id, {
    titulo: req.body.titulo,
    valor: req.body.valor,
  }, {new : true});
  if(!post){
    return res.status(404);
  }
  return res.send(post);
});

app.delete("/api/posts/:id", helper.authenticateUser, async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  return res.send(post);
});

// AUTH

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Usuario.findOne({ username });
  if (!user) {
    return res.status(401).send("Usuário inválido.");
  }
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).send("Usuário inválido.");
  }
  const token = helper.generateToken();
  return res.json({ token })
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existeUsuario = await Usuario.find({ username: `${username}` }).exec().length > 0;
  if (existeUsuario) {
    return res.status(400).send("Usuário já existe.")
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Usuario({
      username: username,
      passwordHash: hashedPassword
    })
    user.save();
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Servidor rodando...");
});
