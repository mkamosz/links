/**
 * Created by kamoszm on 2015-08-11.
 */

app.filter("dateFormat",['$filter', function($filter){
    return function(date, type){
        var timestamp = new Date(date.replace(' ', 'T')).getTime();
        return $filter('date')(new Date(timestamp), type);
    }
}]);
