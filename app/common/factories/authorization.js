/**
 * Created by kamoszm on 2015-07-15.
 */

app.factory('auth', ['$rootScope','$http', '$q', '$window', 'conn', function($rootScope, $http, $q, $window, conn){
    var userInfo = null,
        clearUserInfo = function(){
            $window.sessionStorage["userInfo"] = null;
            userInfo = {};
        },
        login = function(url,data){
            var deferred = $q.defer();
            conn.postData(url, data).then(function(result){
                if(result.status == true){
                    userInfo = {
                        access_token: result.data.access_token,
                        username: result.data.username,
                        logged : true
                    };
                    $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                    deferred.resolve({authenticated: true});
                    $rootScope.$broadcast('logged');
                } else{
                    clearUserInfo();
                    deferred.reject({authenticated: false, message : result.message});
                }
            }, function(result){
                clearUserInfo();
                deferred.reject({authenticated: false, message : result.message});
            });
            return deferred.promise;
        },
        logout = function(url,data){
            var deferred = $q.defer();
            conn.deleteData(url,data).then(function(result){
                clearUserInfo();
                deferred.resolve({authenticated: false, message : result.message});
            }, function(result){
                clearUserInfo();
                deferred.reject({authenticated: false, message : result.message});
            });
            return deferred.promise;
        },
        getUserInfo = function(){
            return userInfo;
        },
        init = function(){
            if ($window.sessionStorage["userInfo"]) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        };

    init();

    return {
        login : login,
        logout : logout,
        getUserInfo: getUserInfo
    }
}]);