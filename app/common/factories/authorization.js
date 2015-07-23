/**
 * Created by kamoszm on 2015-07-15.
 */

app.factory('auth', ['$http', '$q', '$window', 'conn', function($http, $q, $window, conn){
    var userInfo = {"logged" : false},
        clearUserInfo = function(){
            userInfo = {"logged" : false};
            $window.sessionStorage.removeItem("userInfo");
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
                    deferred.resolve({authenticated: true, userInfo : userInfo});
                } else{
                    clearUserInfo();
                    deferred.reject({authenticated: false, userInfo : userInfo, message : result.message});
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
                deferred.resolve({authenticated: false, userInfo : userInfo, message : result.message});
            }, function(result){
                clearUserInfo();
                deferred.reject({authenticated: false, userInfo : userInfo, message : result.message});
            });
            return deferred.promise;
        },
        getUserInfo = function(){
            return userInfo;
        },
        isLogin = function(){
            return userInfo.logged;
        },
        init = function(){
            if ($window.sessionStorage["userInfo"] != null) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        };

    init();

    return {
        login : login,
        logout : logout,
        isLogin : isLogin,
        getUserInfo: getUserInfo
    }
}]);