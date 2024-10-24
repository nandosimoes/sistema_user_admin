require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routers/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

sequelize.authenticate()
    .then(() => {
        console.log("Conexão estabelecida");
    })
    .catch(err => {
        console.error("Erro ao conectar com o banco: ", err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("-------------------------------------------");
    console.log(`Servidor em http://localhost:${PORT}`);
    console.log("-------------------------------------------");
});
