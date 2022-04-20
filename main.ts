import express from 'express';
import http from 'http';
import https from 'https'
import cors from 'cors';
import router from './src/router';
import authMiddleware from './src/auth/middleware'

const app = express();
app.use(cors())
app.use(authMiddleware)

const server = http.createServer(app)

app.get('/', (req,res) => {
    res.send('API for chicken flap')
})

app.use('/api',router)

let port = 3000;

server.listen(port, () => {
    console.log('server listening on port' , port)
})