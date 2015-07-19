/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("addLink", ['path', function(path){
    var path = path.url();

    return {
        restrict : "E",
        scope : {
            text : "@"
        },
        templateUrl: path.template.addlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth', 'loaderService', function($rootScope, $scope, conn, auth, loaderService){
            $scope.path = path;
            $scope.userInfo = auth.getUserInfo();
            $scope.disabledAddButton = false;
            $scope.linkTmpAdded = false;
            $scope.data = {
                auth : $scope.userInfo,
                check : false
            };

            $scope.checkLink = function(){
                $rootScope.$broadcast('loaderActive');
                $scope.disabledAddButton = true;
                conn.getData(path.server.link, { params : $scope.data })
                    .then(function(result){
                        if(result.status == true){
                            $scope.data.title = result.data.title;
                            $scope.linkTmpAdded = true;
                            $rootScope.$broadcast('loaderInactive');

                            $scope.data.tags = result.data.tags;

                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.saveLink = function(){
                $rootScope.$broadcast('loaderActive');
                conn.postData(path.server.link, $scope.data )
                    .then(function(result){
                        if(result.status == true){
                            $scope.linkTmpAdded = false;
                            $scope.data = {};
                            $rootScope.$broadcast('loaderInactive');
                        }
                    }, function(msg){
                        console.log(msg);
                    });
            };

        }]
    }
}]);