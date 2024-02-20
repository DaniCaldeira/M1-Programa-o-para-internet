import express from "express";
import process from 'process';
import path from 'path';
import session from "express-session";
import autenticar from "./segurança/autenticar.js";

const host = '0.0.0.0';
const porta = 3000; 

const app = express();

app.use(session({
    secret: 'M1nH4Ch4v3S3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 60 * 1000 * 15
    }
}));

app.use(express.static(path.join(process.cwd(), 'publico')));

app.use('/privado', autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})