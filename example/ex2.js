var js2cxml = require('../lib/js2cxml'),
    data = {
        'node': 'soap:Envelope',
        '@': {'xmlns:soap':'stuff'},
        'children':[
            { 'node':'soap:Header'},
            { 'node':'soap:Body',
                'children':[
                    {'node':'m:StockData',
                        '@': {'xmlns:m':'superstuff'},
                        'children': [
                            "IBM"]}]}]};
                                   
console.log(js2cxml(data));
