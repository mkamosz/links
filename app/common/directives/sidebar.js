/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("sidebarNav", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            data : '=navData'
        },
        templateUrl: path.template.sidebar,
        replace : true,
        transclude : false,
        controller : ['$scope','$window','globalData', function($scope, $window,globalData){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.sidebar = {
                data : {},
                fn : {}
            };

            /* Functions */

            $scope.sidebar.fn.change = function(e){
                $scope.data.state = $scope.data.state == 'resize' ? '' : 'resize';
                globalData.setPropData('userInfo','state', $scope.data.state);
                $window.sessionStorage["userInfo"] = JSON.stringify(globalData.getData('userInfo'));

                e.preventDefault();
            }
        }]
    }
}]);