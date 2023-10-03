import { Router } from "express";
import { ConsultarAnimal, InserirAnimal } from "../repository/AnimalRepository.js";


const server = Router();

server.get('/animal/nome', async(req, resp) =>{

    try {
        const nome = req.query.nome;
        const res = await ConsultarAnimal(nome);
        resp.send(res)
    } catch (err) {
        resp.status(400).send({
            erro: 'Ocorreu um Erro'
        })
    
    }
});

server.post('/animal', async(req, resp) =>{

    try {
        const Animal = req.body;
        const res = await InserirAnimal(Animal);

        resp.send(res)
    } catch (err) {
        resp.status(400).send({
            erro: 'Ocorreu um Erro'
        })
    }
})

export default server;