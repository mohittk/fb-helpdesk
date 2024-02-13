const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const config = require('./config')


try {
    mongoose.connect(config.mongo_uri).then(() => {
        console.log("DB connected");
    });
} catch (err) {
    console.error(err);
}

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);


module.exports = app;

if (process.env.NODE_ENV !== 'test' && !module.parent) {
   
    const server = app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });

    module.exports = { app, server };
}

