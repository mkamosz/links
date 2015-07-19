/**
 * Created by kamoszm on 2015-07-19.
 */

app.service('stringOperation',function(){
   this.stringToArray = function(str){
       return str.split(",");
   }
});
