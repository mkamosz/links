/**
 * Created by kamoszm on 2015-07-14.
 */

app.factory('conn', ['$http','$q' , function($http,$q){
    return{
        getData : function(url,data){
            var deferred = $q.defer();
            $http.get(url,data)
                .success(function(data, status, headers, config){
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config){
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        postData : function(url,data){
            var deferred = $q.defer();
            $http.post(url, data)
                .success(function(data, status, headers, config){
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config){
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        putData : function(url,data){
            var deferred = $q.defer();
            $http.put(url, data)
                .success(function(data, status, headers, config){
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config){
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        deleteData : function(url,data){
            var deferred = $q.defer();
            $http.delete(url, data)
                .success(function(data, status, headers, config){
                    deferred.resolve(data);
                })
                .error(function(data, status, headers, config){
                    deferred.reject(data);
                });
            return deferred.promise;
        }
    }
}]);