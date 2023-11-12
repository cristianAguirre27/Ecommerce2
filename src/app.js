const express = require ('express');
const morgan = require ('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const authRoutes = require('./routes/auth.routes.js')
const itemRoutes = require('./routes/item.routes.js')

const server = express()

server.use(cors());
server.use(morgan('dev'));
server.use(express.json())
server.use(cookieParser());

server.get('/',(req,res)=>{
    res.send('conexion correcta')
})
server.use("/api",authRoutes);
server.use("/api",itemRoutes);

module.exports = server;