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
 	 */
	if(ident.indexOf(":") !== ident.lastIndexOf(":"))
	{
		throw("invalid tag " + tag);
	}
	else if(tag.indexOf(":") !== -1)
	{
		nsprefix = tag.slice(0,tag.indexOf(":"));
		if(!(nsprefix in js2cxmlenv) && !attributes)
		{
			throw("xmlns prefix '" + nsprefix + "' not defined");
		}
		else if(attributes && !(nsprefix in attributes))
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
		js2cxmlenv = {}
	}
	if(!('node' in currentobject))
	{
		throw("object contains no node member");
	}
	tag = currentobject.node;
	if('@' in currentobject)
	{
		
	}
	if('children' in currentobject)
	{
		
	}
	/* ok, build the XML */
	
}
