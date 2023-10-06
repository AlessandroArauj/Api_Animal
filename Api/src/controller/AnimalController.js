import { Router } from "express";
import { AlterarAnimal, BuscarTudo, ConsultarAnimal, Dieta, ExcluirAnimal, InserirAnimal, SexoAnimal } from "../repository/AnimalRepository.js";


const server = Router();

server.get('/animal', async(req, resp) =>{

    try {
        
        const resposta = await BuscarTudo()
        resp.send(resposta)
    } catch (err) {
        erro: err.message
    }

})

server.delete('/animal/deletar/:id', async(req, resp) =>{
    try {
        
        const { id } = req.params
        const resposta = await ExcluirAnimal(id)

        if (resposta != 1)
        throw new Error('Animal não pode ser removido')
    
    resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

})

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
        const resposta = await ConsultarAnimal();
        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    
    }
});

server.post('/animal', async(req, resp) =>{

    try {
        const Animal = req.body;
        console.log(Animal);

        const res = await InserirAnimal(Animal);

        resp.send(res)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;