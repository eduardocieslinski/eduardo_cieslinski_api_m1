// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const produtoSchema = new Schema({
    nome: { type: String, required: true},
    tipo: { type: String},
    marca: { type: String, required: true },
    preco: { type: String, required: true },
    foto: { type: String },
    created: { type: Date, default: Date.now }
    

 
});

// criando uma nova função para preparar os campos
produtoSchema.pre('save', async function (next) {
    let produto = this;
   
});

module.exports = mongoose.model('Produto', produtoSchema);

