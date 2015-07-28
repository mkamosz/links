/**
 * Created by kamoszm on 2015-07-15.
 */

app.service('auth', ['$http', '$q', '$window', 'conn', function($http, $q, $window, conn){
    var userInfo = {"logged" : false},
        clearUserInfo = function(){
            userInfo = {"logged" : false};
            $window.sessionStorage.removeItem("userInfo");
        },
        init = function(){
            if ($window.sessionStorage["userInfo"] != null) {
                userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            }
        };

    this.login = function(url,data){
        var deferred = $q.defer();
        conn.postData(url, data).then(function(result){
            if(result.status == true){
                userInfo = {
                    access_token: result.data.access_token,
                    username: result.data.username,
                    logged : true,
                    state : ""
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
    };
    this.logout = function(url,data){
        var deferred = $q.defer();
        conn.deleteData(url,data).then(function(result){
            clearUserInfo();
            deferred.resolve({authenticated: false, userInfo : userInfo, message : result.message});
        }, function(result){
            clearUserInfo();
            deferred.reject({authenticated: false, userInfo : userInfo, message : result.message});
        });
        return deferred.promise;
    };
    this.getUserInfo = function(){
        return userInfo;
    };
    this.isLogin = function(){
        return userInfo.logged;
    };
    this.setState = function(type){
        userInfo.state = type;
    };

    init();
}]);