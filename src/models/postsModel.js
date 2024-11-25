import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//Se conecta ao banco passando os dados de conexão
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-alura-back-end");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-alura-back-end");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-alura-back-end");
    const colecao = db.collection("posts");

    //Converte o id para um objeto que o MongoDB aceita
    const objId = ObjectId.createFromHexString(id);

    return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
}