var apiYahoo = require('./yahooAPiWeather');
var apiTelegram = require('./telegramApi');

var receberMensagem = (data) =>{
    if (data != null)
    {
            // busca os dados da api do Yahoo
            apiYahoo.filtro(data.cidade,data.uf);

            apiYahoo.execute(function(resultado) {
            if (resultado.codigo != 0){
                apiTelegram.enviarMensagem(resultado.mensagem);
            }
            else{
                apiTelegram.enviarMensagem(resultado.dados);
            }
        });
    }    
}

apiTelegram.iniciarChat(receberMensagem);







