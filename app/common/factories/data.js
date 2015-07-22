/**
 * Created by kamoszm on 2015-07-14.
 */

app.factory('dataFactory', ['$rootScope', function($rootScope){
    var dataArray = [];
    return{
        getData : function(name){
            return dataArray[name];
        },
        addData : function(name, data){
            dataArray[name] = data;
            $rootScope.$broadcast(name);
        },
        editData : function(name, data){
            dataArray[name] = data;
            $rootScope.$broadcast(name);
        },
        addDataItem : function(name, data){
            dataArray[name].push(data);
            $rootScope.$broadcast(name);
        }
    }
}]);