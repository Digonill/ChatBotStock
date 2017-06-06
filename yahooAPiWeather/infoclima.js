var format = require('string-format')

var mensagem = "Condição para a {location.city} -{location.region} é de {item.condition.temp}°{units.temperature}";
mensagem += "\r\n";
//mensagem += "Previsão para os próximos:";
//mensagem += "\r\n"; 
 

module.exports = (input) => {
    var informacoes;

    informacoes = format(mensagem,input);
/*
    var previsao=''; 
    input.item.forecast.forEach(function(element) {
        previsao+= format('{0} - {1} (Máx.:{2} Min.:{3}) Clima:{4} \r\n'
        ,element.day
        ,element.date
        ,element.high
        ,element.low
        ,element.text);
    }, this);
*/

    return informacoes;// + previsao;
}

