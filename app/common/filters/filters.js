/**
 * Created by kamoszm on 2015-08-11.
 */

app.filter("dateFormat",['$filter', function($filter){
    return function(date, type){
        var timestamp = new Date(date.replace(' ', 'T')).getTime();
        return $filter('date')(new Date(timestamp), type);
    }
}]);

app.filter("firstLetter",[function(){
    return function(str){
        return str.charAt(0);
    }
}]);

app.filter("stringLength",[function(){
    return function(str){
        if(typeof str !== 'undefined'){
            return str.length;
        }
        return 0;
    }
}]);