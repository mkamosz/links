/**
 * Created by kamoszm on 2015-07-14.
 */

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'core/homepage/homepage.tpl.html',
            controller: "HomepageController"
        })
        .when('/page/:name', { //for static pages about/faq/news/signin/signup etc...
            templateUrl: function(param){
                return 'core/' + param.name + '/' + param.name + '.tpl.html';
            },
            controller : "StaticPageController"
        })
        .when('/myprofile/:name',{ //for myprofile pages dashboard/settings etc....
            templateUrl: function(param){
                return 'core/myprofile/' + param.name + '/' + param.name + '.tpl.html'
            },
            controller : "MyProfileController",
            resolve : {
                check : ['$q', 'globalData','$window', function($q, globalData,$window) {
                    if ($window.sessionStorage["userInfo"] != null) {
                        globalData.setData('userInfo', JSON.parse($window.sessionStorage["userInfo"]));
                    }

                    var userInfo = globalData.getData('userInfo');

                    if (userInfo.logged) {
                        return $q.resolve(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/user/:name',{ //for user dashboard
            templateUrl: 'core/user/user.tpl.html',
            controller : "UserController"
        })
        .otherwise({
            templateUrl : 'core/error/error.tpl.html',
            controller : 'ErrorController'
        });

}]);