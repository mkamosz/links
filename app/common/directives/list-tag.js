/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listTag", ['path', function(path){
    var path = path.url(),
        checkRootScope = true;

    return {
        restrict : "E",
        scope : {
            hp : "="
        },
        templateUrl: path.template.listtag,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth','dataFactory', function($rootScope, $scope, conn, auth, dataFactory){
            $scope.path = path;
            $scope.userInfo = auth.getUserInfo();
            $scope.hp = (typeof $scope.hp === "undefined" ? false : $scope.hp);
            $scope.data = {
                auth : $scope.userInfo,
                check : $scope.hp
            };

            conn.getData(path.server.tag, { params : $scope.data })
                .then(function(result){
                    if(result.status == true && result.code == 0){
                        dataFactory.addData("userTagsList",result.data);
                        $scope.data.tags = dataFactory.getData("userTagsList");
                    } else{
                        dataFactory.addData("popularTagsList",result.data);
                        $scope.data.tags = dataFactory.getData("popularTagsList");
                    }
                }, function(msg){
                    console.log(msg);
                });

            $scope.filterTags = function(items, str) {
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

            if(checkRootScope){
                $rootScope.$on("userTagsList", function () {
                    if($scope.hp == true){
                        $scope.data.tags = dataFactory.getData("popularTagsList");
                    } else{
                        $scope.data.tags = dataFactory.getData("userTagsList");
                    }
                });
                checkRootScope = false;
            }

        }],
    }
}]);