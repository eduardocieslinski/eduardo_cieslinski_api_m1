//setando para o mode de desenvolvimento
const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev' :
            return {
                dbString : 'mongodb+srv://eduardo:1234@cluster0.opo4j.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'hml' :
            return {
                dbString : 'mongodb+srv://eduardo:1234@cluster0.opo4j.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
        case 'prod' :
            return {
                dbString : 'mongodb+srv://eduardo:1234@cluster0.opo4j.mongodb.net/deliverydb?retryWrites=true&w=majority',
                jwtPass : 'starwarsémelhorquestartrek',
                jwtExpires : '1d'
            }
    }
};

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();