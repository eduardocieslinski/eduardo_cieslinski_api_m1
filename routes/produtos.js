// importando a biblioteca 'express'
const express = require('express');
// importando as funcionalidades do 'express' para trabalho com rotas
const router = express.Router();
// importando o 'model' do usuário
const Produtos = require('../models/produtos');
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
const createProdutoToken = (produtoId) => {
    return jwt.sign({ 
        id: produtoId }, 
        config.jwtPass,
        { expiresIn: config.jwtExpires });
};

// criando o endpoint para listar todo os Produtos
router.get('/',  async (req,res) => {
    try {
        // criando um objeto para receber os Produtos
        const produtos = await Produtos.find({});
        return res.send(produtos);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos produtos!' });
    }
});

// criando o endpoint para salvar os produtos
router.post('/create' , async (req,res) => {
    const { nome, tipo, marca, preco, foto } = req.body;
 
    if (!nome || !marca || !preco || preco <= 0)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! ou se o preço esta acima de 0 '});
    try {
       
        // se o usuário ainda nao for cadastrado
        const produto = await Produtos.create(req.body);
        
        return res.status(201).send({ produto });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o produto: ${err}`})
    }
});

// criando o endpoint para alterar o produto
router.put('/update/:id',  async (req,res) => {
    const { nome, tipo, marca, preco,foto } = req.body;
    if (!nome || !marca || !preco || preco <= 0)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! ou se o preço esta acima de 0 '});
    try {
       
        // se o usuário ainda nao for cadastrado
        const produtos = await Produtos.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const produtosChanged = await Produtos.findById(req.params.id);
       
        return res.status(201).send({ produtosChanged });
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o Produto: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id',  async (req,res) => {
    try {
        await Produtos.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Produto removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover Produto!' });
    }     
});

// exportando o módulo
module.exports = router;