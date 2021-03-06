/**
 * Created by kamoszm on 2015-07-15.
 */

app.service('auth', ['$http', '$q', '$cookies', 'conn','path','globalData', function($http, $q, $cookies, conn, path, globalData){
    var clearUserInfo = function(){
            globalData.setData('userInfo', {"logged" : false});
            $cookies.remove("userInfo");
        },
        init = function(){
            if ($cookies.get("userInfo") != null) {
                globalData.setData('userInfo', JSON.parse($cookies.get("userInfo")));
            }
        },
        path = path.url();

    this.login = function(url,data){
        var deferred = $q.defer();
        conn.postData(url, data).then(function(result){
            if(result.status == true){
                var userInfo = {
                    username : result.data.username,
                    access_token : result.data.access_token,
                    logged : true,
                    state : ''
                };

                globalData.setData('userInfo', userInfo);
                globalData.setData('userData', result.data);

                $cookies.put("userInfo", JSON.stringify(userInfo));
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
            deferred.resolve({authenticated: false, userInfo : {}, message : result.message});
        }, function(result){
            clearUserInfo();
            deferred.reject({authenticated: false, userInfo : {}, message : result.message});
        });
        return deferred.promise;
    };

    init();
}]);