require('dotenv').config();

const path = require("path");
const express = require("express");
const router = require("./router");
const cors = require("cors");

const server = express();
server.use(cors());
server.use('/api/', router);

server.use(express.static(path.join(__dirname, "Frontend")));
server.get('*', function (req, res) {
    const pathOfFile = path.join(__dirname, "Frontend", 'index.html')
    res.sendFile(pathOfFile);
});
const port = process.env.PORT || 8000;


server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});