import express from "express";
import routes from "./src/routes/postRoutes.js";

//Instância o objeto app para usar os recursos do express
const app = express();

//Servir arquivos estáticos
//Abrimos a pasta uploads para ser acessada pelo navegador
app.use(express.static('uploads'));

//Chama as rotas passando o app como parâmetro
routes(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
