// index.js

const express = require('express');
const sequelize = require('./config/database'); 
const User = require('./user/model/user'); 

const userResource = require('./user/userResource');

const app = express();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    await sequelize.sync();
    console.log('Todos os modelos foram sincronizados com o banco de dados.');

    app.use(express.json());
    app.use('/api', userResource); 

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
