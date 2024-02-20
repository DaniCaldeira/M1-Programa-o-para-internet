export default function autenticar(requisicao, resposta, next){
    if (requisicao.session?.usuarioLogado){
        next();
    }
    else{
        respostaredirect('/login.html');
    }
}