import express from 'express';
import http from 'http';
import https from 'https'
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/router';
import authMiddleware from './src/auth/middleware'

import {createJob} from './src/schedule/schedule'
createJob()

const app = express();
app.use(cors())
app.use(authMiddleware)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const server = http.createServer(app)

app.get('/', (req,res) => {
    res.send('API for chicken flap')
})

app.use('/api',router)

let port = 3000;

server.listen(port, () => {
    console.log('server listening on port' , port)
})