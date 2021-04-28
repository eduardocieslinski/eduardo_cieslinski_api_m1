// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// instanciando o 'schema' do mongoose para a criação dos models
const Schema = mongoose.Schema;
// importando a biblioteca 'bcrypt'
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const userSchema = new Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: true},
    nascimento: { type: String, required: true },
    login: { type: String, unique: true,required: true },
    senha: { type: String, required: true},
    dicaDeSenha: { type: String},
    cidade: { type: String},
    estado: { type: String},
    created: { type: Date, default: Date.now }

 
});

// criando uma nova função para preparar os campos
userSchema.pre('save', async function (next) {
    let user = this;
    // testando se o campo de senha foi modificado
    if (!user.isModified('senha'))
        return next();
    // criando o hash para o campo password
    user.senha = await bcrypt.hash(user.senha, 10);
    return next();
});

module.exports = mongoose.model('User', userSchema);

