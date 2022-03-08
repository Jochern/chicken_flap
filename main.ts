import express from 'express';
import http from 'http';
import cors from 'cors';
import router from './src/router';

const app = express();
app.use(cors())

const server = http.createServer(app)

app.get('/', (req,res) => {
    res.send('API for chicken flap')
})

app.use('/api',router)

server.listen(3000)