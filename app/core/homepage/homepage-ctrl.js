/**
 * Created by kamoszm on 2015-07-14.
 */

app.controller('HomepageController', ['$scope','globalData','conn','$q', function($scope,globalData,conn, $q){
    var prom1,prom2,prom3,prom4;
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

    $scope.global.loader.show();
    prom1 = conn.getData($scope.global.path.server.followed, { params : $scope.hp.data });
    prom2 = conn.getData($scope.global.path.server.link, { params : $scope.hp.data });
    prom3 = conn.getData($scope.global.path.server.tag, { params : $scope.hp.data });
    prom4 = conn.getData($scope.global.path.server.userrating, { params : $scope.hp.data });

    $q.all([prom1, prom2, prom3, prom4]).then(function(data){
        $scope.global.loader.hide();
        $scope.hp.data.followed = data[0].data.users;
        $scope.hp.data.listLinks  = data[1].data;
        $scope.hp.data.listTags = data[2].data;
        $scope.hp.data.rated = data[3].data;

    }, function(msg){
        console.log(msg);
    });

}]);