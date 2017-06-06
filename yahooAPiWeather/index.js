var YQL = require('yql');  // importa o module YQL (Yahoo Query Language)
var infoclima = require('./infoclima')

// cria a query para buscar os dados
var query = new YQL("select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=@city) and u='c'");


module.exports.filtro = function(cidade, estado){
    query.setParams
    ({
        city: cidade,
        state: estado
    })
}

module.exports.execute = function(resultcallback){
    query.exec(function(err, data){        
        if (err) {            
            module.exports.resultado = { 
                'codigo': -1,
                'mensagem': err
            }
        }
        else { 
            // callback
            resultcallback( { 
                'codigo': 0,
                'dados': infoclima(data.query.results.channel)
            });
        }
    })
}


