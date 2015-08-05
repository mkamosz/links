/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('UserController', ['$scope','globalData','conn','$routeParams', function($scope,globalData, conn, $routeParams){

    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.user = {
        data : {
        },
        fn : {}
    };
    $scope.global.loader.show();
    conn.getData($scope.global.path.server.account, { params : $routeParams })
        .then(function(result){
            if(result.status == true){
                $scope.global.loader.hide();
                $scope.user.data.links = result.data.links;
                $scope.user.data.tags = result.data.tags;
                $scope.user.data.info = result.data.user;
            }
        }, function(msg){
            console.log(msg);
        });


    /*Functions*/

}]);