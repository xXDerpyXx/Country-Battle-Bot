// Clamp function cos js doesnt have it
module.exports = function clamp(val,min,max){
    if(val > max)
      val = max;
    if(val < min)
      val = min;
    return val;
}