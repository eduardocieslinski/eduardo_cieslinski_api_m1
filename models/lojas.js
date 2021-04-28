// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const lojasSchema = new Schema({
    nome: { type: String, required: true},
    site: { type: String, unique: true, required: true},
    tipo: { type: String},
    cidade: { type: String},
    estado: { type: String },
    created: { type: Date, default: Date.now }
   
    

 
});

// criando uma nova função para preparar os campos
lojasSchema.pre('save', async function (next) {
    let lojas = this;
   
});

module.exports = mongoose.model('Lojas', lojasSchema);

