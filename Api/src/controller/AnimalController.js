import { Router } from "express";
import { AlterarAnimal, ConsultarAnimal, Dieta, InserirAnimal, SexoAnimal } from "../repository/AnimalRepository.js";


const server = Router();

server.get('/animal/dieta', async(req, resp) =>{

    try {
        const resposta = await Dieta();
        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: 'Ocorreu um Erro'
        })
    }

})

server.put('/animal/altera/:id', async(req, resp) =>{
    try {
        const {id} = req.params;
        const animal = req.body;

        const resposta = await AlterarAnimal(animal, id);
        if(resposta != 1){
            throw new Error('Animal Não pode ser alterado')
        }

        else{
        resp.status(204).send()
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

server.get('/animal/sexos', async(req, resp) =>{

    try {
        const resposta = await SexoAnimal();
        resp.send(resposta)

    } catch (err) {
        resp.status(400).send({
            erro: 'Ocorreu um Erro'
        })
    }

})

server.get('/animal/nome', async(req, resp) =>{

    try {
        const nome = req.query.nome;
        const res = await ConsultarAnimal(nome);
        resp.send(res)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
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