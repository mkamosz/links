/**
 * Created by kamoszm on 2015-07-14.
 */

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'core/homepage/homepage.tpl.html',
            controller: "HomepageController",
            resolve: 'HomepageController'
        })
        .when('/about', {
            templateUrl: 'core/about/about.tpl.html',
            controller: 'AboutController'
        })
        .when('/faq', {
            templateUrl: 'core/faq/faq.tpl.html',
            controller: 'FaqController'
        })
        .when('/signup', {
            templateUrl: 'core/signup/signup.tpl.html',
            controller: 'SignupController'
        })
        .when('/signin', {
            templateUrl: 'core/signin/signin.tpl.html',
            controller: 'SigninController'
        })
        .when('/myProfile',{
            templateUrl: 'core/myprofile/myprofile.tpl.html',
            controller: 'MyProfileController',
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
});