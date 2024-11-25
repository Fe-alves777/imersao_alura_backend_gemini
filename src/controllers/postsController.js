import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";
import fs from "fs";

export async function listarPosts (req, res) {
    //Chama a função para buscar todos os posts no banco de dados
    const posts = await getTodosPosts();
    //Retorna os posts encontrados
    res.status(200).json(posts);
}

export async function publicarPost (req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(201).json(postCriado);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha ao criar post"});
    }
}

export async function uploadImagem (req, res) {
    const novoPost = {
        descricao : "",
        ulrImg : req.file.originalname,
        alt : ""
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(`uploads/${req.file.originalname}`, imagemAtualizada);
        
        res.status(201).json(postCriado);
    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha ao criar post"});
    }
}

export async function atualizarNovoPost (req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const post = {
            descricao: descricao,
            urlImg: urlImg,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(201).json(postCriado);

    } catch(error) {
        console.error(error.message);
        res.status(500).json({"Erro":"Falha ao atualizar post"});
    }
}
