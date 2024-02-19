import express from "express";

const host = '0.0.0.0';
const porta = 3000; 

const app = express();

app.listen(porta, hots, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})