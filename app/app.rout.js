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
                check : ['$q', 'auth', function($q, auth) {
                    var userInfo = auth.getUserInfo();

                    if (userInfo) {
                        return $q.resolve(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .otherwise({
            templateUrl : 'core/error/error.tpl.html',
            controller : 'ErrorController'
        });

}]);