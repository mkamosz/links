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
        return (typeof str !== 'undefined' ? str.length : 0);
    }
}]);

//tags filter with string
app.filter('filterObject', function() {
    return function(items, str) {
        var result = {};
        if(typeof str !== "undefined"){
            angular.forEach(items, function(key, value){
                if(value.indexOf(str) > -1){
                    result[value] = key;
                }
            });
        } else{
            result = items;
        }
        return result;
    };
});

//tags filter count
app.filter('countObjectProp', function() {
    return function(obj) {
        var count = 0;
        for (var k in obj){
            if (obj.hasOwnProperty(k)){
                count+=1;
            }
        }
        return count;
    };
});

app.filter("countNotifications",[function(){
    return function(list){
        var count = 0;
        if(list.length > 0){
            angular.forEach(list, function(value, key){
                if(value.read == 0){
                    count+=1;
                }
            });
        }
        return count;
    }
}]);


