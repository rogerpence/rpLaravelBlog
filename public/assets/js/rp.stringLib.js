var rp = rp || {};

var rp = rp || {};

rp.stringBuilder = function() 
{
    this.buffer = [];
}  

rp.stringBuilder.prototype.add = function(str) 
{
    this.buffer.push(str);
}

rp.stringBuilder.prototype.toString = function(delimiter) 
{
    delimiter = delimiter || '';
    return this.buffer.join(delimiter);
}