/**
 * Created by kamoszm on 2015-07-14.
 */

var app = app || angular.module('appUsfulLinks',['ngRoute','ngSanitize']);


app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userInfo) {
        console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/signin");
        }
    });
}]);