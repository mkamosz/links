/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("strength", ['path', function(path) {
    var path = path.url();

    return {
        restrict: "AE",
        scope: {
            data: '='
        },
        templateUrl: path.template.strength,
        replace: true,
        transclude: true,
        controller: ['$scope', 'password', function ($scope, password) {

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.strength = {
                data : {
                },
                list : '',
                fn : {}
            };

            /* Functions */

            $scope.$watch('data', function() {
                var score = password.scorePassword($scope.data);

                if(score == 0) {
                    $scope.strength.list = '';
                }

                if(score > 0 && score < 30) {
                    $scope.strength.list = 'active1';
                }
                if(score >= 30 && score < 60) {
                    $scope.strength.list = 'active2';
                }
                if(score >= 60 && score < 80) {
                    $scope.strength.list = 'active3';
                }
                if(score >= 80 && score < 120) {
                    $scope.strength.list = 'active4';
                }
                if(score >= 120) {
                    $scope.strength.list = 'active5';
                }
            });
        }]
    }
}]);