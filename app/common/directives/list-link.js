/**
 * Created by kamoszm on 2015-07-15.
 */

app.directive("listLinks", ['path', function(path){
    var path = path.url();

    return {
        restrict : "AE",
        scope : {
            popularLinks : '@popularLinks',
            dataListLinks : '=list',
            dataListTags : '=tags',
            editTag : '=editTag'
        },
        templateUrl: path.template.listlink,
        replace : true,
        transclude : false,
        controller : ['$scope','conn', 'auth', function($scope, conn, auth){

            /* Pseudo global variables $scope.data */

            /* Private variables for this controller - $scope*/
            $scope.popularLinks = (typeof $scope.popularLinks === "undefined" ? false : $scope.popularLinks);
            $scope.list = {
                data : {
                    auth : auth.getUserInfo(),
                    check : false,
                    all : $scope.popularLinks
                },
                fn : {}
            };

            /* Functions */

            conn.getData(path.server.link, { params : $scope.list.data })
                .then(function(result){
                    if(result.status == true) {
                        $scope.dataListLinks = result.data;
                    }
                }, function(msg){
                    console.log(msg);
                });


            $scope.list.fn.edit = function(id){
                $scope.editTag.id = id;
                $scope.editTag.edit = true;
            };

            $scope.list.fn.delete = function(id){
                var check = confirm("Are you sure you want to remove?");
                if (check == true) {
                    conn.deleteData(path.server.link, {"params" : {auth : auth.getUserInfo(), id : id}})
                        .then(function(result){
                            $scope.dataListLinks = result.data.links;
                            $scope.dataListTags = result.data.tags;

                        }, function(msg){
                            console.log(msg);
                        });
                }
            };

        }]
    }
}]);