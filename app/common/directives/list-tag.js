/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listTags", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            popularTags : "@popularTags",
            dataListTags : "=list"
        },
        templateUrl: path.template.listtag,
        replace : true,
        transclude : false,
        controller : ['$scope','conn', 'auth', function($scope, conn, auth){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.popularTags = (typeof $scope.popularTags === "undefined" ? false : $scope.popularTags);
            $scope.userInfo = auth.getUserInfo();
            $scope.tag = {
                data : {
                    auth : auth.getUserInfo(),
                    check : $scope.popularTags
                },
                fn : {}
            };

            /* Functions */

            conn.getData(path.server.tag, { params : $scope.tag.data })
                .then(function(result){
                    if(result.status == true){
                        $scope.dataListTags = result.data;
                    }
                }, function(msg){
                    console.log(msg);
                });

            $scope.tag.fn.filterTags = function(items, str) {
                var result = {};
                if(typeof str !== "undefined"){
                    angular.forEach(items, function(key, value){
                        if(value.indexOf(str) > -1){
                            result[value] = key;
                        }
                    });
                } else{
                    result = items;
                }
                return result;
            };
        }]
    }
}]);