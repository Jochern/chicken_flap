import express from 'express';
import http from 'http';
import https from 'https'
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/router';
import { config } from 'dotenv';
import { createJob } from './src/schedule/schedule'
import session from 'express-session';
config()
createJob()

declare module 'express-session' {
    interface SessionData {
        authenticated: boolean;
    }
}

const {
    AUTH_TOKEN,
    SESSION_COOKIE_SECRET
} = process.env


const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(session({
//     secret: SESSION_COOKIE_SECRET,
//     cookie: { maxAge: 1000000 },
//     saveUninitialized: false,
//     resave: true,
// }))


const server = http.createServer(app)

app.get('/', (req, res) => {
    res.send('API for chicken flap')
})

const decryptString = (s: string) => (Buffer.from(s.slice(6), 'base64').toString('utf-8').slice(0, -1))

app.post('/login', (req, res) => {
    console.log(decryptString(req.headers.authorization))
    if (decryptString(req.headers.authorization) == AUTH_TOKEN) {
        req.session.authenticated = true;
        return res.redirect('/')
    }
})

app.use('/api', router)

let port = 3000;

server.listen(port, () => {
    console.log('server listening on port', port)
})