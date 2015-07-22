/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listLink", ['path', function(path){
    var path = path.url(),
        checkRootScope = true;

    return {
        restrict : "E",
        scope : {
            hp : "="
        },
        templateUrl: path.template.listlink,
        replace : true,
        transclude : false,
        controller : ['$rootScope', '$scope','conn', 'auth', 'loaderService','stringOperation','dataFactory', function($rootScope, $scope, conn, auth, loaderService, stringOperation,dataFactory){

            var dataConenction = function(){
                conn.getData(path.server.link, { params : $scope.data })
                    .then(function(result){
                        if($scope.data.all == true){
                            dataFactory.addData("popularLinksList",result.data);
                            $scope.data.links = dataFactory.getData("popularLinksList");
                        } else{
                            dataFactory.addData("userLinksList",result.data);
                            $scope.data.links = dataFactory.getData("userLinksList");
                        }


                    }, function(msg){
                        console.log(msg);
                    });
            };

            $scope.hp = (typeof $scope.hp === "undefined" ? false : $scope.hp);
            $scope.path = path;
            $scope.userInfo = auth.getUserInfo();
            $scope.data = {
                auth : $scope.userInfo,
                check : false,
                all : $scope.hp
            };

            dataConenction();

            if(checkRootScope){
                $rootScope.$on("userLinksList", function () {
                    $scope.data.links = dataFactory.getData("userLinksList");
                });
                checkRootScope = false;
            }

            $scope.edit = function(id){
                $rootScope.$broadcast("editLink", {"id": id});
            };

            $scope.delete = function(id){
                var check = confirm("Are you sure you want to remove?");
                if (check == true) {
                    conn.deleteData(path.server.link, {"params" : {auth : $scope.userInfo, id : id}})
                        .then(function(result){
                            dataFactory.editData("userLinksList",result.data.links);
                            $scope.data.links = dataFactory.getData("userLinksList");

                            dataFactory.editData("userTagsList",result.data.tags);

                        }, function(msg){
                            console.log(msg);
                        });
                }
            };

        }]
    }
}]);