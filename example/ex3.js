var js2cxml = require('../lib/js2cxml'),
    data = {
    "node": "soap:Envelope",
    "@" : {"xmlns:soap":"http://www.w3.org/2003/05/soap-envelope"},
    "children": [
        { 'node': 'soap:Header' },
        {
            "node": "soap:Body",
            "children": [
                {
                     "node": "m:GetStockPrice",
                     "@" : {"xmlns:m":"http://example.com/stock"},
                     "children": [
                         {
                             "node": "m:StockName",
                             "children" : [
                                  "IBM"]}]}]}]}; 
console.log(js2cxml(data));
