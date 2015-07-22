/**
 * Created by kamoszm on 2015-07-20.
 */

app.controller('StaticPageController', ['$rootScope', '$scope', function($rootScope, $scope){

    $rootScope.$broadcast('showFooter',{"show" : true});
}]);