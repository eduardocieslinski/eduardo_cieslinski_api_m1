// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Lojas = require('../models/lojas');
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');
// importando a biblioteca 'jsonwebtoken'
const jwt = require('jsonwebtoken');
// importando o middleware de autenticação
const auth = require('../middlewares/auth');
// importando a biblioteca para configurações
const config = require('../config/config');

/**
 * FUNÇÕES AUXILIARES
 * 
 * criando a função para a criação do token do usuário
 */
const createLojasToken = (lojasId) => {
    return jwt.sign({ 
        id: lojasId }, 
        config.jwtPass,
        { expiresIn: config.jwtExpires });
};

// criando o endpoint para listar todo os lojas
router.get('/',  async (req,res) => {
    try {
        // criando um objeto para receber os lojas
        const lojas = await Lojas.find({});
        return res.send(lojas);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos lojas!' });
    }
});

// criando o endpoint para salvar os lojas
router.post('/create' , async (req,res) => {
    const { nome, site, tipo, cidade, estado } = req.body;
    if (!nome || !site ) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
       
        // se o usuário ainda nao for cadastrado
        const loja = await Lojas.create(req.body);
        
        return res.status(201).send({ loja });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o loja: ${err}`})
    }
});

// criando o endpoint para alterar o loja
router.put('/update/:id',  async (req,res) => {
    const { nome, site,tipo, cidade, estado } = req.body;
    if (!nome || !site ) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
       
        // se o usuário ainda nao for cadastrado
        const Loja = await Lojas.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const LojaChanged = await Lojas.findById(req.params.id);
       
        return res.status(201).send({ LojaChanged });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar a Loja: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id', async (req,res) => {
    try {
        await Lojas.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Loja removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover loja!' });
    }     
});

// exportando o módulo
module.exports = router;