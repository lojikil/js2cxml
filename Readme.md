### Intro ###
js2cxml: JSON to Canonical(-like) XML.

### Overview ###
Converts JSON objects that look like this:

    {
        "node": "soap:Envelope",
        "@" : {"xmlns:soap":"http://www.w3.org/2003/05/soap-envelope"},
        "children": [
            {
                "node": "soap:Header"
            },
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
                                    "IBM"
                                ] 
                            }]
                     }]
            }]
    }

And converts it into clean Canonical(-like) XML. It&apos;s meant for those
times when you *need* to use XML, but don&apos;t want to use it directly, 
and still want some safety. js2cxml checks xmlns prefixes to make sure they
are defined either above or in the tag they are used in, and throws an error 
otherwise. It doesn&apos;t yet output full Canonical XML; it does not delete
unused XML namespace definitions, for instance.

### Rationale ###

 I needed something that can quickly:

- generate clean XML
- check that I did not make mistakes with XML QNames
- could be easily integrated with Nodejs applications

That being said, you probably wouldn't want to use this direct. I'm working on a
library that sits atop this for programmatically creating XML using this library.


### License ###

Copyright (c) 2011 by Stefan Edwards

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

