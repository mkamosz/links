/**
 * Created by kamoszm on 2015-07-14.
 */


var app = angular.module('appLinks',['ngRoute','ngSanitize','ngMessages','ngCookies','ngAnimate']);


app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        //console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {

        if (eventObj.authenticated === false) {
            $location.path("/page/signin");
        } else{

            if (eventObj.redirect === true){
                $location.path("/myprofile/dashboard");
            }
        }
    });
}]);
