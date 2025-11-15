require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));
app.use('/api', routes);

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('DB connected and models synced');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    } catch (err) {
        console.error('Failed to start', err);
    }
}

start();