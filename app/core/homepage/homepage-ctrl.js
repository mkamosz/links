/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('HomepageController', ['$scope','globalData','conn', function($scope,globalData,conn){

    /* Pseudo global variables $scope.data */
    $scope.global = globalData.getData();

    /* Private variables for this controller - $scope*/
    $scope.hp = {
        data : {
            auth : globalData.getData('userInfo'),
            all : true
        },
        fn : {}
    };

    /*Functions*/

    conn.getData($scope.global.path.server.followed, { params : $scope.hp.data })
        .then(function(result){
            if(result.status == true){
                $scope.hp.data.followed = result.data.users;
            }
        }, function(msg){
            console.log(msg);
        });

    conn.getData($scope.global.path.server.link, { params : $scope.hp.data })
        .then(function(result){
            if(result.status == true) {
                $scope.hp.data.listLinks  = result.data;
            }
        }, function(msg){
            console.log(msg);
        });

    conn.getData($scope.global.path.server.tag, { params : $scope.hp.data })
        .then(function(result){
            if(result.status == true){
                $scope.hp.data.listTags = result.data;
            }
        }, function(msg){
            console.log(msg);
        });

}]);