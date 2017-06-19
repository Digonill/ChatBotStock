var telegramBot  = require('node-telegram-bot-api');
var TOKEN = require('./TOKEN');
var CONST = require('./constantes');
var format = require('string-format')

// propriedades
var chatID;
var bot;
var callback;

// Regex para encontrar a cidade a ser pesquisada.
const REGEXCIDADEUF =/\/(tempo)+(\s\w(.*))+([-])+(\w{2})/

var enviarBoasVindas = ( nome ) => {
    return format(CONST.SEJA_BEM_VINDO , nome);
}

//envia a mensagem
var receberMensagemBot = ( msg , match) => {

    // id do chat
    chatID = msg.chat.id;

    // identifica o comando
    switch (match[1]) {
        case 'start':            
            botmsg = enviarBoasVindas(msg.from.first_name);
            this.enviarMensagem(botmsg);
            break;
        case 'tempo':
            var  jsonCidadeUf= extrairCidadeUf(msg.text)
            callback(jsonCidadeUf);
            break;
        default:
            this.enviarMensagem('Comando inválido!')
            break;
    }    
}

var extrairCidadeUf = (msg) => {
    str = msg.match(CONST.RGX_CIDADEUF);

    return {
        cidade: str[2],
        uf: str[5]
    }
}



module.exports.enviarMensagem = (msg) => {
    bot.sendMessage(chatID, msg)   
    .catch((error)=> {
        console.log(error.code);  
        console.log(error.response.body);
    });
}


module.exports.iniciarChat = ( ck ) => {
    // inicia o bot
    if (bot == null){
        bot = new telegramBot(TOKEN());
        bot.setWebHook();
    }
    
    callback = ck; // callback para receber as mensagens

    //recebe mensagem do chat
    //bot.onText(/\/(start|tempo)(.*)/, receberMensagemBot );  
    bot.onText(/\/(start|tempo)/, receberMensagemBot );
}
