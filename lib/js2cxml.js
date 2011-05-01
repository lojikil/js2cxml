/* quick & dirty code to generate something akin to Canonical XML 
 * from JSON objects. Attempts to check if XML name space prefixes
 * have been defined either above the current object or within its
 * attributes. Uses recursive calls to js2cxml; this could be replaced
 * by a stack & a while loop, so there's a possible optimization there.
 * I'll have to see which is faster & eats less memory.
 * Safe when used as prescribed.
 *
 * To do: add compatibility function for xml2js
 *
 * Copyright (C) 2011 Stefan Edwards
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
function check_ns_prefix(ident, js2cxmlenv, attributes)
{
	/* reusable function to check if the xml namespace prefix 
 	 * has been defined, in either the environment or (for elements)
 	 * within it's attributes. Throws an error if not found
     * Should probably be called something something QName, but I'm
     * sleepy and don't care that much.
 	 */
	if(ident.indexOf(":") !== ident.lastIndexOf(":"))
	{
		throw("invalid qname: " + ident);
	}
	else if(ident.indexOf(":") !== -1)
	{
		nsprefix = ident.slice(0,ident.indexOf(":"));
        check = "xmlns:" + nsprefix; 
        console.log(check);
        console.log("check in attributes? " + (check in attributes));
        if(nsprefix == "xmlns")
        {
            return nsprefix;
        }
		else if(attributes && !(check in attributes))
		{
			throw("xmlns prefix '" + check + "' not defined");
		}
		else if(!(nsprefix in js2cxmlenv))
		{
			throw("xmlns prefix '" + nsprefix + "' not defined");
		}
		return nsprefix;
	}
	return '';
}

module.exports = function js2cxml(currentobject, js2cxmlenv)
{
	var tag = '', nsprefix = '', attributes = [], children = [];
	if(typeof(js2cxmlenv) !== "object")
	{
		js2cxmlenv = {'xmlns':true}
	}
	if(!('node' in currentobject))
	{
		throw("object contains no node member");
	}
	tag = currentobject.node;
	if('@' in currentobject)
	{
        for(attr in currentobject["@"])
        {
            check_ns_prefix(attr,js2cxmlenv,currentobject["@"]);
            attributes.push(attr + "=" + '"' + currentobject["@"][attr] + '"');
        }
        nsprefix = check_ns_prefix(tag,js2cxmlenv,currentobject["@"]);
        if(!(nsprefix in js2cxmlenv))
        {
            js2cxmlenv[nsprefix] = 1;
        }
        attributes = ' ' + attributes.sort().join(' ');
	}
    else
    {
        nsprefix = check_ns_prefix(tag,js2cxmlenv);
        attributes = '';
    }
	if('children' in currentobject)
	{
	    for(var child in currentobject["children"])
        {
            if(typeof(currentobject["children"][child]) === "object")
            {
                children.push(js2cxml(currentobject["children"][child],js2cxmlenv));
            }
            else if(typeof(currentobject["children"][child]) === "string")
            {
                children.push(currentobject["children"][child]);
            }
            else
            {
                children.push(currentobject["children"][child].toString());
            }
        }
        children = children.join('');
	}
    else
    {
        children = '';
    }
	/* ok, build the XML */
    return '<' + tag + attributes + '>' + children + '</' + tag + '>';	
}
