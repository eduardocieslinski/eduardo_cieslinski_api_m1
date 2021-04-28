// importando/instanciando a biblioteca 'express'
const express = require('express');
// importando/instanciando a biblioteca 'mongoose'
const mongoose = require('mongoose');
// importando/instanciando a biblioteca 'body-parser'
const bodyParser = require('body-parser');
//importandoa  biblioteca de configruações
const config = require('./config/config');

// instanciando/criando o aplicativo da API para ser uma nova instância da classe 'express'
const app = express();

// criando a constante com opções de conexão
const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // removendo os warnings de function deprecated
    useFindAndModify: false
};

// conectando ao banco de dados
mongoose.connect(config.dbString,options);

// ocultando algumas mensagens do console
mongoose.set('useCreateIndex',true);

// retornando status da conexão com o banco
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
});

// verificando erros de conexão
mongoose.connection.on('error', (err) => {
    console.log(`Erro na conexão com o banco de dados:  ${err}`);
});

// verificando se ocorreu desconexão
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
});

// configurando o 'body-parser' para as requisições com 'body'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// importando os arquivos de rotas
const userRoutes = require('./routes/users');
const produtoRoutes = require('./routes/produtos');
const lojaRoutes = require('./routes/lojas');

// associando as duas instâncias de rotas ao app
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/lojas', lojaRoutes);

// configurando a porta em que a API ficará ouvindo
app.listen(3000);

// exportando o módulo
module.exports = app;