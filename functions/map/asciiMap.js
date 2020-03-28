module.exports = function asciiMap(xq,yq,size){
    var v = require.main.require('./vars.js');
    
    var output = String();
    for(var x = xq-size; x < xq+size; x++){
        for(var y = yq-size; y < yq+size; y++){
            if(v.fn.map.oob(x,y)){
                var s = v.fn.map.seaHeight(v.d.map[x][y].elevation);
                if(s <= 0){
                    output +="~";
                }else if(s <= 1){
                    output +=".";
                }else if(s <= 3){
                    output +=",";
                }else if(s <= 6){
                    output +="-";
                }else{
                    output +="^";
                }
               //output += v.fn.map.seaHeight(v.d.map[x][y].elevation);
            }else{
                output +=" ";
            }
        }
        output += "\n";
    }
    return output;
}