import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, publicarPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    //Habilita o app para interpretar JSON
    app.use(express.json());

    //Usa as opções de cors no express
    app.use(cors(corsOptions));

    //Cria a rota /posts que retorna todos os posts que estão no banco de dados
    app.get("/posts", listarPosts);

    app.post("/posts", publicarPost);

    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost); 

};

export default routes;
