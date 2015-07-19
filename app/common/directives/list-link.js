/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listLink", ['path', function(path){
    var path = path.url();

    return {
        restrict : "E",
        scope : {
            text : "@"
        },
        templateUrl: path.template.listlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth', 'loaderService','stringOperation', function($rootScope, $scope, conn, auth, loaderService, stringOperation){

            $scope.path = path;
            $scope.userInfo = auth.getUserInfo();
            $scope.data = {
                auth : $scope.userInfo,
                check : false
            };

            conn.getData(path.server.link, { params : $scope.data })
                .then(function(result){
                    var idx = 0,
                        len = result.data.length;

                    $scope.data.tags = result.data;
                    for(idx;idx<len;idx+=1){
                        $scope.data.tags[idx].tags = stringOperation.stringToArray($scope.data.tags[idx].tags);
                    }

                    console.log($scope.data.tags);
                }, function(msg){
                    console.log(msg);
                });

        }]
    }
}]);