/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('FollowedController', ['$scope','globalData','conn', function($scope,globalData,conn){
    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.followed = {
        data : {
            auth : globalData.getData('userInfo')
        },
        fn : {}
    };

    conn.getData($scope.global.path.server.followed, { params : $scope.followed.data })
        .then(function(result){
            if(result.status == true){
                $scope.followed.data.users = result.data.users;
            }
        }, function(msg){
            console.log(msg);
        });

}]);