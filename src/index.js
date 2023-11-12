const server = require ('./app.js');

const puerto = process.env.PORT || 3000
server.listen(puerto,()=>{
    console.log(`Servidor ejecutandose ${puerto}`)
})