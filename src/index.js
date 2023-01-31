const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const routes = require('./routes');
const connectToDatabase = require("./database");
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'https://playful-truffle-f92a8a.netlify.app',
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
});

app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(err.statusCode || 500)
        .send({ error: err.message });
});

async function startServer() {
    await connectToDatabase();

    app.listen(port, () => {
        logger.info(`Server listening at http://localhost:${port}`);
    });
}

module.exports = startServer;